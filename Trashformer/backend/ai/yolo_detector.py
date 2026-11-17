"""
YOLO Real-time Detection Engine for Trashformer
"""
import os
import io
from typing import Dict, Any, Optional
from PIL import Image
from services.waste_classifier import WASTE_KNOWLEDGE_BASE, get_detailed_report_for_item

class YOLODetector:
    def __init__(self):
        self.model_path = os.getenv("YOLO_MODEL_PATH", "./ai/weights/best.pt")
        self.conf_threshold = float(os.getenv("YOLO_CONFIDENCE_THRESHOLD", "0.45"))
        self.model = None
        self.is_loaded = False
        self._try_load_model()

    def _try_load_model(self):
        if not os.path.exists(self.model_path):
            return

        try:
            from ultralytics import YOLO
            self.model = YOLO(self.model_path)
            self.is_loaded = True
            print(f"[YOLO Engine] Loaded model from {self.model_path}")
        except ImportError:
            print("[YOLO Engine] ultralytics package not installed. Real YOLO disabled.")
        except Exception as e:
            print(f"[YOLO Engine] Failed to load YOLO model: {e}")

    def detect(self, image_bytes: bytes) -> Optional[Dict[str, Any]]:
        if not self.is_loaded or self.model is None:
            return None

        try:
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            results = self.model.predict(img, conf=self.conf_threshold)
            
            if not results or len(results[0].boxes) == 0:
                return None

            boxes = results[0].boxes
            best_idx = int(boxes.conf.argmax())
            cls_id = int(boxes.cls[best_idx])
            confidence = float(boxes.conf[best_idx])
            class_name = self.model.names.get(cls_id, "unknown")

            mapped_key = self._map_yolo_class(class_name)
            return get_detailed_report_for_item(
                mapped_key,
                confidence=confidence,
                is_demo=False,
                engine_name=f"YOLOv8 Real Model ({os.path.basename(self.model_path)})"
            )
        except Exception as e:
            print(f"YOLO inference error: {e}")
            return None

    def _map_yolo_class(self, class_name: str) -> str:
        cn = class_name.lower()
        if "bottle" in cn or "plastic" in cn:
            return "chai_nhua"
        if "can" in cn or "metal" in cn:
            return "lon_kim_loai"
        if "cup" in cn or "glass" in cn or "bowl" in cn:
            return "thuy_tinh"
        if "box" in cn or "book" in cn or "paper" in cn:
            return "giay_carton"
        if "banana" in cn or "apple" in cn or "orange" in cn:
            return "vo_trai_cay"
        if "pizza" in cn or "sandwich" in cn or "cake" in cn:
            return "thuc_an_thua"
        if "potted plant" in cn:
            return "la_cay_canh_cay"
        if "cell phone" in cn or "mouse" in cn or "keyboard" in cn or "laptop" in cn:
            return "thiet_bi_dien_tu"
        return "chai_nhua"

