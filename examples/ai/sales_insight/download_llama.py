# ---
# This is a copy of the download_llama.py script from the modal-examples repo.
# Added here for convenience. 
# Note that the model we use below is considered "gated" and requires both an HF secret and applying for access
# You can apply for access here: https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct
# args: ["--force-download"]
# ---
import modal
from constants import MODELS_DIR, DEFAULT_NAME, DEFAULT_REVISION, MODELS_VOLUME



volume = modal.Volume.from_name(MODELS_VOLUME, create_if_missing=True)

image = (
    modal.Image.debian_slim(python_version="3.10")
    .pip_install(
        [
            "huggingface_hub==0.24.6",  # download models from the Hugging Face Hub
            "hf-transfer==0.1.8",  # download models faster with Rust
        ]
    )
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
)


MINUTES = 60
HOURS = 60 * MINUTES


app = modal.App(
    image=image, secrets=[modal.Secret.from_name("huggingface-secret")]
)


@app.function(volumes={MODELS_DIR: volume}, timeout=4 * HOURS)
def download_model(model_name, model_revision, force_download=False):
    from huggingface_hub import snapshot_download

    volume.reload()

    snapshot_download(
        model_name,
        local_dir=MODELS_DIR + "/" + model_name,
        ignore_patterns=[
            "*.pt",
            "*.bin",
            "*.pth",
            "original/*",
        ],  # Ensure safetensors
        revision=model_revision,
        force_download=force_download,
    )

    volume.commit()


@app.local_entrypoint()
def main(
    model_name: str = DEFAULT_NAME,
    model_revision: str = DEFAULT_REVISION,
    force_download: bool = False,
):
    download_model.remote(model_name, model_revision, force_download)