import os
import json
import base64
import urllib.request
import urllib.error
from typing import Dict, Any, Optional

DEFAULT_GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")

# Các mô hình Gemini hỗ trợ thị giác hình ảnh tốt nhất
VISION_MODELS = [
    "gemini-flash-lite-latest",
    "gemini-flash-latest",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash-8b",
]

class GeminiService:
    """
    Dịch vụ tích hợp Google Gemini AI (Multimodal Vision & Chat)
    Hỗ trợ cơ chế tự động chuyển đổi mô hình (Auto-fallback)
    """
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = (api_key or os.getenv("GEMINI_API_KEY", "") or DEFAULT_GEMINI_KEY).strip()
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash-latest")
        self.active_model = self.model_name

    @property
    def is_configured(self) -> bool:
        return bool(self.api_key)

    def set_api_key(self, api_key: str):
        self.api_key = api_key.strip()

    def _execute_with_fallback(self, payload: dict) -> tuple:
        """
        Gửi payload tới Google Gemini API với cơ chế tự động thử lần lượt các model thị giác khả dụng
        """
        candidate_models = [self.active_model]
        for m in VISION_MODELS:
            if m not in candidate_models:
                candidate_models.append(m)

        last_error = None

        for model in candidate_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.api_key}"
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            try:
                with urllib.request.urlopen(req, timeout=30) as response:
                    resp_json = json.loads(response.read().decode("utf-8"))
                    self.active_model = model
                    return resp_json, model
            except urllib.error.HTTPError as e:
                err_body = e.read().decode("utf-8")
                err_lower = err_body.lower()
                last_error = RuntimeError(f"Model {model} lỗi ({e.code}): {err_body}")

                # Nếu lỗi là do model không tồn tại hoặc không hỗ trợ hình ảnh (như TTS, Embedding...)
                if e.code in (404, 400) and any(kw in err_lower for kw in ["not found", "not supported", "modality", "not enabled", "image input"]):
                    continue
                else:
                    raise last_error
            except Exception as e:
                last_error = e
                err_str = str(e).lower()
                if any(kw in err_str for kw in ["not found", "not supported", "modality", "not enabled"]):
                    continue
                raise e

        raise last_error or RuntimeError("Không tìm thấy mô hình Gemini nào khả dụng với API Key này.")

    def analyze_waste_image(self, image_bytes: bytes, mime_type: str = "image/jpeg") -> Dict[str, Any]:
        """
        Gửi hình ảnh tới Google Gemini Multimodal Vision API để phân tích rác thải.
        Cam kết: Không bịa kết quả nếu ảnh không chứa rác thải.
        """
        if not self.is_configured:
            raise ValueError("Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm khóa API của Google AI Studio.")

        image_b64 = base64.b64encode(image_bytes).decode("utf-8")

        prompt_instruction = """
        Bạn là chuyên gia phân loại rác thải và bảo vệ môi trường hàng đầu của ứng dụng TRASHFORMER.
        Hãy phân tích hình ảnh này để nhận diện vật thể rác thải thực tế.

        QUY TẮC BẮT BUỘC (TUYỆT ĐỐI KHÔNG BỊA KẾT QUẢ):
        1. Nếu trong ảnh KHÔNG CÓ rác thải (ví dụ: chỉ có tường trống, sàn nhà, khuôn mặt người mà không cầm rác, phong cảnh, hoặc ảnh đen/mờ không nhận diện được):
           Hãy trả về JSON với "is_waste": false và giải thích rõ ràng trong "reason".
        2. Nếu CÓ rác thải:
           - "is_waste": true
           - "item_name": Tên tiếng Việt cụ thể (VD: "Chai nhựa nước khoáng", "Vỏ lon bia nhôm", "Vỏ chuối chín", "Pin tiểu AA cũ")
           - "category": Phải thuộc 1 trong 3 giá trị: "organic" (rác hữu cơ), "inorganic" (rác vô cơ), "hazardous" (rác cần thu gom riêng / nguy hại)
           - "category_label": Nhãn tiếng Việt tương ứng ("Rác Hữu Cơ", "Rác Vô Cơ", "Rác Cần Thu Gom Riêng")
           - "material_prediction": Thành phần vật liệu (VD: "Nhựa PET #1", "Nhôm Al", "Cellulose", "Chì & Thủy ngân")
           - "confidence": Điểm tin cậy từ 0.70 đến 0.99
           - "physical_properties": Danh sách 3-4 đặc điểm vật lý
           - "pros": 2-3 ưu điểm hoặc giá trị sử dụng
           - "cons": 2-3 nhược điểm hoặc nguy cơ
           - "environmental_impact": 3 tác động tới đất, nước hoặc sinh thái
           - "reusability": Khả năng tái sử dụng thực tế tại nhà
           - "recyclability": Tỷ lệ % và khả năng tái chế công nghiệp
           - "handling_instructions": Danh sách 4 bước xử lý chuẩn quy định bảo vệ môi trường

        ĐỊNH DẠNG TRẢ VỀ:
        Chỉ trả về JSON thuần túy, không dùng markdown ```json ... ```, định dạng như sau:
        {
          "is_waste": true,
          "reason": "",
          "item_name": "...",
          "category": "organic|inorganic|hazardous",
          "category_label": "...",
          "material_prediction": "...",
          "confidence": 0.95,
          "physical_properties": ["..."],
          "pros": ["..."],
          "cons": ["..."],
          "environmental_impact": ["..."],
          "reusability": "...",
          "recyclability": "...",
          "handling_instructions": ["Bước 1...", "Bước 2...", "Bước 3...", "Bước 4..."]
        }
        """

        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt_instruction},
                        {
                            "inlineData": {
                                "mimeType": mime_type,
                                "data": image_b64
                            }
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "topK": 32,
                "topP": 0.95,
                "maxOutputTokens": 2048
            }
        }

        resp_json, used_model = self._execute_with_fallback(payload)
        
        candidates = resp_json.get("candidates", [])
        if not candidates:
            raise ValueError("Gemini API không phản hồi kết quả.")

        content_parts = candidates[0].get("content", {}).get("parts", [])
        if not content_parts:
            raise ValueError("Gemini API trả về nội dung rỗng.")

        raw_text = content_parts[0].get("text", "").strip()

        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        elif raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        raw_text = raw_text.strip()

        result_data = json.loads(raw_text)
        result_data["ai_engine"] = f"Google Gemini ({used_model}) Vision AI"
        return result_data

    def chat_about_waste(self, item_name: str, category: str, question: str) -> str:
        """
        Hỏi đáp chi tiết với Gemini AI về phương pháp xử lý, tái chế, bảo vệ môi trường cho vật thể rác cụ thể.
        """
        if not self.is_configured:
            raise ValueError("Chưa cấu hình GEMINI_API_KEY.")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent?key={self.api_key}"

        prompt = f"""
        Bạn là Trợ lý AI Bảo vệ Môi trường của nền tảng TRASHFORMER.
        Người dùng đang xem báo cáo phân tích về vật thể rác: "{item_name}" (Nhóm: {category}).
        
        Người dùng hỏi: "{question}"
        
        Hãy trả lời bằng tiếng Việt một cách khoa học, thực tế, dễ hiểu, thân thiện và hướng dẫn hành động cụ thể để bảo vệ môi trường, giảm phát thải hoặc tái chế sáng tạo.
        Không dài dòng quá 4 đoạn văn. Sử dụng biểu tượng cảm xúc phù hợp.
        """

        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 1024
            }
        }

        try:
            resp_json, _ = self._execute_with_fallback(payload)
            candidates = resp_json.get("candidates", [])
            if not candidates:
                return "Xin lỗi, Gemini AI hiện chưa thể phản hồi câu hỏi này."
            return candidates[0]["content"]["parts"][0]["text"].strip()
        except Exception as e:
            raise RuntimeError(f"Lỗi trò chuyện với Gemini AI: {str(e)}")

gemini_service = GeminiService()

