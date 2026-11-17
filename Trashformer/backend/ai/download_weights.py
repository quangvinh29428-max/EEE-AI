"""
Script tự động tải Weights Mô hình AI YOLOv8 thật từ Ultralytics GitHub
"""
import os
import urllib.request

WEIGHTS_DIR = os.path.dirname(os.path.abspath(__file__)) + "/weights"
YOLO_MODEL_URL = "https://github.com/ultralytics/assets/releases/download/v8.1.0/yolov8n.pt"
TARGET_FILE = os.path.join(WEIGHTS_DIR, "best.pt")

def download_yolo_weights():
    os.makedirs(WEIGHTS_DIR, exist_ok=True)
    if os.path.exists(TARGET_FILE):
        print(f"[OK] File trọng số mô hình đã tồn tại tại: {TARGET_FILE}")
        return

    print(f"[*] Đang tải mô hình AI YOLOv8 thật từ: {YOLO_MODEL_URL}...")
    try:
        def progress(count, block_size, total_size):
            percent = int(count * block_size * 100 / total_size)
            print(f"\rTiến trình tải: {percent}%", end="")

        urllib.request.urlretrieve(YOLO_MODEL_URL, TARGET_FILE, reporthook=progress)
        print(f"\n[THÀNH CÔNG] Đã tải mô hình YOLOv8 thật về: {TARGET_FILE}")
        print("[*] Backend Trashformer sẽ tự động kích hoạt nhận diện AI thật 100%!")
    except Exception as e:
        print(f"\n[LỖI] Không thể tải weights tự động: {e}")
        print("Bạn có thể tải thủ công file từ đường dẫn trên và đổi tên thành 'best.pt' đặt vào thư mục 'backend/ai/weights/'.")

if __name__ == "__main__":
    download_yolo_weights()

