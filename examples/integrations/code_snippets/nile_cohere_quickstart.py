import cohere
import psycopg2
from pgvector.psycopg2 import register_vector

cohere = cohere.Client('y6ao3o1YVXXIetrpZIXfFoh8HWUOJImwMXLPvTMc')
model = "embed-english-v3.0" # Replace with your favorite Cohere model

conn = psycopg2.connect('postgresql://user:password@us-west-2.db.thenile.dev:5432/mydb')
conn.set_session(autocommit=True)
cur = conn.cursor()
register_vector(cur)
cur.execute("insert into tenants (name) values ('first tenant') returning id;")
tenant_id = cur.fetchone()[0]

todo_items = [
    "Center a div",
    "Implement RAG-based HR chatbot",
    "Add OKTA authentication to the app",
    "Write a blog post about RAG with Cohere and Nile",
    "Optimize a slow database query",
]

response = cohere.embed(model=model, texts=todo_items, input_type="search_document").embeddings

for item, embedding in zip(todo_items, response):
    cur.execute("INSERT INTO todos (tenant_id, title, embedding) VALUES (%s, %s, %s)", (tenant_id, item, embedding))

question = "Is there any work left on authentication?"
question_embedding = cohere.embed(model=model, texts=[question], input_type="search_query").embeddings[0]

cur.execute("set nile.tenant_id = %s", (tenant_id,))
cur.execute("SELECT title, complete FROM todos ORDER BY embedding <#> %s::vector LIMIT 1", (question_embedding,))
print(cur.fetchone())