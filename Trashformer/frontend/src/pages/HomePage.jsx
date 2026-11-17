import React, { useEffect, useState } from 'react';
import { 
  Recycle, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  UploadCloud, 
  ShieldCheck, 
  Leaf, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { APP_CONFIG, WASTE_CATEGORIES } from '../utils/constants';
import { apiService } from '../services/api';
import { CLIENT_WASTE_DATABASE } from '../utils/wasteDatabase';

export default function HomePage({ setActiveTab, setSelectedWasteItem }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiService.getAnalytics().then(data => setStats(data));
  }, []);

  const pieData = stats?.category_distribution || [
    { name: "Rác vô cơ", value: 74, color: "#2563eb" },
    { name: "Rác hữu cơ", value: 52, color: "#16a34a" },
    { name: "Rác nguy hại", value: 22, color: "#ea580c" }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white p-8 sm:p-14 lg:p-20 shadow-2xl border border-emerald-900/40">
        
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>AI Waste Classification & Smart Recycling Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Nhận diện rác thải thông minh <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200">cùng AI</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed">
            "{APP_CONFIG.SLOGAN_VI}" – Hệ thống thị giác máy tính hỗ trợ người dùng phân loại rác thải tự động qua camera và hình ảnh, nâng cao ý thức tái chế và bảo vệ hệ sinh thái Trái Đất.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('detect')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-3 active:scale-95 group"
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Bắt đầu nhận diện ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base backdrop-blur-sm border border-white/10 transition-all flex items-center gap-2"
            >
              <span>Khám phá thư viện rác</span>
            </button>
          </div>

          {/* Quick Stats Badges */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                {stats?.total_detections || "148+"}
              </p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Lượt nhận diện</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">96.8%</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Độ chính xác AI</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-green-400">3 Nhóm</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Phân loại chuẩn</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-teal-300">0.4s</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Thời gian suy luận</p>
            </div>
          </div>

        </div>

      </section>

      {/* 3 Classification Pillars Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Tiêu chuẩn phân loại
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Hệ thống 3 nhóm rác thải chuyên sâu
          </h2>
          <p className="text-sm text-slate-500">
            Trashformer tuân thủ nghiêm ngặt quy định bảo vệ môi trường, phân định rõ ràng giữa rác tái chế và rác nguy hại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Group A */}
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              NHÓM A
            </div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              Rác Hữu Cơ
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Thức ăn thừa, vỏ rau củ quả, lá cây mục, bã cà phê. Dễ phân hủy sinh học tự nhiên và có thể ủ thành phân compost giàu mùn.
            </p>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <span>Phương pháp: Ủ phân compost, Biogas</span>
            </div>
          </div>

          {/* Group B */}
          <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Recycle className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              NHÓM B
            </div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              Rác Vô Cơ
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Chai nhựa PET, lon kim loại, bìa carton, thủy tinh, túi nilon. Được phân tách thành nhóm tái chế được và nhóm khó tái chế.
            </p>
            <div className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
              <span>Phương pháp: Thu gom ve chai, Tái chế tuần hoàn</span>
            </div>
          </div>

          {/* Group C */}
          <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
              NHÓM C
            </div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              Thu Gom Riêng (Nguy Hại)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Pin cũ, bóng đèn huỳnh quang, rác điện tử, hóa chất. Chứa kim loại nặng và chất độc hại, tuyệt đối không vứt chung rác sinh hoạt.
            </p>
            <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
              <span>Phương pháp: Mang đến điểm thu hồi chuyên trách</span>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Dashboard Overview & Chart */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              Thống kê tổng quan cộng đồng
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Tỷ lệ nhận diện các nhóm rác thải
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Biểu đồ phân bố tỷ lệ rác thải được phát hiện qua hệ thống. Dữ liệu này giúp đánh giá xu hướng tiêu dùng và hỗ trợ các chiến dịch tuyên truyền môi trường tại địa phương.
            </p>

            <div className="space-y-2 pt-2">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value} lượt</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveTab('analytics')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors"
              >
                <span>Xem báo cáo phân tích chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Donut Chart Visual */}
          <div className="w-full sm:w-72 h-64 sm:h-72 flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} lượt`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Trải nghiệm người dùng
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quy trình nhận diện 4 bước đơn giản
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Mở máy ảnh / Tải ảnh</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Truy cập chức năng nhận diện, cho phép camera trực tiếp hoặc chọn file ảnh từ máy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">AI phân tích hình ảnh</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mô hình thị giác máy tính nhận diện vật thể, quét chất liệu và xác định nhóm rác.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Xem báo cáo chi tiết</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nhận kết quả độ tin cậy, ưu/nhược điểm, phân tích tác động môi trường và cách xử lý.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Xử lý đúng cách & Lưu</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Làm theo hướng dẫn môi trường và theo dõi lịch sử phân loại của bạn bất kỳ lúc nào.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Items from Waste Library */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Các loại rác phổ biến
            </h3>
            <p className="text-xs text-slate-500">Tìm hiểu đặc điểm và cách xử lý các loại rác thường gặp</p>
          </div>
          <button
            onClick={() => setActiveTab('library')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Xem tất cả thư viện
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLIENT_WASTE_DATABASE.slice(0, 4).map((item) => (
            <div
              key={item.slug}
              onClick={() => setSelectedWasteItem(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="h-40 bg-slate-900 overflow-hidden relative">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.category_label}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

