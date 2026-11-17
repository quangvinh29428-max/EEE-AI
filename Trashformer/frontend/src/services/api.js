import { APP_CONFIG } from '../utils/constants';
import { CLIENT_WASTE_DATABASE, searchClientWaste, getClientItemBySlug } from '../utils/wasteDatabase';
import { storageService } from './storageService';

const BASE_URL = APP_CONFIG.API_BASE_URL;

class ApiService {
  async checkBackendAvailable() {
    try {
      const res = await fetch(`${BASE_URL}/`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }

  async detectImage(file, forceDemo = false) {
    const isOnline = await this.checkBackendAvailable();
    if (isOnline) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('force_demo', forceDemo ? 'true' : 'false');

        const res = await fetch(`${BASE_URL}/api/detect/`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || 'Lỗi phân tích hình ảnh từ server');
        }

        const data = await res.json();
        // Cập nhật cả cache local
        storageService.saveRecord(data);
        return data;
      } catch (err) {
        console.warn('Backend API request failed, switching to client demo simulation:', err);
      }
    }

    // Client-side fallback simulation khi backend offline
    return this._simulateClientDetection(file);
  }

  async getAiStatus() {
    try {
      const res = await fetch(`${BASE_URL}/api/detect/status`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {}
    return {
      default_mode: "client_offline_demo",
      yolo_loaded: false,
      roboflow_configured: false,
      demo_available: true,
      active_real_engine: "None (Client Demo Simulation Engine)"
    };
  }

  async sendCorrection(recordId, correctedName, correctedCategory, feedbackNotes) {
    try {
      const res = await fetch(`${BASE_URL}/api/detect/correct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          record_id: recordId,
          corrected_name: correctedName,
          corrected_category: correctedCategory,
          feedback_notes: feedbackNotes
        })
      });
      if (res.ok) return await res.json();
    } catch {}
    // Fallback local storage
    storageService.updateRecord(recordId, {
      item_name: correctedName,
      category: correctedCategory,
      user_corrected: true,
      user_notes: feedbackNotes
    });
    return { status: "ok", message: "Đã lưu đính chính vào lịch sử thiết bị!" };
  }

  async getWasteLibrary(query = "", category = "") {
    try {
      let url = `${BASE_URL}/api/waste/?`;
      if (query) url += `q=${encodeURIComponent(query)}&`;
      if (category) url += `category=${encodeURIComponent(category)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
      if (res.ok) return await res.json();
    } catch {}
    return searchClientWaste(query, category);
  }

  async getWasteDetail(slug) {
    try {
      const res = await fetch(`${BASE_URL}/api/waste/${slug}`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) return await res.json();
    } catch {}
    return getClientItemBySlug(slug);
  }

  async getHistory(category = "", query = "") {
    try {
      let url = `${BASE_URL}/api/history/?`;
      if (category) url += `category=${encodeURIComponent(category)}&`;
      if (query) url += `q=${encodeURIComponent(query)}&`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
      if (res.ok) return await res.json();
    } catch {}
    // Lấy từ LocalStorage
    return storageService.getHistory(category, query);
  }

  async deleteHistoryItem(id) {
    try {
      await fetch(`${BASE_URL}/api/history/${id}`, { method: 'DELETE' });
    } catch {}
    storageService.deleteRecord(id);
    return true;
  }

  async clearAllHistory() {
    try {
      await fetch(`${BASE_URL}/api/history/`, { method: 'DELETE' });
    } catch {}
    storageService.clearAll();
    return true;
  }

  async getAnalytics() {
    try {
      const res = await fetch(`${BASE_URL}/api/analytics/`, { signal: AbortSignal.timeout(2500) });
      if (res.ok) return await res.json();
    } catch {}
    // Tính toán từ LocalStorage hoặc dữ liệu mẫu
    return storageService.getAnalyticsSummary();
  }

  // Phương thức Client Simulation khi chưa kết nối Backend
  async _simulateClientDetection(file) {
    await new Promise(r => setTimeout(r, 1400)); // Hiệu ứng chờ AI tính toán

    const name = file.name ? file.name.toLowerCase() : "";
    let item;

    if (name.includes("chai") || name.includes("bottle") || name.includes("plastic")) {
      item = getClientItemBySlug("chai-nhua");
    } else if (name.includes("lon") || name.includes("can") || name.includes("tin")) {
      item = getClientItemBySlug("lon-kim-loai");
    } else if (name.includes("pin") || name.includes("battery")) {
      item = getClientItemBySlug("pin-cu");
    } else if (name.includes("den") || name.includes("bulb") || name.includes("bong")) {
      item = getClientItemBySlug("bong-den-huynh-quang");
    } else if (name.includes("dien_tu") || name.includes("phone") || name.includes("chip")) {
      item = getClientItemBySlug("thiet-bi-dien-tu");
    } else if (name.includes("an") || name.includes("food") || name.includes("rice")) {
      item = getClientItemBySlug("thuc-an-thua");
    } else if (name.includes("qua") || name.includes("fruit") || name.includes("vo")) {
      item = getClientItemBySlug("vo-trai-cay");
    } else if (name.includes("carton") || name.includes("box") || name.includes("giay")) {
      item = getClientItemBySlug("giay-carton");
    } else {
      // Chọn mẫu ngẫu nhiên
      const items = CLIENT_WASTE_DATABASE;
      item = items[Math.floor(Math.random() * items.length)];
    }

    // Đọc preview base64
    let previewBase64 = null;
    try {
      previewBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    } catch {}

    const result = {
      id: Date.now(),
      item_name: item.name,
      category: item.category,
      category_label: item.category_label,
      confidence: Number((Math.random() * (0.97 - 0.86) + 0.86).toFixed(2)),
      material_prediction: item.material,
      is_demo: true,
      ai_engine: "Client Demo Simulation Engine",
      physical_properties: item.physical_properties,
      advantages: item.advantages,
      disadvantages: item.disadvantages,
      reuse_potential: item.reuse_potential,
      recyclability: item.recyclability,
      environmental_impact: item.environmental_impact,
      handling_guide: item.handling_guide,
      warning: "⚠️ Đang chạy ở Chế độ Thử nghiệm (Demo Mode). Hãy bật Backend FastAPI hoặc tích hợp mô hình YOLO/Roboflow để nhận diện AI thực tế!",
      image_base64: previewBase64,
      created_at: new Date().toISOString()
    };

    storageService.saveRecord(result);
    return result;
  }
}

export const apiService = new ApiService();

