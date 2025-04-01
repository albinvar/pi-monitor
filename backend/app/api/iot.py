# backend/app/api/iot.py
from fastapi import APIRouter

router = APIRouter()

# Dummy IoT device status
@router.get("/iot-devices")
async def get_iot_devices():
    devices = [
        {"name": "Bedroom Light", "status": "ON", "error": 0},
        {"name": "CCTV - Front Yard", "status": "ON", "error": 0},
        {"name": "Washing Machine", "status": "OFF", "error": 0},
        {"name": "Bedroom Fan", "status": "ON", "error": 0}
    ]
    return {"devices": devices}
