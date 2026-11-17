import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Leaf, 
  Recycle, 
  Cpu, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  Check, 
  X, 
  ArrowRight, 
  Edit3, 
  Printer, 
  RotateCcw,
  Info,
  Send,
  MessageSquare
} from 'lucide-react';
import { WASTE_CATEGORIES } from '../utils/constants';
import CorrectionModal from './CorrectionModal';
import { chatWithGeminiAboutWaste, getStoredGeminiKey } from '../services/geminiService';

export default function AnalysisReport({ report, onReset, onCorrectionSuccess }) {
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [questionInput, setQuestionInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  if (!report) return null;

  const categoryMeta = 
    report.category === 'organic' 
      ? WASTE_CATEGORIES.ORGANIC 
      : report.category === 'inorganic' 
      ? WASTE_CATEGORIES.INORGANIC 
      : WASTE_CATEGORIES.HAZARDOUS;

  const handlePrint = () => {
    window.print();
  };

  const handleSendChat = async (presetText = null) => {
    const q = (presetText || questionInput).trim();
    if (!q) return;

    const apiKey = getStoredGeminiKey();
    if (!apiKey) {
      alert("Vui lòng nhấp nút 'Gemini AI' trên thanh điều hướng để nhập API Key từ Google AI Studio trước khi trò chuyện!");
      return;
    }

    const newMsgs = [...chatMessages, { sender: 'user', text: q, time: new Date().toLocaleTimeString() }];
    setChatMessages(newMsgs);
    setQuestionInput('');
    setIsAsking(true);

    try {
      const answer = await chatWithGeminiAboutWaste(report.item_name, report.category_label || report.category, q);
      setChatMessages([...newMsgs, { sender: 'gemini', text: answer, time: new Date().toLocaleTimeString() }]);
    } catch (err) {
      setChatMessages([...newMsgs, { sender: 'gemini', text: `✕ Không thể kết nối Gemini: ${err.message}`, error: true }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Disclaimer Banner if running in Demo Mode */}
      {report.is_demo && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-800">
            <span className="font-bold block text-amber-900">
              Chế độ Demo / Thử nghiệm (Simulation Mode)
            </span>
            {report.warning || "Kết quả nhận diện hiện tại dựa trên bộ dữ liệu mô phỏng. Khi tích hợp mô hình YOLO hoặc Roboflow thực tế, AI sẽ nhận diện trực tiếp từ tensor mạng nơ-ron."}
          </div>
        </div>
      )}

      {/* Main Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            
            {/* Image Preview Box */}
            <div className="w-full lg:w-72 aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shrink-0 relative border border-slate-200">
              {report.image_base64 ? (
                <img
                  src={report.image_base64}
                  alt={report.item_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <Recycle className="w-10 h-10 mb-2 opacity-50" />
                  <span className="text-xs">Không có ảnh xem trước</span>
                </div>
              )}

              {/* Engine Badge Overlay */}
              <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur text-white text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-400" />
                {report.ai_engine}
              </div>
            </div>

            {/* Core Identification Meta */}
            <div className="flex-1 space-y-4 w-full">
              
              {/* Category Group & Confidence */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${categoryMeta.badgeClass}`}>
                  {report.category === 'organic' && <Leaf className="w-3.5 h-3.5" />}
                  {report.category === 'inorganic' && <Recycle className="w-3.5 h-3.5" />}
                  {report.category === 'hazardous' && <ShieldAlert className="w-3.5 h-3.5" />}
                  <span>{categoryMeta.groupCode}: {report.category_label}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Độ tin cậy AI:</span>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{(report.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Item Name */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {report.item_name}
                </h2>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <span className="font-medium text-slate-700">Chất liệu dự đoán:</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono text-slate-800">
                    {report.material_prediction || "Đang phân tích cấu trúc vật liệu"}
                  </span>
                </p>
              </div>

              {/* Quick Status Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 block">Khả năng tái chế:</span>
                  <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                    {report.recyclability}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 block">Tiềm năng tái sử dụng:</span>
                  <span className="text-sm text-slate-700 mt-0.5 block line-clamp-2">
                    {report.reuse_potential}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowCorrectionModal(true)}
                  type="button"
                  className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  Đính chính kết quả nếu AI chưa đúng
                </button>
                <button
                  onClick={handlePrint}
                  type="button"
                  className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  In báo cáo
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Grid of Detailed Analysis Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Section 1: Đặc điểm vật lý */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Đặc điểm vật lý & nhận dạng
          </h4>
          <ul className="space-y-2">
            {report.physical_properties?.map((prop, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{prop}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Tác động môi trường */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            Tác động đến môi trường
          </h4>
          <ul className="space-y-2">
            {report.environmental_impact?.map((impact, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>{impact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Đánh giá Ưu điểm */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
          <h4 className="font-bold text-emerald-800 text-base flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            Ưu điểm & Tiềm năng giá trị
          </h4>
          <ul className="space-y-2">
            {report.advantages?.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Nhược điểm & Rủi ro */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
          <h4 className="font-bold text-amber-800 text-base flex items-center gap-2">
            <X className="w-5 h-5 text-amber-600" />
            Nhược điểm & Hạn chế xử lý
          </h4>
          <ul className="space-y-2">
            {report.disadvantages?.map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-amber-50/70 p-2.5 rounded-lg border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Interactive Gemini Eco Chatbot Section */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 rounded-2xl border border-indigo-200 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                Hỏi đáp sinh thái cùng Trợ lý Gemini AI
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  GEMINI BOT
                </span>
              </h4>
              <p className="text-xs text-slate-500">
                Tư vấn trực tiếp cách tái chế sáng tạo, phân hủy sinh học và tác động môi trường của món rác này
              </p>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button 
            type="button" 
            onClick={() => handleSendChat('Làm thế nào để tái chế hoặc tái sử dụng món này sáng tạo tại nhà?')}
            className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs font-medium"
          >
            💡 Cách tái chế tại nhà?
          </button>
          <button 
            type="button" 
            onClick={() => handleSendChat('Vật thể này mất bao lâu để phân hủy tự nhiên ngoài môi trường?')}
            className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs font-medium"
          >
            ⏳ Thời gian phân hủy tự nhiên?
          </button>
          <button 
            type="button" 
            onClick={() => handleSendChat('Nếu vô tình đốt vật thể này thì sẽ sinh ra khí độc hại gì?')}
            className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs font-medium"
          >
            🔥 Tác hại nếu bị đốt cháy?
          </button>
          <button 
            type="button" 
            onClick={() => handleSendChat('Quy định xử lý loại rác này tại Việt Nam theo luật bảo vệ môi trường thế nào?')}
            className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs font-medium"
          >
            ⚖️ Quy định phân loại tại VN?
          </button>
        </div>

        {/* Chat Log */}
        {chatMessages.length > 0 && (
          <div className="max-h-72 overflow-y-auto space-y-3 p-4 bg-white/90 rounded-xl border border-indigo-100 text-xs sm:text-sm">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'gemini' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    ✨
                  </div>
                )}
                <div 
                  className={`px-4 py-2.5 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : msg.error 
                      ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none whitespace-pre-wrap leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isAsking && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  ✨
                </div>
                <div className="bg-slate-100 text-slate-600 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  Gemini đang phân tích câu hỏi...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chat Input */}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            placeholder="Hỏi Gemini AI về cách tái chế, xử lý rác này..." 
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button 
            type="button" 
            onClick={() => handleSendChat()}
            disabled={isAsking}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{isAsking ? 'Đang gửi...' : 'Gửi hỏi AI'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full-width Handling Step-by-Step Guide */}
      <div className="bg-gradient-to-br from-emerald-900 to-green-950 text-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Quy trình khuyến nghị chuẩn môi trường
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Hướng dẫn xử lý rác thải đúng cách
          </h3>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Áp dụng các bước dưới đây để giảm thiểu ô nhiễm và tối ưu chuỗi tuần hoàn tái chế:
          </p>
          
          <div className="space-y-3 pt-2">
            {report.handling_guide?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-emerald-50 font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={onReset}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-sm shadow hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Nhận diện rác khác
            </button>
          </div>
        </div>
      </div>

      {/* User Correction Modal */}
      {showCorrectionModal && (
        <CorrectionModal
          record={report}
          onClose={() => setShowCorrectionModal(false)}
          onSuccess={(updated) => {
            setShowCorrectionModal(false);
            if (onCorrectionSuccess) onCorrectionSuccess(updated);
          }}
        />
      )}

    </div>
  );
}

