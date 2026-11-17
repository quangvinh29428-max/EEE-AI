import React, { useState, useEffect } from 'react';
import { 
  Recycle, 
  Sparkles, 
  Camera, 
  BookOpen, 
  History, 
  BarChart3, 
  Info, 
  Menu, 
  X,
  Cpu,
  Key,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';
import { getStoredGeminiKey, setStoredGeminiKey, executeGeminiRequestWithAutoFallback } from '../services/geminiService';

export default function Navbar({ activeTab, setActiveTab, aiStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [testStatus, setTestStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const key = getStoredGeminiKey();
    setHasGeminiKey(Boolean(key));
    setApiKeyInput(key);
  }, []);

  const handleOpenGeminiModal = () => {
    setApiKeyInput(getStoredGeminiKey());
    setTestStatus(null);
    setGeminiModalOpen(true);
  };

  const handleSaveGeminiKey = async () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) {
      setTestStatus({ ok: false, msg: 'Vui lòng nhập Google Gemini API Key!' });
      return;
    }

    setIsTesting(true);
    setTestStatus(null);

    try {
      const pingPayload = {
        contents: [{ parts: [{ text: "Trả lời: OK" }] }]
      };
      const { model } = await executeGeminiRequestWithAutoFallback(trimmed, pingPayload);

      setStoredGeminiKey(trimmed);
      setHasGeminiKey(true);
      setTestStatus({ ok: true, msg: `✓ Kết nối thành công với mô hình: ${model}!` });
      setTimeout(() => setGeminiModalOpen(false), 1200);
    } catch (e) {
      setTestStatus({ ok: false, msg: `✕ Lỗi xác thực API Key: ${e.message}` });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClearGeminiKey = () => {
    setStoredGeminiKey('');
    setApiKeyInput('');
    setHasGeminiKey(false);
    setTestStatus({ ok: true, msg: 'Đã xóa API Key.' });
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Recycle },
    { id: 'detect', label: 'Nhận diện rác', icon: Camera, highlight: true },
    { id: 'library', label: 'Thư viện rác thải', icon: BookOpen },
    { id: 'history', label: 'Lịch sử', icon: History },
    { id: 'analytics', label: 'Thống kê', icon: BarChart3 },
    { id: 'about', label: 'Giới thiệu', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Brand */}
            <div 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Recycle className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
                <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-emerald-300 fill-emerald-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    TRASH<span className="text-emerald-600">FORMER</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">
                    AI
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] text-slate-500 font-medium">
                  {APP_CONFIG.SLOGAN_VI}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      item.highlight && !isActive
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-600' : 'text-slate-500'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* AI Status Badge & Gemini Config Button */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={handleOpenGeminiModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gemini AI</span>
                <span className={`w-2 h-2 rounded-full ${hasGeminiKey ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
              </button>

              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                aiStatus?.yolo_loaded || aiStatus?.roboflow_configured || hasGeminiKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                <Cpu className="w-3.5 h-3.5" />
                <span>
                  {hasGeminiKey
                    ? 'Gemini Vision AI'
                    : aiStatus?.yolo_loaded 
                    ? 'YOLO AI Sẵn sàng' 
                    : aiStatus?.roboflow_configured 
                    ? 'Roboflow Cloud' 
                    : 'Chế độ Demo'}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleOpenGeminiModal}
                className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gemini</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-3 mt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenGeminiModal();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Cấu hình Google Gemini AI
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${hasGeminiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {hasGeminiKey ? 'Đã bật' : 'Chưa có Key'}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Gemini Configuration Modal */}
      {geminiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Cấu hình Google Gemini AI</h3>
                  <p className="text-xs text-slate-500">Kích hoạt Multimodal Vision & Trợ lý Chat Môi trường</p>
                </div>
              </div>
              <button 
                onClick={() => setGeminiModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100 text-xs space-y-2 text-indigo-950">
              <span className="font-bold block text-indigo-900">🚀 Sức mạnh của Gemini AI trên Trashformer:</span>
              <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                <li>Nhận diện chính xác hình ảnh rác thải thật qua camera hoặc file tải lên.</li>
                <li>Không bịa kết quả nếu ảnh rỗng, tối hoặc không có rác thải.</li>
                <li>Hỏi đáp sinh thái trực tiếp cùng trợ lý Gemini về cách tái chế và phân loại rác.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <label>Google Gemini API Key:</label>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold underline flex items-center gap-1 text-[11px]"
                >
                  <span>Lấy key miễn phí tại Google AI Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input 
                type="password" 
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-[11px] text-slate-400">Khóa API được lưu trữ an toàn trong LocalStorage trình duyệt của bạn.</p>

              {testStatus && (
                <div className={`text-xs p-3 rounded-xl flex items-center gap-2 ${testStatus.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {testStatus.ok ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                  <span>{testStatus.msg}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <button
                onClick={handleClearGeminiKey}
                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all"
              >
                Xóa Key
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGeminiModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSaveGeminiKey}
                  disabled={isTesting}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                >
                  {isTesting ? 'Đang kiểm tra...' : 'Kiểm tra & Lưu'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
  );
}

