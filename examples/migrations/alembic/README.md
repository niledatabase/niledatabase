# Example of using Alembic migrations with Nile

## Step 1: Set up Alembic in your project

```bash
virtualenv .venv
source .venv/bin/activate 
# install alembic, sqlalchemy, psycopg2-binary and dotenv
pip install -r requirements.txt
alembic init alembic
```

## Step 2: Create a Migration Script

```bash
alembic revision -m "create account table"
```

This will generate a new file: `./alembic/versions/13379be60997_create_account_table.py`. Now we want to edit the file and add the migration script to it:

```py
def upgrade():
    op.create_table(
        'account',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('description', sa.Unicode(200)),
    )

def downgrade():
    op.drop_table('account')
```

## Step 3: Connect to Database

To connect Alembic to the right database, edit `alembic.ini` and edit the following:

```ini
sqlalchemy.url = postgresql://user:password@host:5432/dbname
```

When getting started, you can hard-code your connection string (that you got from Nile console), but if you are planning to commit the code anywhere or run it in production, you should use environment variables as described [here](https://stackoverflow.com/a/55190497).

## Step 4: Run the Migration

```bash
alembic upgrade head
```

Thats it! You can connect to your database and see the new table.

## Next Steps

This is the most basic use-case of Alembic. There is a lot more to it, which you can learn from the official [Alembic documentation](https://alembic.sqlalchemy.org/en/latest/front.html).

## Generating migrations from model and database

```
alembic revision --autogenerate -m initial
```
