from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class WasteCategory(str, Enum):
    ORGANIC = "organic"         # Nhóm A - Rác hữu cơ
    INORGANIC = "inorganic"     # Nhóm B - Rác vô cơ
    HAZARDOUS = "hazardous"     # Nhóm C - Rác cần thu gom riêng / Nguy hại

class DetectionResult(BaseModel):
    id: Optional[int] = None
    item_name: str
    category: WasteCategory
    category_label: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    material_prediction: str
    is_demo: bool = True
    ai_engine: str = "Demo Simulation Engine"
    physical_properties: List[str]
    advantages: List[str]
    disadvantages: List[str]
    reuse_potential: str
    recyclability: str
    environmental_impact: List[str]
    handling_guide: List[str]
    warning: Optional[str] = None
    image_base64: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

class WasteItemDetail(BaseModel):
    slug: str
    name: str
    category: WasteCategory
    category_label: str
    common_names: List[str]
    description: str
    material: str
    recyclable: bool
    physical_properties: List[str]
    advantages: List[str]
    disadvantages: List[str]
    environmental_impact: List[str]
    handling_guide: List[str]
    image_url: str

class CorrectionRequest(BaseModel):
    record_id: Optional[int] = None
    corrected_name: str
    corrected_category: WasteCategory
    feedback_notes: Optional[str] = None

class AnalyticsStats(BaseModel):
    total_detections: int
    organic_count: int
    inorganic_count: int
    hazardous_count: int
    top_detected_items: List[dict]
    category_distribution: List[dict]
    trend_data: List[dict]
    is_demo_data: bool = False

