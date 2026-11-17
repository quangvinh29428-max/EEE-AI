import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Leaf, 
  Recycle, 
  ShieldAlert, 
  Award,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { apiService } from '../services/api';

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService.getAnalytics()
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Đang tải thống kê phân tích...</div>;
  }

  const pieData = stats?.category_distribution || [];
  const barData = stats?.trend_data || [];
  const topItems = stats?.top_detected_items || [];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Báo cáo dữ liệu môi trường</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Thống kê & Phân tích rác thải
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Tổng hợp thông số phân loại, phân bố cơ cấu rác thải và xu hướng xử lý rác được phát hiện qua hệ thống
        </p>
      </div>

      {/* Demo Data Notice if applicable */}
      {stats?.is_demo_data && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center gap-3 text-blue-900 text-xs sm:text-sm">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold">Đang hiển thị dữ liệu mẫu khởi tạo (Sample Analytics).</span> Khi người dùng thực hiện nhận diện thực tế, biểu đồ sẽ tự động đồng bộ và phản ánh trực tiếp dữ liệu mới.
          </div>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tổng lượt nhận diện</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">
            {stats?.total_detections || 0}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>Tất cả các phiên quét AI</span>
          </span>
        </div>

        {/* Organic */}
        <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Rác Hữu Cơ (Nhóm A)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-800">
            {stats?.organic_count || 0}
          </p>
          <span className="text-[11px] text-slate-500">
            {stats?.total_detections ? ((stats.organic_count / stats.total_detections) * 100).toFixed(1) : 0}% tổng lượng rác
          </span>
        </div>

        {/* Inorganic */}
        <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
            <span>Rác Vô Cơ (Nhóm B)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-blue-800">
            {stats?.inorganic_count || 0}
          </p>
          <span className="text-[11px] text-slate-500">
            {stats?.total_detections ? ((stats.inorganic_count / stats.total_detections) * 100).toFixed(1) : 0}% tổng lượng rác
          </span>
        </div>

        {/* Hazardous */}
        <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
            <span>Nguy Hại / Thu Gom Riêng</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-800">
            {stats?.hazardous_count || 0}
          </p>
          <span className="text-[11px] text-slate-500">
            {stats?.total_detections ? ((stats.hazardous_count / stats.total_detections) * 100).toFixed(1) : 0}% cần xử lý đặc biệt
          </span>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pie / Donut Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Tỷ lệ cơ cấu phân loại rác
              </h3>
              <p className="text-xs text-slate-500">Tỷ lệ phần trăm theo 3 nhóm</p>
            </div>
            <PieIcon className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="h-64 sm:h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
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
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Trend */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Xu hướng nhận diện theo thời gian
              </h3>
              <p className="text-xs text-slate-500">Số lượng rác được phát hiện</p>
            </div>
            <BarChart3 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px', border: 'none' }}
                />
                <Bar dataKey="organic" name="Rác hữu cơ" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inorganic" name="Rác vô cơ" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hazardous" name="Nguy hại" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Detected Items Table / List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Các loại rác được nhận diện nhiều nhất
            </h3>
            <p className="text-xs text-slate-500">Bảng xếp hạng tần suất xuất hiện</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {topItems.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  idx === 0 ? 'bg-amber-100 text-amber-800' :
                  idx === 1 ? 'bg-slate-200 text-slate-700' :
                  idx === 2 ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  item.category === 'organic' ? 'bg-emerald-50 text-emerald-700' :
                  item.category === 'inorganic' ? 'bg-blue-50 text-blue-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  {item.category === 'organic' ? 'Hữu cơ' : item.category === 'inorganic' ? 'Vô cơ' : 'Nguy hại'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-800">{item.count}</span>
                <span className="text-slate-400 text-xs">lượt</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

