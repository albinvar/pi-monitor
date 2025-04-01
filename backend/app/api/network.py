# backend/app/api/network.py
from fastapi import APIRouter
import psutil

router = APIRouter()

@router.get("/network")
async def get_network_usage():
    network = psutil.net_io_counters()
    return {"bytes_sent": network.bytes_sent, "bytes_recv": network.bytes_recv}
