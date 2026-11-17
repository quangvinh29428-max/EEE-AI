import os
import json
import base64
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from ai.demo_engine import DemoEngine
from ai.roboflow_engine import RoboflowEngine
from ai.yolo_detector import YOLODetector
from models.waste_model import DetectionRecord
from schemas.waste_schema import WasteCategory

class AIService:
    def __init__(self):
        self.roboflow_engine = RoboflowEngine()
        self.yolo_detector = YOLODetector()
        self.default_mode = os.getenv("AI_ENGINE_MODE", "demo")

    def analyze_image(
        self,
        image_bytes: bytes,
        filename: str = "",
        force_demo: bool = False,
        db: Optional[Session] = None
    ) -> Dict[str, Any]:
        """
        Thực hiện phân tích hình ảnh qua AI pipeline.
        Ưu tiên: Real YOLO -> Real Roboflow -> Demo Simulation Engine
        """
        result = None
        
        if not force_demo:
            # 1. Thử YOLO nội bộ nếu đã tải trọng số model
            if self.yolo_detector.is_loaded:
                result = self.yolo_detector.detect(image_bytes)

            # 2. Thử Roboflow Inference API nếu đã cấu hình API Key
            if not result and self.roboflow_engine.is_configured:
                result = self.roboflow_engine.infer(image_bytes)

        # 3. Fallback sang Demo Engine nếu chưa có model thật hoặc force_demo=True
        if not result:
            result = DemoEngine.analyze_image_bytes(image_bytes, filename=filename)

        # Chuẩn bị lưu ảnh dạng base64 thumbnail để hiển thị trong lịch sử
        image_b64 = None
        try:
            if len(image_bytes) < 3 * 1024 * 1024:  # Lưu preview nếu < 3MB
                image_b64 = "data:image/jpeg;base64," + base64.b64encode(image_bytes).decode("utf-8")
        except Exception:
            pass

        result["image_base64"] = image_b64

        # Lưu bản ghi vào cơ sở dữ liệu nếu có db session
        if db:
            record = DetectionRecord(
                item_name=result["item_name"],
                category=result["category"],
                category_label=result["category_label"],
                confidence=result["confidence"],
                material_prediction=result["material_prediction"],
                is_demo=result["is_demo"],
                ai_engine=result["ai_engine"],
                physical_properties_json=json.dumps(result["physical_properties"], ensure_ascii=False),
                advantages_json=json.dumps(result["advantages"], ensure_ascii=False),
                disadvantages_json=json.dumps(result["disadvantages"], ensure_ascii=False),
                reuse_potential=result["reuse_potential"],
                recyclability=result["recyclability"],
                environmental_impact_json=json.dumps(result["environmental_impact"], ensure_ascii=False),
                handling_guide_json=json.dumps(result["handling_guide"], ensure_ascii=False),
                warning=result.get("warning"),
                image_base64=image_b64
            )
            db.add(record)
            db.commit()
            db.refresh(record)
            result["id"] = record.id

        return result

    def get_system_ai_status(self) -> Dict[str, Any]:
        return {
            "default_mode": self.default_mode,
            "yolo_loaded": self.yolo_detector.is_loaded,
            "roboflow_configured": self.roboflow_engine.is_configured,
            "demo_available": True,
            "active_real_engine": (
                "YOLOv8 Local Model" if self.yolo_detector.is_loaded
                else ("Roboflow Cloud Model" if self.roboflow_engine.is_configured else "None (Running Demo Mode)")
            )
        }

ai_service = AIService()

