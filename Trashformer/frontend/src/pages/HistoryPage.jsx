import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  Search, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  ExternalLink, 
  AlertCircle, 
  Leaf, 
  Recycle, 
  ShieldAlert,
  Sparkles,
  Calendar
} from 'lucide-react';
import { apiService } from '../services/api';
import { storageService } from '../services/storageService';
import { WASTE_CATEGORIES } from '../utils/constants';

export default function HistoryPage({ onSelectRecord }) {
  const [historyList, setHistoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    setLoading(true);
    apiService.getHistory(selectedCategory, searchQuery)
      .then(data => setHistoryList(data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, [searchQuery, selectedCategory]);

  const handleDeleteItem = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
      await apiService.deleteHistoryItem(id);
      fetchHistory();
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("CẢNH BÁO: Thao tác này sẽ xóa toàn bộ lịch sử nhận diện. Bạn có muốn tiếp tục?")) {
      await apiService.clearAllHistory();
      fetchHistory();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Nhật ký nhận diện</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lịch sử phân tích rác thải
          </h1>
          <p className="text-sm text-slate-500">
            Xem lại kết quả, tra cứu lại các phân tích môi trường và xuất báo cáo dữ liệu
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => storageService.exportToCSV()}
            disabled={historyList.length === 0}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-40"
            title="Xuất bảng tính CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất CSV</span>
          </button>
          <button
            onClick={() => storageService.exportToJSON()}
            disabled={historyList.length === 0}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-40"
            title="Xuất file JSON"
          >
            <FileCode className="w-4 h-4 text-blue-600" />
            <span>Xuất JSON</span>
          </button>
          {historyList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Xóa tất cả"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên rác đã nhận diện..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
          />
        </div>

        {/* Filter Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedCategory("organic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "organic" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            Hữu cơ
          </button>
          <button
            onClick={() => setSelectedCategory("inorganic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "inorganic" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            Vô cơ
          </button>
          <button
            onClick={() => setSelectedCategory("hazardous")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "hazardous" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            Nguy hại
          </button>
        </div>

      </div>

      {/* History List Table / Cards */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Đang tải lịch sử...</div>
      ) : historyList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <History className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">Chưa có lịch sử nhận diện</h3>
          <p className="text-xs text-slate-500">
            Hãy bắt đầu nhận diện rác bằng camera hoặc tải ảnh để ghi lại nhật ký
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyList.map((record) => {
            const catMeta = 
              record.category === 'organic' 
                ? WASTE_CATEGORIES.ORGANIC 
                : record.category === 'inorganic' 
                ? WASTE_CATEGORIES.INORGANIC 
                : WASTE_CATEGORIES.HAZARDOUS;

            return (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative">
                    {record.image_base64 ? (
                      <img
                        src={record.image_base64}
                        alt={record.item_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Recycle className="w-6 h-6 opacity-40" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${catMeta.badgeClass}`}>
                        {catMeta.groupCode}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base truncate group-hover:text-emerald-600 transition-colors">
                        {record.item_name}
                      </h4>
                      {record.user_corrected && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          Đã đính chính
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Độ tin cậy: {(record.confidence * 100).toFixed(0)}%
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(record.created_at).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onSelectRecord(record)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Xem báo cáo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteItem(e, record.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Xóa mục này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

