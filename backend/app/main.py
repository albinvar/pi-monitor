# backend/app/main.py
from fastapi import FastAPI
from .api import cpu

app = FastAPI()

# Include the routes
app.include_router(cpu.router, prefix="/api")
