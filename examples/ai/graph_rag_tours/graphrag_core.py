import os, uuid, psycopg2, openai, psycopg2.extras
import numpy as np
from pgvector.psycopg2 import register_vector
psycopg2.extras.register_uuid()

openai.api_key = os.getenv("OPENAI_API_KEY")
conn           = psycopg2.connect(os.getenv("DATABASE_URL"))
register_vector(conn)

def graphrag_answer(question: str, tenant: uuid.UUID, k: int = 3) -> str:
    qvec = openai.embeddings.create(
        model="text-embedding-3-small",
        input=question
    ).data[0].embedding

    with conn, conn.cursor() as cur:
        conn.commit() # Need to set tenant_id at the start of the transaction
        cur.execute(f"SET nile.tenant_id = '{tenant}';")

        # run the combined vector+graph search (no tenant filter needed inside)
        # this loads the 2 most relevant points of interest (based on vector search) 
        # and points of interest on the shortest path between them (based on graph search)
        query = open("graph_rag.sql").read()
        params = (np.array(qvec),)
        # print(cur.mogrify(query, params).decode('utf-8')) # Uncomment to see the SQL query
        cur.execute(query, params)

        rows = cur.fetchall()

    # 3) give context to the LLM
    context = "\n---\n".join(
        f"{r[0]} ({r[1]}): {r[2]}" for r in rows
    )
    print("calling LLM with context: ", context)
    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": """
                You are a helpful outdoor guide.
                You are given a question and a list of points of interest - 2 most relevant points of interest and points of interest on the shortest path between them.
                You need to answer the question and suggest a fun adventure based on the points of interest.
                It is better if you use all the points, but it is not required.
                Make the plan realistic and fun.
            """},
            {"role": "user",    "content": question},
            {"role": "assistant","content": context}
        ]
    )
    return completion.choices[0].message.content
