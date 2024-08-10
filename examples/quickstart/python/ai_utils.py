import os
import openai;
import logging;
from typing import List
from enum import Enum
from models import Todo

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
    client = openai.OpenAI(
        base_url = os.getenv("AI_BASE_URL"),
        api_key=os.getenv("AI_API_KEY"),
    )
        
    response = client.embeddings.create(
        model=os.getenv("EMBEDDING_MODEL"),
        input=adjust_input(text, task),
        # dimensions=128, # optional, nomic models are 768 by default, but scale down
    )
    
    return response.data[0].embedding

def get_similar_tasks(session: any, text: str):
    query_embedding = get_embedding(text, EmbeddingTasks.SEARCH_QUERY)
    similar_tasks_raw = (
        session.query(Todo)
        .filter(Todo.embedding.cosine_distance(query_embedding) < 1)
        .order_by(Todo.embedding.cosine_distance(query_embedding)).limit(3))
    return [{"title": task.title, "estimate": task.estimate} for task in similar_tasks_raw]

def ai_estimate(text: str, similar_tasks):
    client = openai.OpenAI(
        base_url = os.getenv("AI_BASE_URL"),
        api_key = os.getenv("AI_API_KEY"),
    )
    
    response = client.chat.completions.create(
        model = os.getenv("AI_MODEL"),
        messages = [
            {
                "role": "user",
                "content" : 
                    f'you are an amazing project manager. I need to {text}. How long do you think this will take?' 
                    f'I have a few similar tasks with their estimates, please use them as reference: {similar_tasks}.'
                    f'respond with just the estimate, no yapping.',
             },
        ],   
    )
    
    # if we got a valid response, return it
    if (response.choices[0].finish_reason == "stop"):
        return response.choices[0].message.content
    else:
        # otherwise, we simply don't have an estimate
        return "unknown"
    
    
    
    
    