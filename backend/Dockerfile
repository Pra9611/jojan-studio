# Python official base image
FROM python:3.10-slim

# Working directory set karein container ke andar
WORKDIR /app

# Requirements file copy karke dependencies install karein
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pura backend code container me copy karein
COPY backend/ .
COPY frontend/ /frontend

# FastAPI / Flask port expose karein (agar Uvicorn/FastAPI hai toh 8000 port)
EXPOSE 8000

# Server start karne ki command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]