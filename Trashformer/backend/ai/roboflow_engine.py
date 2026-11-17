"""
Roboflow Computer Vision Inference Client for Trashformer
"""
import os
import requests
import base64
from typing import Dict, Any, Optional
from services.waste_classifier import WASTE_KNOWLEDGE_BASE, get_detailed_report_for_item

class RoboflowEngine:
    def __init__(self):
        self.api_key = os.getenv("ROBOFLOW_API_KEY", "")
        self.model_endpoint = os.getenv("ROBOFLOW_MODEL_ENDPOINT", "waste-detection-dataset/1")
        self.is_configured = bool(self.api_key and self.api_key != "your_roboflow_api_key_here")

    def infer(self, image_bytes: bytes) -> Optional[Dict[str, Any]]:
        if not self.is_configured:
            return None

        upload_url = f"https://detect.roboflow.com/{self.model_endpoint}?api_key={self.api_key}"
        try:
            img_b64 = base64.b64encode(image_bytes).decode("utf-8")
            response = requests.post(
                upload_url,
                data=img_b64,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=12
            )
            if response.status_code != 200:
                return None

            data = response.json()
            predictions = data.get("predictions", [])
            if not predictions:
                return None

            # Lấy dự đoán có confidence cao nhất
            top_pred = max(predictions, key=lambda p: p.get("confidence", 0))
            class_name = top_pred.get("class", "").lower()
            confidence = float(top_pred.get("confidence", 0.5))

            # Map Roboflow class sang Waste Knowledge Base key
            mapped_key = self._map_class_to_key(class_name)
            return get_detailed_report_for_item(
                mapped_key,
                confidence=confidence,
                is_demo=False,
                engine_name=f"Roboflow AI Model ({self.model_endpoint})"
            )
        except Exception as e:
            print(f"Roboflow inference error: {e}")
            return None

    def _map_class_to_key(self, class_name: str) -> str:
        cn = class_name.lower()
        if "plastic" in cn or "bottle" in cn:
            return "chai_nhua"
        if "can" in cn or "metal" in cn or "aluminum" in cn:
            return "lon_kim_loai"
        if "cardboard" in cn or "paper" in cn:
            return "giay_carton"
        if "glass" in cn:
            return "thuy_tinh"
        if "battery" in cn:
            return "pin_cu"
        if "light" in cn or "lamp" in cn or "bulb" in cn:
            return "bong_den_huynh_quang"
        if "electronic" in cn or "e-waste" in cn or "phone" in cn:
            return "thiet_bi_dien_tu"
        if "food" in cn or "organic" in cn:
            return "thuc_an_thua"
        if "fruit" in cn or "vegetable" in cn:
            return "vo_trai_cay"
        if "leaf" in cn or "plant" in cn:
            return "la_cay_canh_cay"
        return "chai_nhua"

