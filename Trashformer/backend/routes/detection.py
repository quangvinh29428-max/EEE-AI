from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing import Optional
from database.db import get_db
from services.ai_service import ai_service
from services.gemini_service import gemini_service
from schemas.waste_schema import DetectionResult, CorrectionRequest
from models.waste_model import DetectionRecord
from services.waste_classifier import WASTE_KNOWLEDGE_BASE
import base64

router = APIRouter(prefix="/api/detect", tags=["Detection"])

@router.post("/", response_model=DetectionResult)
async def detect_waste(
    file: UploadFile = File(...),
    force_demo: Optional[bool] = Form(False),
    db: Session = Depends(get_db)
):
    # Kiểm tra định dạng file
    valid_content_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in valid_content_types:
        raise HTTPException(
            status_code=400,
            detail=f"Định dạng file không hỗ trợ: {file.content_type}. Chỉ chấp nhận JPG, JPEG, PNG, WEBP."
        )

    # Đọc dữ liệu ảnh
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="File ảnh rỗng. Vui lòng chọn ảnh hợp lệ.")

    # Phân tích
    result = ai_service.analyze_image(
        image_bytes=contents,
        filename=file.filename or "",
        force_demo=force_demo,
        db=db
    )
    return result

@router.post("/gemini")
async def detect_waste_with_gemini(
    file: UploadFile = File(...),
    api_key: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Nhận diện và phân tích rác thải bằng Google Gemini 1.5/2.0 Flash Multimodal Vision AI.
    Không bịa kết quả nếu ảnh không chứa rác.
    """
    valid_content_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in valid_content_types:
        raise HTTPException(
            status_code=400,
            detail=f"Định dạng file không hỗ trợ: {file.content_type}."
        )

    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="File ảnh rỗng.")

    if api_key and api_key.strip():
        gemini_service.set_api_key(api_key.strip())

    if not gemini_service.is_configured:
        raise HTTPException(
            status_code=400,
            detail="Chưa cấu hình GEMINI_API_KEY. Vui lòng nhập API Key từ Google AI Studio."
        )

    try:
        mime = file.content_type or "image/jpeg"
        analysis = gemini_service.analyze_waste_image(contents, mime_type=mime)
        
        # Nếu Gemini phát hiện không có rác thải trong ảnh
        if not analysis.get("is_waste", True):
            return {
                "success": False,
                "is_waste": False,
                "reason": analysis.get("reason", "Không tìm thấy rác thải nào trong khung hình.")
            }

        # Lưu preview ảnh và ghi nhận vào cơ sở dữ liệu
        img_b64 = "data:image/jpeg;base64," + base64.b64encode(contents).decode("utf-8")
        analysis["image_base64"] = img_b64
        analysis["success"] = True

        record = DetectionRecord(
            item_name=analysis["item_name"],
            category=analysis["category"],
            category_label=analysis["category_label"],
            confidence=float(analysis.get("confidence", 0.95)),
            image_base64=img_b64 if len(img_b64) < 2 * 1024 * 1024 else None,
            source="upload",
            ai_engine="Google Gemini Vision AI"
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        analysis["record_id"] = record.id
        return analysis

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/gemini-chat")
async def chat_with_gemini(payload: dict = Body(...)):
    """
    Hỏi đáp sinh thái trực tiếp với Gemini AI về vật thể rác đang xem.
    Payload: {"item_name": "...", "category": "...", "question": "...", "api_key": "..."}
    """
    item_name = payload.get("item_name", "Rác thải")
    category = payload.get("category", "inorganic")
    question = payload.get("question", "").strip()
    api_key = payload.get("api_key", "").strip()

    if not question:
        raise HTTPException(status_code=400, detail="Câu hỏi không được để trống.")

    if api_key:
        gemini_service.set_api_key(api_key)

    if not gemini_service.is_configured:
        raise HTTPException(
            status_code=400,
            detail="Chưa cấu hình GEMINI_API_KEY."
        )

    try:
        answer = gemini_service.chat_about_waste(item_name, category, question)
        return {"success": True, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
def get_ai_status():
    """Kiểm tra tình trạng kết nối các mô hình AI"""
    status = ai_service.get_system_ai_status()
    status["gemini_configured"] = gemini_service.is_configured
    status["gemini_model"] = gemini_service.model_name
    return status

@router.post("/correct")
def correct_detection(request: CorrectionRequest, db: Session = Depends(get_db)):
    """Người dùng đính chính kết quả khi AI không chắc chắn"""
    if not request.record_id:
        return {"status": "ok", "message": "Đã ghi nhận đóng góp từ người dùng!"}

    record = db.query(DetectionRecord).filter(DetectionRecord.id == request.record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Không tìm thấy bản ghi lịch sử")

    record.item_name = request.corrected_name
    record.category = request.corrected_category.value
    record.user_corrected = True
    record.user_notes = request.feedback_notes
    db.commit()
    return {"status": "ok", "message": "Cập nhật đóng góp thành công!", "record_id": record.id}

