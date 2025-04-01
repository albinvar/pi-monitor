# backend/app/api/system_stats.py
from fastapi import APIRouter
import psutil
import glob
import subprocess
import time

router = APIRouter()

@router.get("/system-stats")
async def get_system_stats():
    # Get the number of CPU cores
    num_cores = psutil.cpu_count(logical=False)  # Physical cores
    logical_cores = psutil.cpu_count(logical=True)  # Logical cores

    # Get overall CPU usage percentage
    cpu_load = psutil.cpu_percent(interval=1)

    # Get CPU usage per core
    cpu_per_core = psutil.cpu_percent(interval=1, percpu=True)

    # Get the temperature of the Raspberry Pi using vcgencmd
    try:
        # Run vcgencmd to fetch temperature
        temp_output = subprocess.check_output(["vcgencmd", "measure_temp"]).decode("utf-8")
        # Extract the temperature from the string (e.g., "temp=46.1'C")
        cpu_temp = temp_output.split('=')[1].split("'")[0]
    except Exception as e:
        cpu_temp = 'N/A'

    # Read fan speed (RPM) dynamically by using glob to match the path
    try:
        # Use glob to find the fan speed file dynamically
        fan_speed_file = glob.glob('/sys/devices/platform/cooling_fan/hwmon/*/fan1_input')
        if fan_speed_file:
            with open(fan_speed_file[0], 'r') as f:
                fan_speed = f.read().strip()
        else:
            fan_speed = 'N/A'
    except Exception as e:
        fan_speed = 'N/A'

    # Get memory usage (total and used memory)
    memory = psutil.virtual_memory()
    total_memory = memory.total
    used_memory = memory.used

    # Calculate network speed (download and upload in bytes per second)
    net_io_start = psutil.net_io_counters()
    time.sleep(1)
    net_io_end = psutil.net_io_counters()

    download_speed = net_io_end.bytes_recv - net_io_start.bytes_recv  # Bytes received in 1 second
    upload_speed = net_io_end.bytes_sent - net_io_start.bytes_sent  # Bytes sent in 1 second

    # Convert bytes to a more readable unit (KB/s or MB/s)
    download_speed_kb = download_speed / 1024  # Convert to KB
    upload_speed_kb = upload_speed / 1024  # Convert to KB

    # Return all the data in a unified response
    return {
        "cpu_load": cpu_load,
        "num_cores": num_cores,
        "logical_cores": logical_cores,
        "cpu_per_core_usage": cpu_per_core,
        "temperature": cpu_temp,
        "fan_speed": fan_speed,
        "total_memory": total_memory,
        "used_memory": used_memory,
        "download_speed_kb": download_speed_kb,
        "upload_speed_kb": upload_speed_kb
    }
