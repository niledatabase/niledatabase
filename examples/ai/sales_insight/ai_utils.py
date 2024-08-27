import os
import openai;
import logging;
from typing import List
from enum import Enum
from dotenv import load_dotenv
load_dotenv()

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

def get_embedding(text: str, task: EmbeddingTasks) -> List[float]:
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
    response = client.embeddings.create(
        model=os.getenv("EMBEDDING_MODEL"),
        input=adjust_input(text, task),
        # dimensions=128, # optional, nomic models are 768 by default, but scale down
    )
    
    return response.data[0].embedding

def get_similar(session: any, text: str):
    ### TBD: Implement this after we have a table for storing embeddings
    # query_embedding = get_embedding(text, EmbeddingTasks.SEARCH_QUERY)
    # similar_tasks_raw = (
    #    session.query(Todo)
    #    .filter(Todo.embedding.cosine_distance(query_embedding) < 1)
    #    .order_by(Todo.embedding.cosine_distance(query_embedding)).limit(3))
    #return [{"title": task.title, "estimate": task.estimate} for task in similar_tasks_raw]
    return []