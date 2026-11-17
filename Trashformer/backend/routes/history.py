from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from database.db import get_db
from models.waste_model import DetectionRecord

router = APIRouter(prefix="/api/history", tags=["History"])

@router.get("/")
def get_detection_history(
    category: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    query = db.query(DetectionRecord)
    if category:
        query = query.filter(DetectionRecord.category == category)
    if q:
        query = query.filter(DetectionRecord.item_name.ilike(f"%{q}%"))
    
    records = query.order_by(DetectionRecord.created_at.desc()).limit(limit).all()
    return [r.to_dict() for r in records]

@router.get("/{record_id}")
def get_single_record(record_id: int, db: Session = Depends(get_db)):
    record = db.query(DetectionRecord).filter(DetectionRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Không tìm thấy bản ghi lịch sử")
    return record.to_dict()

@router.delete("/{record_id}")
def delete_single_record(record_id: int, db: Session = Depends(get_db)):
    record = db.query(DetectionRecord).filter(DetectionRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Không tìm thấy bản ghi")
    db.delete(record)
    db.commit()
    return {"status": "success", "message": f"Đã xóa bản ghi #{record_id}"}

@router.delete("/")
def clear_all_history(db: Session = Depends(get_db)):
    db.query(DetectionRecord).delete()
    db.commit()
    return {"status": "success", "message": "Đã dọn dẹp sạch toàn bộ lịch sử nhận diện"}

