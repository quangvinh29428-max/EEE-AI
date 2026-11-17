"""
Demo AI Simulation Engine with Transparent Disclaimers
"""
import random
from typing import Dict, Any
from PIL import Image
import io
import base64
from services.waste_classifier import WASTE_KNOWLEDGE_BASE, get_detailed_report_for_item

class DemoEngine:
    """
    Transparent Demo Engine:
    Mô phỏng nhận diện dựa trên phân tích đặc trưng ảnh (màu sắc trung bình, tỷ lệ khung hình)
    hoặc phân bổ có trọng số.
    Luôn gắn cờ `is_demo=True` và minh bạch tuyệt đối với người dùng.
    """
    
    @staticmethod
    def analyze_image_bytes(image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        # Phân tích sơ bộ ảnh qua Pillow
        try:
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            # Tính màu sắc trung bình để dự đoán thông minh theo sắc độ
            img_small = img.resize((32, 32))
            pixels = list(img_small.getdata())
            r_avg = sum(p[0] for p in pixels) / len(pixels)
            g_avg = sum(p[1] for p in pixels) / len(pixels)
            b_avg = sum(p[2] for p in pixels) / len(pixels)
            
            # Gợi ý thông minh dựa trên sắc độ ảnh hoặc tên file
            fn = filename.lower()
            if "chai" in fn or "bottle" in fn or "plastic" in fn:
                chosen_key = "chai_nhua"
            elif "lon" in fn or "can" in fn or "tin" in fn:
                chosen_key = "lon_kim_loai"
            elif "giay" in fn or "carton" in fn or "box" in fn or "paper" in fn:
                chosen_key = "giay_carton"
            elif "pin" in fn or "battery" in fn:
                chosen_key = "pin_cu"
            elif "bong" in fn or "den" in fn or "bulb" in fn:
                chosen_key = "bong_den_huynh_quang"
            elif "dien_tu" in fn or "phone" in fn or "chip" in fn:
                chosen_key = "thiet_bi_dien_tu"
            elif "thuc_an" in fn or "food" in fn:
                chosen_key = "thuc_an_thua"
            elif "trai_cay" in fn or "fruit" in fn or "rau" in fn:
                chosen_key = "vo_trai_cay"
            elif "la" in fn or "leaf" in fn or "tree" in fn:
                chosen_key = "la_cay_canh_cay"
            else:
                # Sắc xanh lá chiếm ưu thế -> rác hữu cơ thực vật
                if g_avg > r_avg + 20 and g_avg > b_avg + 20:
                    chosen_key = random.choice(["vo_trai_cay", "la_cay_canh_cay"])
                # Sắc xanh dương hoặc trong suốt sáng -> rác vô cơ chai nhựa/lon
                elif b_avg > r_avg + 15:
                    chosen_key = random.choice(["chai_nhua", "lon_kim_loai", "thuy_tinh"])
                # Sắc đỏ/vàng cảnh báo hoặc tối đậm -> rác công nghiệp / điện tử / pin
                elif r_avg > 150 and g_avg < 100:
                    chosen_key = random.choice(["pin_cu", "thiet_bi_dien_tu"])
                else:
                    # Chọn ngẫu nhiên có trọng số thực tế
                    keys = list(WASTE_KNOWLEDGE_BASE.keys())
                    chosen_key = random.choice(keys)
        except Exception:
            chosen_key = "chai_nhua"

        simulated_confidence = round(random.uniform(0.85, 0.98), 2)
        report = get_detailed_report_for_item(
            chosen_key, 
            confidence=simulated_confidence, 
            is_demo=True, 
            engine_name="Demo Simulation Engine (Mô phỏng thử nghiệm)"
        )
        return report

