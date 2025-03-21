import os

import modal
import psycopg2


image = modal.Image.debian_slim(python_version="3.10").pip_install(
    "psycopg2-binary",
)

app = modal.App("quickstart-nile-modal")

@app.function(image=image, secrets=[modal.Secret.from_name("my-nile-secret")])
def nile_quickstart():
    
        conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        conn.set_session(autocommit=True)
        cur = conn.cursor()

        tenant_id = create_tenant("My first tenant", cur)

        create_todo(tenant_id, "My first todo", cur)
        print(f"Created todo for first tenant. Showing all todos:\n {show_todos(cur)}\n\n")

        tenant_id = create_tenant("Another tenant", cur)
        create_todo(tenant_id, "My second todo", cur)
        print(f"Created second tenant and their todo. Showing all todos:\n {show_todos(cur)}\n\n")

        cur.execute("SET nile.tenant_id = %s", (tenant_id,) )
        # No need to change the query, since we are connected to their virtual tenant database
        print(f"Connected to virtual tenant database for tenant {tenant_id}. Showing all todos:\n {show_todos(cur)}\n")

        cur.close()
        conn.close()
        
def create_tenant(name: str, cur: psycopg2.extensions.cursor):
    cur.execute("INSERT INTO tenants (name) VALUES (%s) RETURNING id;", (name,))
    return cur.fetchone()[0]

def create_todo(tenant_id: int, title: str, cur: psycopg2.extensions.cursor):
    cur.execute("INSERT INTO todos (tenant_id, title) VALUES (%s, %s);", (tenant_id, title))
    return True

def show_todos(cur: psycopg2.extensions.cursor):
    cur.execute("SELECT tenants.name, title FROM todos join tenants on tenants.id = todos.tenant_id;")
    return cur.fetchall()