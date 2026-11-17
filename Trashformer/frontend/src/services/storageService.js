const STORAGE_KEY = "trashformer_detection_history";

export const storageService = {
  getHistory(category = "", query = "") {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      let list = data ? JSON.parse(data) : [];
      if (category) {
        list = list.filter(item => item.category === category);
      }
      if (query) {
        const q = query.toLowerCase().trim();
        list = list.filter(item => 
          item.item_name.toLowerCase().includes(q) ||
          item.category_label.toLowerCase().includes(q)
        );
      }
      return list;
    } catch {
      return [];
    }
  },

  saveRecord(record) {
    try {
      const list = this.getHistory();
      // Đảm bảo không trùng ID
      const existsIndex = list.findIndex(item => item.id === record.id);
      if (existsIndex >= 0) {
        list[existsIndex] = record;
      } else {
        list.unshift(record);
      }
      // Giới hạn lưu 100 bản ghi gần nhất
      const trimmed = list.slice(0, 100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn("Storage quota exceeded or error saving history:", e);
    }
  },

  updateRecord(recordId, updateFields) {
    try {
      const list = this.getHistory();
      const idx = list.findIndex(item => item.id === recordId);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...updateFields };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn("Error updating record in storage:", e);
    }
  },

  deleteRecord(id) {
    try {
      let list = this.getHistory();
      list = list.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  },

  clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  },

  getAnalyticsSummary() {
    const list = this.getHistory();
    if (list.length === 0) {
      return {
        total_detections: 148,
        organic_count: 52,
        inorganic_count: 74,
        hazardous_count: 22,
        is_demo_data: true,
        top_detected_items: [
          { name: "Chai nhựa PET", count: 38, category: "inorganic" },
          { name: "Thức ăn thừa", count: 29, category: "organic" },
          { name: "Vỏ trái cây", count: 23, category: "organic" },
          { name: "Lon kim loại", count: 21, category: "inorganic" },
          { name: "Bìa carton", count: 15, category: "inorganic" },
          { name: "Pin cũ", count: 12, category: "hazardous" },
          { name: "Túi nilon", count: 10, category: "inorganic" }
        ],
        category_distribution: [
          { name: "Rác vô cơ", value: 74, color: "#2563eb", category: "inorganic" },
          { name: "Rác hữu cơ", value: 52, color: "#16a34a", category: "organic" },
          { name: "Rác nguy hại", value: 22, color: "#ea580c", category: "hazardous" }
        ],
        trend_data: [
          { date: "Thứ 2", organic: 6, inorganic: 9, hazardous: 2, total: 17 },
          { date: "Thứ 3", organic: 8, inorganic: 12, hazardous: 3, total: 23 },
          { date: "Thứ 4", organic: 7, inorganic: 10, hazardous: 4, total: 21 },
          { date: "Thứ 5", organic: 9, inorganic: 11, hazardous: 3, total: 23 },
          { date: "Thứ 6", organic: 10, inorganic: 14, hazardous: 5, total: 29 },
          { date: "Thứ 7", organic: 12, inorganic: 18, hazardous: 5, total: 35 }
        ]
      };
    }

    const organic = list.filter(i => i.category === 'organic').length;
    const inorganic = list.filter(i => i.category === 'inorganic').length;
    const hazardous = list.filter(i => i.category === 'hazardous').length;

    // Đếm top items
    const counts = {};
    const categories = {};
    list.forEach(i => {
      counts[i.item_name] = (counts[i.item_name] || 0) + 1;
      categories[i.item_name] = i.category;
    });

    const topItems = Object.keys(counts)
      .map(name => ({ name, count: counts[name], category: categories[name] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);

    return {
      total_detections: list.length,
      organic_count: organic,
      inorganic_count: inorganic,
      hazardous_count: hazardous,
      is_demo_data: false,
      top_detected_items: topItems,
      category_distribution: [
        { name: "Rác vô cơ", value: inorganic, color: "#2563eb", category: "inorganic" },
        { name: "Rác hữu cơ", value: organic, color: "#16a34a", category: "organic" },
        { name: "Rác nguy hại", value: hazardous, color: "#ea580c", category: "hazardous" }
      ],
      trend_data: [
        { date: "Dữ liệu hiện tại", organic, inorganic, hazardous, total: list.length }
      ]
    };
  },

  exportToJSON() {
    const list = this.getHistory();
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trashformer_history_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  exportToCSV() {
    const list = this.getHistory();
    if (list.length === 0) return;
    const headers = ["ID", "Tên vật thể", "Nhóm phân loại", "Độ tin cậy", "Vật liệu", "Thời gian"];
    const rows = list.map(item => [
      item.id,
      `"${item.item_name.replace(/"/g, '""')}"`,
      `"${item.category_label}"`,
      `${(item.confidence * 100).toFixed(1)}%`,
      `"${(item.material_prediction || "").replace(/"/g, '""')}"`,
      item.created_at
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trashformer_history_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

