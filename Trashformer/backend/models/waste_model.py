import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from database.db import Base

class DetectionRecord(Base):
    __tablename__ = "detection_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    item_name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # organic, inorganic, hazardous
    category_label = Column(String(100), nullable=False)
    confidence = Column(Float, nullable=False)
    material_prediction = Column(String(100), nullable=True)
    is_demo = Column(Boolean, default=True)
    ai_engine = Column(String(50), default="Demo Mode")
    
    # JSON-encoded fields
    physical_properties_json = Column(Text, default="[]")
    advantages_json = Column(Text, default="[]")
    disadvantages_json = Column(Text, default="[]")
    reuse_potential = Column(Text, nullable=True)
    recyclability = Column(Text, nullable=True)
    environmental_impact_json = Column(Text, default="[]")
    handling_guide_json = Column(Text, default="[]")
    warning = Column(Text, nullable=True)
    
    image_base64 = Column(Text, nullable=True)
    user_corrected = Column(Boolean, default=False)
    user_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "item_name": self.item_name,
            "category": self.category,
            "category_label": self.category_label,
            "confidence": round(self.confidence, 4),
            "material_prediction": self.material_prediction,
            "is_demo": self.is_demo,
            "ai_engine": self.ai_engine,
            "physical_properties": json.loads(self.physical_properties_json or "[]"),
            "advantages": json.loads(self.advantages_json or "[]"),
            "disadvantages": json.loads(self.disadvantages_json or "[]"),
            "reuse_potential": self.reuse_potential,
            "recyclability": self.recyclability,
            "environmental_impact": json.loads(self.environmental_impact_json or "[]"),
            "handling_guide": json.loads(self.handling_guide_json or "[]"),
            "warning": self.warning,
            "image_base64": self.image_base64,
            "user_corrected": self.user_corrected,
            "user_notes": self.user_notes,
            "created_at": self.created_at.isoformat() if self.created_at else datetime.utcnow().isoformat()
        }

