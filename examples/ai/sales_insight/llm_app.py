import os
import time
import modal
import asyncio
import uuid

vllm_image = modal.Image.debian_slim(python_version="3.10").pip_install(
    "vllm==0.5.5"
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
    from vllm.engine.async_llm_engine import AsyncLLMEngine
    from vllm.engine.arg_utils import AsyncEngineArgs

# TODO: may need to change this to h100?
GPU_CONFIG = modal.gpu.A100(count=1, size="40GB")

# encapsulate the inference function in a class with @enter decorator, so the model is loaded once and reused across function calls
@llm_app.cls(gpu=GPU_CONFIG, volumes={MODELS_DIR: volume}, secrets=[modal.Secret.from_name("huggingface-secret")])
class Model:
    @modal.enter()
    def load(self):
        engine_args = AsyncEngineArgs (
            model=MODELS_DIR + "/" + DEFAULT_NAME,
            enforce_eager=True,
            tensor_parallel_size=GPU_CONFIG.count
        )
        
        self.async_llm = AsyncLLMEngine.from_engine_args(
            engine_args
        )

    @modal.method()
    async def generate_stream(self, user_query: str, system_prompt: str, max_tokens: int = 2048, frequency_penalty: float = 0, presence_penalty: float = 0):
        tokenizer = await self.async_llm.get_tokenizer()
        conversations = tokenizer.apply_chat_template(
            [{'role': 'system', 'content': system_prompt},
             {'role': 'user', 'content': user_query}],
            tokenize=False,
            add_generation_prompt=True
        )
        sampling_params = vllm.SamplingParams(
            temperature=0.75,
            max_tokens=max_tokens,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
        )
        
        start = time.monotonic_ns()
        stream = self.async_llm.generate(conversations, sampling_params, uuid.uuid4())
        print("starting to stream output")
        async for output in stream:
            yield output.outputs[0].text