import os
import logging;
from typing import List
from enum import Enum
from sqlalchemy import text
from dotenv import load_dotenv
load_dotenv()

from models import Chunk

logger = logging.getLogger(__name__)
# Wrapper functions around embedding generation and chat models


# Todo: Get the conversation before and after the chunk to provide context
def get_similar_chunks(session: any, embedding: List[float], conversation_id: int):
    query = """
    with src as (
        SELECT * FROM call_chunks 
        WHERE conversation_id = '{}' 
        AND (embedding <=> '{}') < 1 
        ORDER BY embedding <=> '{}' LIMIT 3 ) 
    select cc.conversation_id, cc.speaker_role, cc.content from src
    join call_chunks as cc on 
        cc.conversation_id = src.conversation_id 
        and cc.tenant_id = src.tenant_id 
        and cc.chunk_id >= src.chunk_id -1
        and cc.chunk_id <= src.chunk_id + 1;
    """.format(conversation_id, embedding, embedding)
    similar_chunks_raw = session.execute(text(query))
    return [{"conversation_id": chunk.conversation_id, "speaker_role": chunk.speaker_role, "content": chunk.content} for chunk in similar_chunks_raw]