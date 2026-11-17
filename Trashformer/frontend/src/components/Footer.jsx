import React from 'react';
import { Recycle, Sparkles, Heart, ShieldCheck, Github } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md">
                <Recycle className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                TRASH<span className="text-emerald-400">FORMER</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {APP_CONFIG.FULL_NAME} – Hệ thống ứng dụng Trí tuệ nhân tạo thị giác máy tính giúp nhận diện, phân loại chính xác và hướng dẫn xử lý rác thải vì một môi trường xanh sạch bền vững.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-medium pt-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800">
                "{APP_CONFIG.SLOGAN_EN}"
              </span>
              <span className="text-slate-500">•</span>
              <span>"{APP_CONFIG.SLOGAN_VI}"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('detect')} className="hover:text-emerald-400 transition-colors">
                  Nhận diện rác thông minh
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('library')} className="hover:text-emerald-400 transition-colors">
                  Thư viện rác thải
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-emerald-400 transition-colors">
                  Lịch sử phân tích
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analytics')} className="hover:text-emerald-400 transition-colors">
                  Thống kê & Báo cáo
                </button>
              </li>
            </ul>
          </div>

          {/* Classification Groups */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Nhóm phân loại
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Nhóm A: Rác hữu cơ</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Nhóm B: Rác vô cơ</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Nhóm C: Rác thu gom riêng</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dữ liệu đạt chuẩn phân loại môi trường</span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Trashformer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Xây dựng với <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> vì một hành tinh không rác thải.
          </p>
        </div>
      </div>
    </footer>
  );
}

