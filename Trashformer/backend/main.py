import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import init_db
from routes.detection import router as detection_router
from routes.waste_library import router as waste_router
from routes.history import router as history_router
from routes.analytics import router as analytics_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Khởi tạo bảng cơ sở dữ liệu
    init_db()
    print("=" * 60)
    print(" 🌿 TRASHFORMER AI BACKEND SERVER IS RUNNING")
    print(" Transform Waste, Protect Earth.")
    print(" API Documentation: http://localhost:8000/docs")
    print("=" * 60)
    yield

app = FastAPI(
    title="Trashformer API - AI Waste Classification & Analysis",
    description="Hệ thống Backend REST API cho website nhận diện và phân tích rác thải bằng AI.",
    version="1.0.0",
    lifespan=lifespan
)

# Cấu hình CORS mở cho các client frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký các Router chức năng
app.include_router(detection_router)
app.include_router(waste_router)
app.include_router(history_router)
app.include_router(analytics_router)

@app.get("/")
def root_info():
    return {
        "project": "Trashformer",
        "full_name": "Trashformer – AI Waste Classification & Analysis",
        "slogan_en": "Transform Waste, Protect Earth.",
        "slogan_vi": "Biến đổi rác thải – Bảo vệ Trái Đất.",
        "version": "1.0.0",
        "status": "online",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

