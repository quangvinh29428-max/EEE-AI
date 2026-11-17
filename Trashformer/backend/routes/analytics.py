from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database.db import get_db
from models.waste_model import DetectionRecord
from schemas.waste_schema import AnalyticsStats

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/", response_model=AnalyticsStats)
def get_analytics_summary(db: Session = Depends(get_db)):
    total = db.query(DetectionRecord).count()

    if total == 0:
        # Trả về bộ số liệu phân tích mẫu trực quan (được gắn cờ is_demo_data=True rõ ràng)
        return AnalyticsStats(
            total_detections=148,
            organic_count=52,
            inorganic_count=74,
            hazardous_count=22,
            is_demo_data=True,
            top_detected_items=[
                {"name": "Chai nhựa PET", "count": 38, "category": "inorganic"},
                {"name": "Thức ăn thừa", "count": 29, "category": "organic"},
                {"name": "Vỏ trái cây", "count": 23, "category": "organic"},
                {"name": "Lon kim loại", "count": 21, "category": "inorganic"},
                {"name": "Bìa carton", "count": 15, "category": "inorganic"},
                {"name": "Pin cũ", "count": 12, "category": "hazardous"},
                {"name": "Túi nilon", "count": 10, "category": "inorganic"}
            ],
            category_distribution=[
                {"name": "Rác vô cơ", "value": 74, "color": "#2563eb", "category": "inorganic"},
                {"name": "Rác hữu cơ", "value": 52, "color": "#16a34a", "category": "organic"},
                {"name": "Rác nguy hại / Thu gom riêng", "value": 22, "color": "#ea580c", "category": "hazardous"}
            ],
            trend_data=[
                {"date": "Thứ 2", "organic": 6, "inorganic": 9, "hazardous": 2, "total": 17},
                {"date": "Thứ 3", "organic": 8, "inorganic": 12, "hazardous": 3, "total": 23},
                {"date": "Thứ 4", "organic": 7, "inorganic": 10, "hazardous": 4, "total": 21},
                {"date": "Thứ 5", "organic": 9, "inorganic": 11, "hazardous": 3, "total": 23},
                {"date": "Thứ 6", "organic": 10, "inorganic": 14, "hazardous": 5, "total": 29},
                {"date": "Thứ 7", "organic": 12, "inorganic": 18, "hazardous": 5, "total": 35}
            ]
        )

    # Thống kê thực tế từ CSDL
    organic = db.query(DetectionRecord).filter(DetectionRecord.category == "organic").count()
    inorganic = db.query(DetectionRecord).filter(DetectionRecord.category == "inorganic").count()
    hazardous = db.query(DetectionRecord).filter(DetectionRecord.category == "hazardous").count()

    top_items_query = (
        db.query(DetectionRecord.item_name, DetectionRecord.category, func.count(DetectionRecord.id).label("cnt"))
        .group_by(DetectionRecord.item_name, DetectionRecord.category)
        .order_by(func.count(DetectionRecord.id).desc())
        .limit(7)
        .all()
    )

    top_items = [
        {"name": row[0], "category": row[1], "count": row[2]}
        for row in top_items_query
    ]

    return AnalyticsStats(
        total_detections=total,
        organic_count=organic,
        inorganic_count=inorganic,
        hazardous_count=hazardous,
        is_demo_data=False,
        top_detected_items=top_items,
        category_distribution=[
            {"name": "Rác vô cơ", "value": inorganic, "color": "#2563eb", "category": "inorganic"},
            {"name": "Rác hữu cơ", "value": organic, "color": "#16a34a", "category": "organic"},
            {"name": "Rác nguy hại / Thu gom riêng", "value": hazardous, "color": "#ea580c", "category": "hazardous"}
        ],
        trend_data=[
            {"date": "Tổng hợp", "organic": organic, "inorganic": inorganic, "hazardous": hazardous, "total": total}
        ]
    )

