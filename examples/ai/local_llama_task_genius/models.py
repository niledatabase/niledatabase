from sqlmodel import Field, Column, SQLModel, text
from sqlalchemy import MetaData
from typing import List, Optional
from uuid import UUID, uuid4

users_schema = MetaData(schema="users")
auth_schema = MetaData(schema="auth")

'''
  Column   |          Type          | Collation | Nullable |      Default      | Storage  | Compression | Stats target | Description
-----------+------------------------+-----------+----------+-------------------+----------+-------------+--------------+-------------
 id        | uuid                   |           |          | gen_random_uuid() | plain    |             |              |
 tenant_id | uuid                   |           |          |                   | plain    |             |              |
 title     | character varying(256) |           |          |                   | extended |             |              |
 complete  | boolean                |           |          |                   | plain    |             |              |
 estimate  | character varying(256) |           |          |                   | extended |             |              |
 '''
class Todo(SQLModel, table=True):
    __tablename__ = "todos"
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    tenant_id: UUID
    title: str
    estimate: str
    complete: bool = False    
    
class Tenant(SQLModel, table=True):
    __tablename__ = "tenants"
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    name: str
    
class TenantUsers(SQLModel, table=True):
    __tablename__ = "tenant_users"
    user_id: UUID = Field(primary_key=True)
    tenant_id: UUID = Field(primary_key=True)
        
# Nile has additional optional fields for username, given name, etc.
class User(SQLModel, table=True):
    __tablename__ = "users"
    metadata = users_schema
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    email: str
    name: str = None
    given_name: str = None
    family_name: str = None

class Credentials(SQLModel, table=True):
    __tablename__ = "credentials"
    metadata = auth_schema
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    user_id: UUID
    method: str
    payload: str = Field(sa_column=text("jsonb"))

class Token(SQLModel):
    access_token: str
    token_type: str
    
