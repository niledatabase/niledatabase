from sqlalchemy import Column, String, Boolean, UUID, MetaData, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from uuid import uuid4

Base = declarative_base()

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(UUID, primary_key=True, default=uuid4)
    tenant_id = Column(UUID, ForeignKey("tenants.id"), primary_key=True)
    title = Column(String(256), nullable=False)
    description = Column(String(1000))
    complete = Column(Boolean, default=False)

class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(UUID, primary_key=True, default=uuid4)
    name = Column(String(256), nullable=False)

    