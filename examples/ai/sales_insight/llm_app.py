import os
import time
import modal

vllm_image = modal.Image.debian_slim(python_version="3.10").pip_install(
    "vllm==0.5.3post1"
)

from constants import MODELS_DIR, DEFAULT_NAME, DEFAULT_REVISION, app_name, MODELS_VOLUME

# We need to make the weights of that model available to our Modal Functions.
#
# So to follow along with this example, you'll need to download those weights
# onto a Modal Volume by runninng `modal run download_llama.py`

try:
    volume = modal.Volume.lookup(MODELS_VOLUME, create_if_missing=False)
except modal.exception.NotFoundError:
    raise Exception(""" Download models first with "modal run download_llama.py" """)


llm_app = modal.App(name=app_name+"-llm", image=vllm_image)

# Using `image.imports` allows us to have a reference to vLLM in global scope without getting an error when our script executes locally.
with vllm_image.imports():
    import vllm

# TODO: may need to change this to h100?
GPU_CONFIG = modal.gpu.A100(count=1, size="40GB")

# encapsulate the inference function in a class with @enter decorator, so the model is loaded once and reused across function calls
@llm_app.cls(gpu=GPU_CONFIG, volumes={MODELS_DIR: volume}, secrets=[modal.Secret.from_name("huggingface-secret")])
class Model:
    @modal.enter()
    def load(self):
        self.llm = vllm.LLM(
            model=MODELS_DIR + "/" + DEFAULT_NAME,
            enforce_eager=True,
            tensor_parallel_size=GPU_CONFIG.count,
        )

    @modal.method()
    def generate(self, user_query: str):
        sampling_params = vllm.SamplingParams(
            temperature=0.75,
        )   
        start = time.monotonic_ns()
        result = self.llm.generate([user_query], sampling_params)
        end = time.monotonic_ns()
        print(f"Time taken: {end - start} ns")
        print(f"Raw result: {result}")
        return result[0].outputs[0].text