import os

from llama_index.core import SimpleDirectoryReader, StorageContext
from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.postgres import PGVectorStore

import openai

# Set up OpenAI API client
os.environ["OPENAI_API_KEY"] = "your-openai-api-key"
openai.api_key = os.environ["OPENAI_API_KEY"]

base_connection_string = "user:password@us-west-2.db.thenile.dev:5432/mydb"
connection_string = "postgresql+psycopg2://" + base_connection_string
async_connection_string = "postgresql+asyncpg://" + base_connection_string

documents = SimpleDirectoryReader("./data/sales").load_data()
print("Document ID:", documents[0].doc_id)

vector_store = PGVectorStore.from_params(
    connection_string=connection_string,
    async_connection_string=async_connection_string,
    table_name="document_vectors",
    embed_dim=1536,
    perform_setup=False,)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context, show_progress=True
)

query_engine = index.as_query_engine()
print("test query: ", query_engine.query("What were the customer pain points?"))