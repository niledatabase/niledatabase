import os
import openai;
import logging;
from typing import List
from enum import Enum
from dotenv import load_dotenv
load_dotenv()

from models import Chunk

logger = logging.getLogger(__name__)
# Wrapper functions around embedding generation and chat models

class EmbeddingTasks(Enum):
    SEARCH_DOCUMENT = "search_document:"
    SEARCH_QUERY = "search_query:"

# Nomic models are fine tuned for specific tasks. They benefit from a prefix that describes the task:
def adjust_input(text: str, task: EmbeddingTasks) -> str:
    if ("nomic" in os.getenv("EMBEDDING_MODEL")):
        return task.value + text
    else:
        return text

# TODO: Move this to use Modal, so we don't need to have an extra API key, extra network hops, etc.
def get_embedding(text: str, task: EmbeddingTasks) -> List[float]:
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    response = client.embeddings.create(
        model=os.getenv("EMBEDDING_MODEL"),
        input=adjust_input(text, task),
        # dimensions=128, # optional, nomic models are 768 by default, but scale down
    )
    
    return response.data[0].embedding

# Todo: Get the conversation before and after the chunk to provide context
def get_similar_chunks(session: any, embedding: List[float]):
    similar_chunks_raw = (
        session.query(Chunk)
        .filter(Chunk.embedding.cosine_distance(embedding) < 1)
        .order_by(Chunk.embedding.cosine_distance(embedding)).limit(5))
    return [{"conversation_id": chunk.conversation_id, "speaker_role": chunk.speaker_role, "content": chunk.content} for chunk in similar_chunks_raw]