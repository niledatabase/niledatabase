import os
from dotenv import load_dotenv

load_dotenv()
import psycopg2
from slugify import slugify
import pandas as pd
import numpy as np
import psycopg2.extras as extras
from ..constants import chunked_transcript_directory, tenants


# Store embeddings in the database
# We use the following schema:
# create table call_chunks_ada002 ( 
#    tenant_id uuid,
#    conversation_id varchar(50),
#    chunk_id int,
#    speaker_role varchar(20),
#    content text,
#    embedding vector(1536)
# );
connection = psycopg2.connect(os.getenv("DATABASE_URL"))
connection.autocommit = True
cursor = connection.cursor()

print("Connected to database")
print("Creating tenants:" + str(tenants))

for tenant in tenants:
    cursor.execute("INSERT INTO tenants (name) VALUES ('%s') RETURNING id;" % tenant)
    tenant_id = cursor.fetchone()[0]
    print(f"Created tenant {tenant} with id {tenant_id}")
    
    for filename in os.listdir(chunked_transcript_directory):
        if filename.endswith(".csv") and filename.startswith(slugify(tenant)):
            print(f"Processing {filename}")
            data = pd.read_csv(os.path.join(chunked_transcript_directory, filename))
            data["tenant_id"] = tenant_id
            data = data.rename(columns={'Conversation': 'conversation_id', 'Chunk_id': 'chunk_id', 'Speaker': 'speaker_role', 'Text': 'content', 'Embedding': 'embedding'})
            # insert the data in batches
            batch_size = 10
            for i in range(0, len(data), batch_size):
                batch = data.iloc[i:i+batch_size]
                cols = ','.join(list(data.columns))
                tuples = [tuple(x) for x in batch.to_numpy()] 
                query = "INSERT INTO call_chunks_ada002(%s) VALUES %%s" % (cols)
                try:
                    extras.execute_values(cursor, query, tuples)
                    print(f"Inserted {i + len(batch)} rows")
                except Exception as e:
                    print(e)
                    break
            # commit after all inserts are done
            