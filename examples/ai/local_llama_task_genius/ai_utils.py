import os
import logging
from llama_index.core import VectorStoreIndex, Document, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.vector_stores.nile import NileVectorStore
from models import Todo

logger = logging.getLogger(__name__)

class AIUtils:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AIUtils, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        # Initialize settings and vector store once
        Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text")
        Settings.llm = Ollama(model="llama3.2", request_timeout=360.0)
        
        self.vector_store = NileVectorStore(
            service_url=os.getenv("DATABASE_URL"),
            table_name="todos_embedding",
            tenant_aware=True,
            num_dimensions=768
        )
        self.index = VectorStoreIndex.from_vector_store(self.vector_store)

    def store_embedding(self, todo: Todo):
        document = Document(
            text=f"{todo.title} is estimated to take {todo.estimate} to complete",
            id_=str(todo.id),
            metadata={"tenant_id": str(todo.tenant_id)}
        )
        logger.debug(f"Inserting document {document}")
        self.index.insert(document)

    def ai_estimate(self, text: str, tenant_id: str):
        query_engine = self.index.as_query_engine(vector_store_kwargs={
            "tenant_id": str(tenant_id),
        })

        response = query_engine.query(
            f'you are an amazing project manager. I need to {text}. How long do you think this will take? '
            f'respond with just the estimate, no yapping.'
        )
        
        return response.response if response.response != "Empty Response" else "unknown amount of time"

# Usage example:
# ai_utils = AIUtils()
# ai_utils.store_embedding(todo)
# estimate = ai_utils.ai_estimate("create a new feature", "tenant_123")
