# backend/app/api/memory.py
from fastapi import APIRouter
import psutil

router = APIRouter()

@router.get("/memory")
async def get_memory_usage():
    memory = psutil.virtual_memory()
    return {"used_memory": memory.used, "total_memory": memory.total, "available_memory": memory.available}
