from sqlalchemy import Column, String, Boolean, DateTime, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    is_subscribed = Column(Boolean, default=False)
    subscription_ends = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    usage = relationship("Usage", back_populates="user")


class Usage(Base):
    __tablename__ = "usage"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    month = Column(String, nullable=False)
    edits_used = Column(Integer, default=0)

    user = relationship("User", back_populates="usage")
