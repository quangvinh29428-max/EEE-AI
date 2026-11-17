export const APP_CONFIG = {
  BRAND_NAME: "TRASHFORMER",
  FULL_NAME: "Trashformer – AI Waste Classification & Analysis",
  SLOGAN_EN: "Transform Waste, Protect Earth.",
  SLOGAN_VI: "Biến đổi rác thải – Bảo vệ Trái Đất.",
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000"
};

export const WASTE_CATEGORIES = {
  ORGANIC: {
    key: "organic",
    label: "Rác Hữu Cơ",
    groupCode: "NHÓM A",
    color: "#16a34a", // Green
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    bgClass: "bg-emerald-50",
    iconName: "Leaf",
    description: "Các loại chất thải có nguồn gốc hữu cơ tự nhiên, dễ phân hủy sinh học (thức ăn thừa, rau củ quả, lá cây).",
    disposalGuide: "Tách riêng chất lỏng, gom vào túi rác hữu cơ hoặc ủ phân compost vi sinh tại nhà."
  },
  INORGANIC: {
    key: "inorganic",
    label: "Rác Vô Cơ",
    groupCode: "NHÓM B",
    color: "#2563eb", // Blue
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    bgClass: "bg-blue-50",
    iconName: "Recycle",
    description: "Vật liệu nhân tạo hoặc khoáng sản chế biến (chai nhựa, kim loại, giấy carton, thủy tinh). Gồm cả loại tái chế được và khó tái chế.",
    disposalGuide: "Rửa sạch, làm khô, ép dẹp (đối với chai lon hộp) và phân loại riêng loại tái chế được."
  },
  HAZARDOUS: {
    key: "hazardous",
    label: "Rác Cần Thu Gom Riêng (Nguy Hại)",
    groupCode: "NHÓM C",
    color: "#ea580c", // Orange/Amber
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    bgClass: "bg-amber-50",
    iconName: "AlertTriangle",
    description: "Chứa kim loại nặng, hóa chất độc hại hoặc nguy cơ phát nổ (pin cũ, ắc quy, bóng đèn huỳnh quang, rác điện tử).",
    disposalGuide: "TUYỆT ĐỐI KHÔNG vứt chung rác sinh hoạt. Bọc kín và mang tới các điểm thu hồi chất thải nguy hại chuyên trách."
  }
};

