from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    is_subscribed: bool
    subscription_ends: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class PDFProcessRequest(BaseModel):
    student_text: str
    parent_text: str


class PaymentInitialize(BaseModel):
    email: EmailStr
    amount: int
