import React, { useState } from 'react';
import { Camera, RefreshCw, Power, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';

export default function CameraView({ onImageCaptured, isAnalyzing }) {
  const {
    videoRef,
    isCameraActive,
    error,
    facingMode,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame
  } = useCamera();

  const [capturedPreview, setCapturedPreview] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);

  const handleStart = () => {
    setCapturedPreview(null);
    setCapturedFile(null);
    startCamera();
  };

  const handleCapture = async () => {
    const result = await captureFrame();
    if (result) {
      setCapturedPreview(result.dataUrl);
      setCapturedFile(result.file);
      stopCamera();
    }
  };

  const handleRetake = () => {
    setCapturedPreview(null);
    setCapturedFile(null);
    startCamera();
  };

  const handleConfirmAnalyze = () => {
    if (capturedFile) {
      onImageCaptured(capturedFile, capturedPreview);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            Nhận diện Camera Trực tiếp
          </h3>
          <p className="text-xs text-slate-500">
            Đưa rác thải vào khung hình trung tâm và nhấn chụp ảnh để AI phân tích
          </p>
        </div>

        {isCameraActive && (
          <div className="flex items-center gap-2">
            <button
              onClick={switchCamera}
              type="button"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
              title="Đổi camera trước/sau"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Lật camera</span>
            </button>
            <button
              onClick={stopCamera}
              type="button"
              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium flex items-center gap-1 transition-colors"
              title="Tắt Camera"
            >
              <Power className="w-4 h-4" />
              <span className="hidden sm:inline">Tắt</span>
            </button>
          </div>
        )}
      </div>

      {/* Camera Viewport / Preview Box */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
        
        {/* State 1: Camera đang hoạt động */}
        {isCameraActive && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Viewfinder Bounding Target HUD */}
            <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-[11px] font-mono text-emerald-400 bg-slate-950/60 backdrop-blur px-2 py-1 rounded w-fit">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
                AI VIEWPORT LIVE
              </div>
              <div className="text-center text-xs text-emerald-300 font-medium bg-slate-950/70 backdrop-blur-sm py-1 px-3 rounded-full mx-auto">
                Căn chỉnh vật thể vào trung tâm
              </div>
            </div>

            {/* Laser Scan Animation Line */}
            <div className="absolute left-8 sm:left-12 right-8 sm:right-12 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scanline pointer-events-none" />
          </>
        )}

        {/* State 2: Đã chụp ảnh xong - Đang xem lại */}
        {!isCameraActive && capturedPreview && (
          <div className="relative w-full h-full">
            <img
              src={capturedPreview}
              alt="Ảnh vừa chụp"
              className="w-full h-full object-contain bg-slate-900"
            />
            <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đã chụp ảnh thành công
            </div>
          </div>
        )}

        {/* State 3: Camera chưa bật */}
        {!isCameraActive && !capturedPreview && (
          <div className="text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white font-medium text-sm sm:text-base">Camera đang tắt</p>
              <p className="text-slate-400 text-xs max-w-xs mx-auto mt-1">
                Nhấn nút bên dưới để cấp quyền máy ảnh và bắt đầu nhận diện rác trực tiếp
              </p>
            </div>
            <button
              onClick={handleStart}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-700/30 transition-all flex items-center gap-2 mx-auto"
            >
              <Zap className="w-4 h-4" />
              Bật Camera ngay
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-600/90 text-white text-xs p-3 rounded-lg flex items-center gap-2 backdrop-blur">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {isCameraActive && (
          <button
            onClick={handleCapture}
            type="button"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm shadow-md shadow-emerald-700/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Camera className="w-5 h-5" />
            Chụp ảnh này
          </button>
        )}

        {!isCameraActive && capturedPreview && (
          <>
            <button
              onClick={handleRetake}
              type="button"
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Chụp lại
            </button>
            <button
              onClick={handleConfirmAnalyze}
              disabled={isAnalyzing}
              type="button"
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              {isAnalyzing ? "Đang phân tích..." : "Phân tích hình ảnh này"}
            </button>
          </>
        )}
      </div>

    </div>
  );
}

