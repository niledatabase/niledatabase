import boto3
import json
import psycopg2
from pgvector.psycopg2 import register_vector

# Create a Bedrock Runtime client in the AWS Region of your choice.
client = boto3.client("bedrock-runtime", region_name="us-west-2")

# Set the model ID, e.g., Titan Text Embeddings V2.
model_id = "amazon.titan-embed-text-v2:0" # you can try other models as well, once you request access

conn = psycopg2.connect('postgresql://01919b11-44b6-72f4-9f70-7897eeb3cd77:f7888d52-11f4-422f-9665-f950db6406b0@us-west-2.db.thenile.dev:5432/sales_insight')
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

# Turn each todo item into a request to the model and convert the request to a JSON string.
# Amazing Titan Embeddings model doesn't accept batch requests, so we need to send one item at a time.
requests = [{"inputText": item} for item in todo_items]

# Call the model with each request and store the response in Nile
for item, request in zip(todo_items, requests):
    json_response = client.invoke_model(body=json.dumps(request), modelId=model_id)
    response = json.loads(json_response.get('body').read())
    cur.execute("INSERT INTO todos (tenant_id, title, embedding) VALUES (%s, %s, %s)", (tenant_id, item, response.get('embedding')))

question = "Is there any work left on authentication?"
question_embedding = client.invoke_model(body=json.dumps({"inputText": question}), modelId=model_id)
question_embedding = json.loads(question_embedding.get('body').read())

# Search for the question embedding in the database

cur.execute("set nile.tenant_id = %s", (tenant_id,))
cur.execute("SELECT title, complete FROM todos ORDER BY embedding <#> %s::vector LIMIT 1", (question_embedding.get('embedding'),))
print(cur.fetchone())