# backend/app/api/cctv.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/cctv")
async def get_cctv_status():
    return {"status": "LIVE", "uptime": "12h 38m", "bitrate": "3.2 Mbps", "motion": "No Motion"}
