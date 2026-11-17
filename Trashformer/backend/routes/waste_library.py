from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from services.waste_classifier import get_all_waste_items, get_waste_by_slug, search_waste_items

router = APIRouter(prefix="/api/waste", tags=["Waste Library"])

@router.get("/")
def get_waste_list(
    q: Optional[str] = Query(None, description="Tìm kiếm theo từ khóa"),
    category: Optional[str] = Query(None, description="Lọc theo nhóm rác: organic, inorganic, hazardous")
):
    """Lấy danh sách các loại rác trong thư viện kiến thức"""
    return search_waste_items(query=q, category=category)

@router.get("/{slug}")
def get_waste_detail(slug: str):
    """Xem chi tiết một loại rác theo slug"""
    item = get_waste_by_slug(slug)
    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông tin loại rác này trong thư viện")
    return item

