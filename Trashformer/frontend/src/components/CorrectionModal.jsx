import React, { useState } from 'react';
import { X, Check, Edit3, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { WASTE_CATEGORIES } from '../utils/constants';

export default function CorrectionModal({ record, onClose, onSuccess }) {
  const [name, setName] = useState(record?.item_name || "");
  const [category, setCategory] = useState(record?.category || "inorganic");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Vui lòng nhập tên vật thể rác thải chính xác.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await apiService.sendCorrection(
        record?.id,
        name.trim(),
        category,
        notes.trim()
      );
      
      const catMeta = category === 'organic' ? WASTE_CATEGORIES.ORGANIC : category === 'inorganic' ? WASTE_CATEGORIES.INORGANIC : WASTE_CATEGORIES.HAZARDOUS;
      const updatedRecord = {
        ...record,
        item_name: name.trim(),
        category: category,
        category_label: catMeta.label,
        user_corrected: true,
        user_notes: notes.trim()
      };
      
      onSuccess(updatedRecord);
    } catch (err) {
      setError("Có lỗi khi lưu đính chính. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Đính chính kết quả AI</h3>
              <p className="text-xs text-slate-500">Giúp mô hình cải thiện độ chính xác</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên vật thể chính xác *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Chai nhựa PET, Vỏ cam, Pin cúc áo..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nhóm phân loại *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory("organic")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  category === 'organic'
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Nhóm A: Hữu cơ
              </button>
              <button
                type="button"
                onClick={() => setCategory("inorganic")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  category === 'inorganic'
                    ? "bg-blue-50 border-blue-500 text-blue-800 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Nhóm B: Vô cơ
              </button>
              <button
                type="button"
                onClick={() => setCategory("hazardous")}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  category === 'hazardous'
                    ? "bg-amber-50 border-amber-500 text-amber-800 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                Nhóm C: Nguy hại
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ghi chú thêm (tùy chọn)
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="VD: Góc chụp bị lóa sáng, chất liệu là nhôm chứ không phải sắt..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-700/20 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isSubmitting ? "Đang lưu..." : "Xác nhận đính chính"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

