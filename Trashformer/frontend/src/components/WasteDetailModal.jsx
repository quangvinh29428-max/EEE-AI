import React from 'react';
import { X, Leaf, Recycle, ShieldAlert, CheckCircle2, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { WASTE_CATEGORIES } from '../utils/constants';

export default function WasteDetailModal({ item, onClose }) {
  if (!item) return null;

  const catMeta = 
    item.category === 'organic' 
      ? WASTE_CATEGORIES.ORGANIC 
      : item.category === 'inorganic' 
      ? WASTE_CATEGORIES.INORGANIC 
      : WASTE_CATEGORIES.HAZARDOUS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header with Image */}
        <div className="relative h-56 sm:h-64 bg-slate-950 overflow-hidden">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Badge & Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${catMeta.badgeClass}`}>
              {item.category === 'organic' && <Leaf className="w-3.5 h-3.5" />}
              {item.category === 'inorganic' && <Recycle className="w-3.5 h-3.5" />}
              {item.category === 'hazardous' && <ShieldAlert className="w-3.5 h-3.5" />}
              {catMeta.groupCode}: {item.category_label}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {item.description}
          </p>

          {/* Material & Recyclability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block">Thành phần chất liệu:</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5 block">{item.material}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 block">Tái chế thực tế:</span>
              <span className={`text-sm font-bold mt-0.5 block ${item.recyclable ? 'text-emerald-600' : 'text-amber-600'}`}>
                {item.recyclable ? "Có thể tái chế hiệu quả" : "Khó tái chế / Cần xử lý riêng"}
              </span>
            </div>
          </div>

          {/* Physical Properties */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Đặc tính vật lý & nhận dạng
            </h4>
            <ul className="space-y-1.5">
              {item.physical_properties?.map((p, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advantages & Disadvantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <h5 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ưu điểm & Tận dụng
              </h5>
              <ul className="space-y-1 text-xs text-slate-700">
                {item.advantages?.map((adv, idx) => (
                  <li key={idx}>• {adv}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
              <h5 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Nhược điểm & Tác hại
              </h5>
              <ul className="space-y-1 text-xs text-slate-700">
                {item.disadvantages?.map((dis, idx) => (
                  <li key={idx}>• {dis}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Handling Guide */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Recycle className="w-4 h-4" />
              Các bước xử lý và phân loại chuẩn
            </h4>
            <div className="space-y-2">
              {item.handling_guide?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="font-bold text-emerald-400 shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}

