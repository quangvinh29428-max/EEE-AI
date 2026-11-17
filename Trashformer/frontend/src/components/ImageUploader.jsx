import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, Zap, AlertTriangle } from 'lucide-react';

export default function ImageUploader({ onImageSelected, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    setErrorMessage(null);
    if (!files || files.length === 0) return;
    const file = files[0];

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Định dạng file không hợp lệ. Chỉ chấp nhận JPG, JPEG, PNG hoặc WEBP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Kích thước ảnh quá lớn (vượt quá 10MB). Vui lòng chọn ảnh nhỏ hơn.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setErrorMessage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleTriggerAnalyze = () => {
    if (selectedFile) {
      onImageSelected(selectedFile, previewUrl);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
      
      {/* Title */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-emerald-600" />
          Tải ảnh rác thải từ thiết bị
        </h3>
        <p className="text-xs text-slate-500">
          Hỗ trợ định dạng JPG, JPEG, PNG, WEBP (tối đa 10MB)
        </p>
      </div>

      {/* Dropzone Area or Preview Area */}
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
            dragActive
              ? "border-emerald-500 bg-emerald-50/60 scale-[1.01]"
              : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
            Kéo và thả ảnh rác thải vào đây
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            hoặc <span className="text-emerald-600 font-semibold hover:underline">nhấp chuột để duyệt file</span> từ máy tính / điện thoại
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-100 font-mono">JPG</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 font-mono">PNG</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 font-mono">WEBP</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
            <img
              src={previewUrl}
              alt="Ảnh xem trước"
              className="w-full h-full object-contain"
            />
            
            {/* Overlay File Info Badge */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium truncate max-w-[180px] sm:max-w-xs">{selectedFile.name}</span>
              <span className="text-slate-400 text-[11px]">
                ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleClear}
              type="button"
              disabled={isAnalyzing}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-xs sm:text-sm hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              Xóa ảnh
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              type="button"
              disabled={isAnalyzing}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Chọn ảnh khác
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleChange}
              className="hidden"
            />
            <button
              onClick={handleTriggerAnalyze}
              disabled={isAnalyzing}
              type="button"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              {isAnalyzing ? "Đang phân tích..." : "Bắt đầu phân tích hình ảnh"}
            </button>
          </div>
        </div>
      )}

      {/* Error message if any */}
      {errorMessage && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

    </div>
  );
}

