# 🌿 TRASHFORMER – AI WASTE CLASSIFICATION & ANALYSIS

> **"Transform Waste, Protect Earth."**  
> *"Biến đổi rác thải – Bảo vệ Trái Đất."*

---

## 📌 1. GIỚI THIỆU DỰ ÁN

**TRASHFORMER** là nền tảng web ứng dụng Trí tuệ nhân tạo (AI & Computer Vision) hỗ trợ người dùng nhận diện, phân loại và phân tích rác thải sinh hoạt thông qua máy ảnh (Camera) trực tiếp hoặc hình ảnh tải lên.

Hệ thống giúp phân loại rác thành 3 nhóm khoa học:
- **Nhóm A – Rác Hữu Cơ**: Thức ăn thừa, vỏ trái cây, rau củ, lá cây (ủ phân compost, Biogas).
- **Nhóm B – Rác Vô Cơ**: Chai nhựa, lon kim loại, giấy bìa carton, thủy tinh, túi nilon (thu gom tái chế tuần hoàn).
- **Nhóm C – Rác Cần Thu Gom Riêng (Nguy Hại)**: Pin cũ, ắc quy, bóng đèn huỳnh quang, rác điện tử e-waste (cô lập và chuyển tới cơ sở xử lý chuyên biệt).

---

## 📁 2. CẤU TRÚC MÃ NGUỒN (PROJECT STRUCTURE)

```text
Trashformer/
│
├── index.html                  # 🌟 Bản Web App độc lập chạy ngay trên mọi trình duyệt
├── docker-compose.yml          # Triển khai toàn bộ Full-stack với Docker
│
├── frontend/                   # ReactJS + Vite + Tailwind CSS + Lucide + Recharts
│   ├── index.html              # HTML template cho Vite
│   ├── package.json            # Thư viện Frontend
│   ├── vite.config.js          # Cấu hình Vite
│   ├── tailwind.config.js      # Bảng màu thương hiệu Trashformer
│   ├── postcss.config.js
│   ├── Dockerfile              # Dockerfile chạy Nginx
│   ├── nginx.conf              # Cấu hình Reverse Proxy Nginx
│   └── src/
│       ├── main.jsx            # Entry point React 18
│       ├── App.jsx             # Điều hướng Tab và ứng dụng chính
│       ├── index.css           # Cấu hình Tailwind & Custom Animations
│       ├── components/
│       │   ├── Navbar.jsx          # Thanh điều hướng Sticky & AI Status badge
│       │   ├── Footer.jsx          # Thông tin thương hiệu & liên kết nhanh
│       │   ├── CameraView.jsx      # Chụp ảnh Camera trực tiếp + tia quét Laser
│       │   ├── ImageUploader.jsx   # Kéo thả tải ảnh JPG, PNG, WEBP
│       │   ├── AnalysisReport.jsx  # Báo cáo phân tích chuyên sâu 12 mục
│       │   ├── CorrectionModal.jsx # Đính chính kết quả khi AI chưa chắc chắn
│       │   └── WasteDetailModal.jsx# Xem chi tiết từng loại rác trong thư viện
│       ├── pages/
│       │   ├── HomePage.jsx        # Dashboard, slogan, biểu đồ cơ cấu, quy trình
│       │   ├── DetectPage.jsx      # Giao diện nhận diện Camera / Upload & AI
│       │   ├── LibraryPage.jsx     # Thư viện kiến thức rác thải (tra cứu & lọc)
│       │   ├── HistoryPage.jsx     # Lịch sử nhận diện, xóa, xuất CSV & JSON
│       │   ├── AnalyticsPage.jsx   # Báo cáo thống kê, biểu đồ Donut & Bar chart
│       │   └── AboutPage.jsx       # Thương hiệu, sứ mệnh, kiến trúc công nghệ
│       ├── services/
│       │   ├── api.js              # REST Client kết nối FastAPI + fallback demo
│       │   └── storageService.js   # Quản lý LocalStorage, xuất CSV / JSON
│       ├── hooks/
│       │   └── useCamera.js        # Custom hook điều khiển Camera getUserMedia
│       └── utils/
│           ├── constants.js        # Cấu hình thương hiệu và 3 nhóm rác
│           └── wasteDatabase.js    # Cơ sở dữ liệu khoa học rác thải
│
└── backend/                    # Python FastAPI REST API Server
    ├── main.py                 # File thực thi FastAPI Server & CORS
    ├── requirements.txt        # Danh sách gói thư viện Python
    ├── .env.example            # File mẫu cấu hình biến môi trường
    ├── Dockerfile              # Docker container cho Backend
    ├── schemas/
    │   └── waste_schema.py     # Pydantic Schemas request/response
    ├── models/
    │   └── waste_model.py      # SQLAlchemy ORM models (SQLite/PostgreSQL)
    ├── database/
    │   └── db.py               # Kết nối và khởi tạo CSDL
    ├── services/
    │   ├── waste_classifier.py # Knowledge base & động cơ phân loại chuẩn
    │   └── ai_service.py       # Bộ điều phối suy luận AI
    ├── routes/
    │   ├── detection.py        # API nhận diện ảnh, đính chính, status
    │   ├── waste_library.py    # API danh mục & chi tiết rác thải
    │   ├── history.py          # API xem, xóa lịch sử nhận diện
    │   └── analytics.py        # API tổng hợp số liệu thống kê biểu đồ
    └── ai/
        ├── demo_engine.py      # Động cơ mô phỏng minh bạch khi chưa có model
        ├── roboflow_engine.py  # Tích hợp Roboflow Inference API Cloud
        └── yolo_detector.py    # Tích hợp Ultralytics YOLOv8 weights (.pt)
```

---

## 🚀 3. HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG

### Cách 1: Chạy ngay lập tức với file Độc lập (Không cần cài Node hay Python)
1. Truy cập thư mục `Trashformer/`.
2. Nhấp đúp chuột mở file `index.html` trong bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc, Safari).
3. Sử dụng đầy đủ tính năng: Camera thời gian thực, Tải ảnh, AI Demo Simulation, Báo cáo chi tiết, Thư viện, Lịch sử và Thống kê.

---

### Cách 2: Chạy Frontend ReactJS + Vite (Development)
Yêu cầu: Đã cài Node.js (v18+)
```bash
cd Trashformer/frontend
npm install
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:5173`

---

### Cách 3: Chạy Backend Python FastAPI
Yêu cầu: Đã cài Python (3.9+)
```bash
cd Trashformer/backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
- API Server: `http://localhost:8000`
- Swagger UI (Interactive API Docs): `http://localhost:8000/docs`

---

### Cách 4: Chạy toàn bộ với Docker Compose
```bash
cd Trashformer
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

---

## 🧠 4. HƯỚNG DẪN TÍCH HỢP MÔ HÌNH AI THẬT

Hệ thống được thiết kế theo kiến trúc module hóa linh hoạt (`ai_service.py`):

### 1. Tích hợp Google Gemini Multimodal Vision & Eco Chatbot (Mới nhất):
1. Nhận khóa API miễn phí từ [Google AI Studio](https://aistudio.google.com/app/apikey).
2. **Trên giao diện Web (`index.html` hoặc React Frontend)**:
   - Bấm vào nút **"Gemini AI"** trên thanh tiêu đề.
   - Nhập khóa API và bấm **"Kiểm tra & Kích hoạt"**.
   - Hệ thống sẽ lưu trực tiếp vào LocalStorage trình duyệt an toàn.
   - Khi quét camera hoặc tải ảnh, mô hình **Gemini 1.5 Flash Multimodal** sẽ phân tích trực tiếp hình ảnh, nhận dạng thương hiệu chi tiết và trò chuyện giải đáp mọi câu hỏi sinh thái.
3. **Trên Backend FastAPI**:
   - Thêm vào file `.env`:
     ```env
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     GEMINI_MODEL=gemini-1.5-flash
     ```
   - Gọi endpoint `POST /api/detect/gemini` và `POST /api/detect/gemini-chat`.

### 2. Tích hợp Mô hình YOLOv8 nội bộ (On-premise / Local):
1. Huấn luyện mô hình YOLOv8 trên tập dữ liệu rác thải (TrashBox, TACO, Garbage Classification).
2. Lưu file trọng số vào: `Trashformer/backend/ai/weights/best.pt`.
3. Cài đặt thư viện: `pip install ultralytics opencv-python-headless`.
4. Trong file `.env`, cấu hình:
   ```env
   AI_ENGINE_MODE=yolo
   YOLO_MODEL_PATH=./ai/weights/best.pt
   YOLO_CONFIDENCE_THRESHOLD=0.45
   ```
5. Khởi động lại backend, hệ thống sẽ tự động chuyển sang mô hình YOLOv8 thực tế.

### 2. Tích hợp Roboflow Computer Vision API (Cloud):
1. Đăng ký tài khoản trên [Roboflow Universe](https://universe.roboflow.com/) và tạo project phân loại rác thải.
2. Lấy API Key và Model Endpoint.
3. Trong file `.env`, cấu hình:
   ```env
   AI_ENGINE_MODE=roboflow
   ROBOFLOW_API_KEY=your_actual_roboflow_key
   ROBOFLOW_MODEL_ENDPOINT=waste-detection-dataset/1
   ```
4. Backend sẽ gửi ảnh tới Roboflow Inference API và parse tensor trả về theo thời gian thực.

### 3. Chế độ Demo Simulation (Minh bạch):
Nếu chưa cấu hình model YOLO hoặc Roboflow, hệ thống sẽ tự động chạy chế độ **Demo Simulation** với huy hiệu cảnh báo màu vàng rõ ràng:  
> *"⚠️ Chế độ Demo / Thử nghiệm (Simulation Mode) – Không giả lập kết quả rồi tuyên bố đó là AI thật."*

---

## ✅ 5. BẢNG KIỂM THỬ TÍNH NĂNG (TESTING CHECKLIST)

| STT | Tiêu chí kiểm thử | Trạng thái | Ghi chú |
|:---:|:---|:---:|:---|
| 1 | Website chạy mượt mà trên desktop & di động | ✅ Đạt | Responsive Tailwind CSS 100% |
| 2 | Camera trực tiếp hoạt động | ✅ Đạt | HTML5 `getUserMedia`, đổi camera trước/sau |
| 3 | Tải ảnh từ thiết bị | ✅ Đạt | Hỗ trợ JPG, JPEG, PNG, WEBP, drag & drop |
| 4 | Xem trước ảnh chụp / tải lên | ✅ Đạt | Hiển thị thumbnail preview và dung lượng |
| 5 | Gửi ảnh tới Backend REST API | ✅ Đạt | Endpoint `POST /api/detect/` |
| 6 | Trả về kết quả phân tích AI | ✅ Đạt | Đầy đủ tên, nhóm, độ tin cậy, vật liệu |
| 7 | Tích hợp Google Gemini Multimodal Vision | ✅ Đạt | Phân tích siêu thông minh qua Gemini 1.5/2.0 Flash |
| 8 | Trợ lý Chatbot sinh thái Gemini | ✅ Đạt | Hỏi đáp tương tác trực tiếp về tái chế & xử lý rác |
| 9 | Phân loại 3 nhóm rác A, B, C | ✅ Đạt | Hữu cơ, Vô cơ (tái chế/khó tái chế), Nguy hại |
| 10 | Báo cáo chi tiết 12 hạng mục | ✅ Đạt | Ưu/nhược điểm, tác động môi sinh, các bước xử lý |
| 11 | Đính chính kết quả từ người dùng | ✅ Đạt | Modal sửa thông tin khi AI chưa chắc chắn |
| 12 | Lưu và quản lý lịch sử nhận diện | ✅ Đạt | Lưu CSDL + LocalStorage, xóa, xem lại |
| 13 | Xuất báo cáo dữ liệu | ✅ Đạt | Xuất bảng tính CSV và cấu trúc JSON |
| 14 | Thống kê và biểu đồ trực quan | ✅ Đạt | Biểu đồ Donut tỷ lệ + Biểu đồ cột xu hướng |

---

## 🌍 BẢN QUYỀN & THƯƠNG HIỆU
Dự án được xây dựng bởi đội ngũ phát triển **Trashformer** với phương châm:  
*"Biến đổi rác thải – Bảo vệ Trái Đất."*

