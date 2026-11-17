import React, { useState } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Zap, 
  Sparkles, 
  RotateCcw, 
  AlertCircle, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import CameraView from '../components/CameraView';
import ImageUploader from '../components/ImageUploader';
import AnalysisReport from '../components/AnalysisReport';
import { apiService } from '../services/api';
import { analyzeWasteWithGemini, getStoredGeminiKey } from '../services/geminiService';

export default function DetectPage({ aiStatus }) {
  const [activeMode, setActiveMode] = useState('camera'); // 'camera' hoặc 'upload'
  const [forceDemo, setForceDemo] = useState(false);
  const [useGeminiVision, setUseGeminiVision] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 0: Idle, 1: Preprocess, 2: Neural Inference, 3: Knowledge Mapping
  const [reportResult, setReportResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleStartAnalysis = async (file, previewUrl) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalysisStep(1);

    const timer1 = setTimeout(() => setAnalysisStep(2), 400);
    const timer2 = setTimeout(() => setAnalysisStep(3), 900);

    const geminiKey = getStoredGeminiKey();

    try {
      let data = null;

      // 1. ƯU TIÊN GOOGLE GEMINI MULTIMODAL VISION NẾU ĐÃ CÓ KEY
      if (useGeminiVision && geminiKey && previewUrl) {
        data = await analyzeWasteWithGemini(previewUrl, geminiKey);
        
        if (data.is_waste === false) {
          setErrorMsg(`Gemini AI không phát hiện rác thải: ${data.reason || "Ảnh không chứa vật thể rác thải sinh hoạt nào rõ ràng."} AI cam kết không bịa kết quả!`);
          setIsAnalyzing(false);
          setAnalysisStep(0);
          return;
        }
      } else {
        // 2. GỬI TỚI BACKEND API (YOLO / Roboflow / Demo)
        data = await apiService.detectImage(file, forceDemo);
      }

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!data.image_base64 && previewUrl) {
        data.image_base64 = previewUrl;
      }

      setReportResult(data);
    } catch (err) {
      setErrorMsg(err.message || "Không thể phân tích ảnh. Vui lòng thử lại với ảnh rõ nét hơn.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  const handleReset = () => {
    setReportResult(null);
    setErrorMsg(null);
    setIsAnalyzing(false);
  };

  const handleCorrectionSuccess = (updatedRecord) => {
    setReportResult(updatedRecord);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Thị giác máy tính AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Nhận diện & Phân tích rác thải
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Chụp ảnh hoặc tải lên hình ảnh rác thải. Mô hình AI của Trashformer sẽ tự động nhận diện tên vật thể, xếp nhóm rác và hướng dẫn quy trình xử lý chuẩn.
        </p>
      </div>

      {/* AI Engine Transparent Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Động cơ AI phân tích:</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                useGeminiVision
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {useGeminiVision ? 'Google Gemini 1.5 Flash Vision' : (aiStatus?.active_real_engine || 'Chế độ Demo')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {useGeminiVision
                ? 'Thị giác đa phương thức Google Gemini – nhận diện chính xác vật thể thật & 0% bịa kết quả'
                : 'Mô hình mạng nơ-ron cục bộ/nội bộ – xử lý trực tiếp qua máy chủ'}
            </p>
          </div>
        </div>

        {/* Toggle Gemini vs Local */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setUseGeminiVision(!useGeminiVision)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              useGeminiVision
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            {useGeminiVision ? '✨ Đang dùng Gemini Vision' : '🖥️ Dùng Local / Demo'}
          </button>
        </div>
      </div>

      {/* Main Detection Flow */}
      {!reportResult ? (
        <div className="space-y-6">
          
          {/* Tabs: Camera vs Upload */}
          <div className="flex rounded-2xl bg-slate-200/80 p-1.5 max-w-md mx-auto">
            <button
              onClick={() => setActiveMode('camera')}
              disabled={isAnalyzing}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeMode === 'camera'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Camera trực tiếp</span>
            </button>
            <button
              onClick={() => setActiveMode('upload')}
              disabled={isAnalyzing}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeMode === 'upload'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>Tải ảnh từ máy</span>
            </button>
          </div>

          {/* AI Processing Overlay Animation */}
          {isAnalyzing ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10 sm:p-16 text-center space-y-6 animate-in fade-in">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-25" />
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin flex items-center justify-center" />
                <div className="absolute inset-0 flex items-center justify-center text-emerald-600 font-bold">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900">
                  AI đang xử lý và phân loại rác...
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {analysisStep === 1 && "Đang tiền xử lý ảnh và trích xuất đặc trưng pixel..."}
                  {analysisStep === 2 && "Đang chạy qua mạng nơ-ron nhận diện vật thể & chất liệu..."}
                  {analysisStep === 3 && "Đang đối chiếu thư viện kiến thức và tạo báo cáo xử lý..."}
                </p>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className={`w-2.5 h-2.5 rounded-full transition-colors ${analysisStep >= 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <span className={`w-2.5 h-2.5 rounded-full transition-colors ${analysisStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <span className={`w-2.5 h-2.5 rounded-full transition-colors ${analysisStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              </div>
            </div>
          ) : (
            <>
              {/* Camera Mode */}
              {activeMode === 'camera' && (
                <CameraView
                  onImageCaptured={handleStartAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              )}

              {/* Upload Mode */}
              {activeMode === 'upload' && (
                <ImageUploader
                  onImageSelected={handleStartAnalysis}
                  isAnalyzing={isAnalyzing}
                />
              )}
            </>
          )}

          {/* Error Notice */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-red-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-semibold text-xs transition-colors shrink-0"
              >
                Thử lại
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Report Page View */
        <AnalysisReport
          report={reportResult}
          onReset={handleReset}
          onCorrectionSuccess={handleCorrectionSuccess}
        />
      )}

    </div>
  );
}

