app_name = "sales-insight"
industries = ["tech", "finance", "retail", "healthcare", "real estate"]
tenants = ["Nexiv Solutions","Verity Capital", "ModaMart", "VitaCare Health", "TerraVista Properties"]
transcript_directory = './data/transcripts'
chunked_transcript_directory = './data/chunked_transcripts'
MODELS_DIR = "/llamas"
MODELS_VOLUME = "llamas"


# TODO: Try using other small models: Gemma, Mixtral, Phi
# We are using FP8 quantized model from Neural Magic, which is smaller and faster than the original model
DEFAULT_NAME = "neuralmagic/Meta-Llama-3.1-8B-Instruct-FP8"
DEFAULT_REVISION = "3aed33c3d2bfa212a137f6c855d79b5426862b24"