from pydantic import BaseModel, Field
from typing import Optional


class LoginRequest(BaseModel):
    username: str
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class SettingsUpdateRequest(BaseModel):
    display_name: Optional[str] = None
    shop_name: Optional[str] = None


class CustomerCreate(BaseModel):
    name: str
    mobile: str
    address: Optional[str] = ""
    date_added: str


class CustomerUpdate(BaseModel):
    name: str
    mobile: str
    address: Optional[str] = ""


class MeasurementCreate(BaseModel):
    customer_id: int
    shirt_length: Optional[float] = None
    shoulder: Optional[float] = None
    chest: Optional[float] = None
    waist: Optional[float] = None
    sleeve_length: Optional[float] = None
    bicep: Optional[float] = None
    neck: Optional[float] = None
    pant_length: Optional[float] = None
    pant_waist: Optional[float] = None
    hip: Optional[float] = None
    thigh: Optional[float] = None
    crotch: Optional[float] = None
    bottom: Optional[float] = None
    special_instructions: Optional[str] = ""
    entry_date: str


class OrderCreate(BaseModel):
    customer_id: int
    order_date: str
    status: Optional[str] = "Pending"
    notes: Optional[str] = ""
