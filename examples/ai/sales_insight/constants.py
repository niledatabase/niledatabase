app_name = "sales-insight"
industries = ["tech", "finance", "retail", "healthcare", "real estate"]
tenants = ["Nexiv Solutions","Verity Capital", "ModaMart", "VitaCare Health", "TerraVista Properties"]
transcript_directory = './data/transcripts'
chunked_transcript_directory = './data/chunked_transcripts'
MODELS_DIR = "/llamas"
MODELS_VOLUME = "llamas"


# TODO: Try using other small models: Gemma, Mixtral, Phi
DEFAULT_NAME = "meta-llama/Meta-Llama-3.1-8B-Instruct"
DEFAULT_REVISION = "5206a32e0bd3067aef1ce90f5528ade7d866253f" # original: "8c22764a7e3675c50d4c7c9a4edb474456022b16"