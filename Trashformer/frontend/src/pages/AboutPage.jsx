import React from 'react';
import { 
  Recycle, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  Globe2, 
  Code2, 
  Layers, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Brand Hero Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-emerald-900/40 text-center space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/20">
          <Recycle className="w-10 h-10 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            TRASH<span className="text-emerald-400">FORMER</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-200 font-medium">
            {APP_CONFIG.FULL_NAME}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold pt-2">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10 text-emerald-300">
            "{APP_CONFIG.SLOGAN_EN}"
          </span>
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-white">
            "{APP_CONFIG.SLOGAN_VI}"
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
          Trashformer ra đời với sứ mệnh trao quyền cho mỗi cá nhân nhận biết chính xác loại rác thải trong sinh hoạt, hiểu rõ bản chất vật liệu, tác động môi sinh và áp dụng phương pháp phân loại chuẩn mực nhằm thúc đẩy nền kinh tế tuần hoàn (Circular Economy).
        </p>

      </div>

      {/* Brand Identity Guidelines */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          Hệ thống Nhận diện Thương hiệu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Biểu tượng & Ý nghĩa Logo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Biểu tượng vòng lặp tái chế 3 mũi tên kết hợp cùng ánh sao AI (Sparkle) tượng trưng cho sự giao thoa hoàn hảo giữa Trí tuệ nhân tạo và bảo vệ thiên nhiên bền vững.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Bảng màu Thương hiệu</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-800 text-white font-semibold">
                Xanh lá đậm (Chủ đạo)
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500 text-white font-semibold">
                Xanh lá nhạt (Phụ)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                Trắng (Nền giao diện)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-500 text-white font-semibold">
                Xám (Màu chữ phụ)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-emerald-600" />
          Kiến trúc Công nghệ Hệ thống
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Frontend Hiện đại</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• ReactJS 18 + Vite</li>
              <li>• Tailwind CSS SaaS UI</li>
              <li>• Lucide React Icons</li>
              <li>• Recharts Data Visualization</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Backend Hiệu năng cao</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Python FastAPI REST API</li>
              <li>• SQLAlchemy ORM</li>
              <li>• SQLite / PostgreSQL ready</li>
              <li>• Docker Containerization</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Mô hình AI & Thị giác</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• YOLOv8 Object Detection</li>
              <li>• Roboflow Inference API</li>
              <li>• Transparent Simulation Engine</li>
              <li>• User Feedback Learning Loop</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Transparent AI Commitment */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
        <h3 className="font-bold text-emerald-900 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          Cam kết Minh bạch Thuật toán AI
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
          Trashformer cam kết phân định minh bạch tuyệt đối giữa kết quả từ mô hình nơ-ron thật (YOLO/Roboflow) và chế độ Demo thử nghiệm. Mọi kết quả phỏng đoán đều cung cấp đầy đủ thông số độ tin cậy và cho phép người dùng đính chính trực tiếp để bảo đảm tính chính xác cao nhất.
        </p>
      </div>

    </div>
  );
}

