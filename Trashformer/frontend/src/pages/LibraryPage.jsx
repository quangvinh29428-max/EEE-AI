import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Leaf, 
  Recycle, 
  ShieldAlert, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';
import { WASTE_CATEGORIES } from '../utils/constants';

export default function LibraryPage({ onSelectItem }) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // "" = all
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService.getWasteLibrary(searchQuery, selectedCategory)
      .then(data => {
        setItems(data || []);
      })
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCategory]);

  const categories = [
    { key: "", label: "Tất cả loại rác" },
    { key: "organic", label: "Nhóm A - Hữu cơ", color: "emerald", icon: Leaf },
    { key: "inorganic", label: "Nhóm B - Vô cơ", color: "blue", icon: Recycle },
    { key: "hazardous", label: "Nhóm C - Nguy hại", color: "amber", icon: ShieldAlert },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Kho tri thức môi trường</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Thư viện rác thải & Hướng dẫn phân loại
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Tra cứu đầy đủ thông tin đặc tính vật lý, ưu nhược điểm, tác động sinh thái và hướng xử lý chuẩn cho từng loại rác thải sinh hoạt.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên rác, vật liệu (VD: chai nhựa, vỏ chuối, pin, carton...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
              >
                Xóa
              </button>
            )}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Lọc:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Waste Items */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          Đang tải thư viện rác thải...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">Không tìm thấy loại rác phù hợp</h3>
          <p className="text-xs text-slate-500">
            Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc danh mục
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const catMeta = 
              item.category === 'organic' 
                ? WASTE_CATEGORIES.ORGANIC 
                : item.category === 'inorganic' 
                ? WASTE_CATEGORIES.INORGANIC 
                : WASTE_CATEGORIES.HAZARDOUS;

            return (
              <div
                key={item.slug}
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer group hover:-translate-y-0.5"
              >
                {/* Image & Badge */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-sm ${catMeta.badgeClass}`}>
                      {item.category === 'organic' && <Leaf className="w-3 h-3" />}
                      {item.category === 'inorganic' && <Recycle className="w-3 h-3" />}
                      {item.category === 'hazardous' && <ShieldAlert className="w-3 h-3" />}
                      {catMeta.groupCode}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {item.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Vật liệu:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[160px] text-right">
                      {item.material}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

