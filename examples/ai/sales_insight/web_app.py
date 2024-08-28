import os
import time
import modal

from constants import MODELS_DIR, DEFAULT_NAME, DEFAULT_REVISION, app_name, MODELS_VOLUME
from llm_app import llm_app, Model

app = modal.App(name=app_name+"-web")
app.include(llm_app)

@app.function()
@modal.web_endpoint(method="GET")
def get_sales_insight():
    model = Model()
    result = model.generate.remote(
        "What is the best way to improve sales? be concise and give just one tip."
    )
    return result;

@app.local_entrypoint()
def main():
    get_sales_insight.remote()