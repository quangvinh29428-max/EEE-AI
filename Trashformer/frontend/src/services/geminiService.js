/**
 * Trashformer - Google Gemini Multimodal Vision & Chatbot Service
 * Tích hợp trực tiếp Google Gemini 1.5 Flash API trên Frontend
 */

const GEMINI_API_STORAGE_KEY = 'trashformer_gemini_api_key';
export const DEFAULT_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
let activeGeminiModel = 'gemini-flash-lite-latest';
localStorage.setItem('trashformer_gemini_active_model', activeGeminiModel);

/**
 * Tự động dò tìm và gửi yêu cầu tới model Gemini tương thích của tài khoản (loại trừ các model TTS/Audio)
 */
export const executeGeminiRequestWithAutoFallback = async (apiKey, payload) => {
  const isVisionModel = (name) => {
    if (!name) return false;
    const lower = name.toLowerCase();
    if (
      lower.includes('tts') ||
      lower.includes('embed') ||
      lower.includes('audio') ||
      lower.includes('speech') ||
      lower.includes('realtime') ||
      lower.includes('imagen')
    ) {
      return false;
    }
    return true;
  };

  let availableModels = [];

  try {
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listRes = await fetch(listUrl);
    if (listRes.ok) {
      const listData = await listRes.json();
      availableModels = (listData.models || [])
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace(/^models\//, ''))
        .filter(isVisionModel);
    }
  } catch (e) {
    console.warn("Không thể query ListModels:", e);
  }

  const topVisionModels = [
    'gemini-flash-lite-latest',
    'gemini-flash-latest',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash'
  ];

  const candidateModels = [];
  if (activeGeminiModel && isVisionModel(activeGeminiModel) && !candidateModels.includes(activeGeminiModel)) {
    candidateModels.push(activeGeminiModel);
  }
  topVisionModels.forEach(m => {
    if (!candidateModels.includes(m)) candidateModels.push(m);
  });
  availableModels.forEach(m => {
    if (!candidateModels.includes(m)) candidateModels.push(m);
  });

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        activeGeminiModel = model;
        localStorage.setItem('trashformer_gemini_active_model', model);
        return { data, model };
      }

      const errBody = await res.json().catch(() => ({}));
      const errMsg = errBody.error?.message || `HTTP ${res.status}`;
      lastError = new Error(errMsg);

      const errLower = errMsg.toLowerCase();
      const canFallback =
        res.status === 404 ||
        res.status === 400 ||
        res.status === 500 ||
        res.status === 502 ||
        res.status === 503 ||
        res.status === 504 ||
        errLower.includes('not found') ||
        errLower.includes('not supported') ||
        errLower.includes('modality') ||
        errLower.includes('not enabled') ||
        errLower.includes('image input') ||
        errLower.includes('internal error') ||
        errLower.includes('unsupported');

      if (canFallback) {
        console.warn(`Model ${model} gặp lỗi (${errMsg}), đang chuyển model tiếp theo...`);
        continue;
      } else {
        throw lastError;
      }
    } catch (err) {
      lastError = err;
      const msgLower = (err.message || '').toLowerCase();
      if (
        msgLower.includes('not found') ||
        msgLower.includes('not supported') ||
        msgLower.includes('modality') ||
        msgLower.includes('not enabled') ||
        msgLower.includes('image input') ||
        msgLower.includes('internal error')
      ) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("Không tìm thấy mô hình Gemini nào khả dụng cho API Key này.");
};

/**
 * Phân tích ảnh rác thải bằng Google Gemini Multimodal Vision
 * @param {string} base64DataUrl - Ảnh dạng Data URL (data:image/jpeg;base64,...)
 * @param {string} [customApiKey] - Khóa API tùy chọn
 */
export const analyzeWasteWithGemini = async (base64DataUrl, customApiKey = null) => {
  const apiKey = (customApiKey || getStoredGeminiKey() || '').trim();
  if (!apiKey) {
    throw new Error('Chưa cấu hình Google Gemini API Key. Vui lòng nhập khóa API từ Google AI Studio.');
  }

  // Tách mimeType và raw base64 data
  const matches = base64DataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Định dạng ảnh base64 không hợp lệ.');
  }
  const mimeType = matches[1];
  const rawBase64 = matches[2];

  const prompt = `
Bạn là chuyên gia thẩm định và phân loại rác thải của nền tảng TRASHFORMER.
Nhiệm vụ: Phân tích hình ảnh này để nhận diện vật thể rác thải sinh hoạt/công nghiệp.

QUY TẮC BẮT BUỘC (TUYỆT ĐỐI KHÔNG BỊA KẾT QUẢ):
1. Nếu hình ảnh KHÔNG chứa bất kỳ rác thải nào (ví dụ: chỉ có tường trống, sàn nhà trống, khuôn mặt người mà không có rác, bàn trống, hoặc ảnh tối đen/mờ):
   Hãy trả về JSON với "is_waste": false và giải thích trong "reason".
2. Nếu CÓ rác thải:
   - "is_waste": true
   - "item_name": Tên tiếng Việt chính xác (VD: Chai nhựa Lavie, Vỏ lon bia Saigon, Túi nilon, Bã cà phê, Pin tiểu AA)
   - "category": Phải là "organic" (rác hữu cơ), "inorganic" (rác vô cơ) hoặc "hazardous" (rác nguy hại/thu gom riêng)
   - "category_label": Tên nhóm tiếng Việt ("Rác Hữu Cơ", "Rác Vô Cơ", "Rác Cần Thu Gom Riêng")
   - "material_prediction": Chất liệu (Nhựa PET, Nhôm, Thủy tinh,...)
   - "confidence": 0.95
   - "physical_properties": Mảng 3-4 đặc điểm vật lý
   - "pros": 2-3 ưu điểm
   - "cons": 2-3 nhược điểm
   - "environmental_impact": 3 tác động môi trường
   - "reusability": Khả năng tái sử dụng thực tế
   - "recyclability": Tỷ lệ tái chế %
   - "handling_instructions": Mảng 4 bước xử lý cụ thể

Trả về định dạng JSON thuần túy (không bọc code block markdown):
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
`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: rawBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2048
    }
  };

  const { data, model } = await executeGeminiRequestWithAutoFallback(apiKey, payload);

  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) {
    throw new Error('Gemini API không phản hồi dữ liệu.');
  }

  let cleanJson = textResponse.trim();
  if (cleanJson.startsWith('```json')) cleanJson = cleanJson.slice(7);
  else if (cleanJson.startsWith('```')) cleanJson = cleanJson.slice(3);
  if (cleanJson.endsWith('```')) cleanJson = cleanJson.slice(0, -3);
  cleanJson = cleanJson.trim();

  const parsed = JSON.parse(cleanJson);
  parsed.ai_engine = `Google Gemini (${model}) Vision AI`;
  parsed.image_base64 = base64DataUrl;
  return parsed;
};

/**
 * Hỏi đáp nhanh với Gemini AI về vật thể rác
 */
export const chatWithGeminiAboutWaste = async (itemName, category, question, customApiKey = null) => {
  const apiKey = (customApiKey || getStoredGeminiKey() || '').trim();
  if (!apiKey) {
    throw new Error('Chưa cấu hình Gemini API Key.');
  }

  const prompt = `
Bạn là Trợ lý AI Chuyên gia Môi trường của ứng dụng TRASHFORMER.
Đang xem thông tin rác: "${itemName}" (Nhóm: ${category}).

Người dùng hỏi: "${question}"

Hãy trả lời bằng tiếng Việt một cách khoa học, thực tế, dễ áp dụng tại nhà, khuyến khích bảo vệ môi trường và tái chế. Độ dài từ 2 đến 4 đoạn ngắn gọn.
`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024
    }
  };

  const { data } = await executeGeminiRequestWithAutoFallback(apiKey, payload);
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Không có phản hồi từ Gemini.';
};

