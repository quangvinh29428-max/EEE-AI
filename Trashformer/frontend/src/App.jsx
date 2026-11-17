import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetectPage from './pages/DetectPage';
import LibraryPage from './pages/LibraryPage';
import HistoryPage from './pages/HistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';
import WasteDetailModal from './components/WasteDetailModal';
import AnalysisReport from './components/AnalysisReport';
import { apiService } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [aiStatus, setAiStatus] = useState(null);
  const [selectedWasteItem, setSelectedWasteItem] = useState(null);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState(null);

  useEffect(() => {
    apiService.getAiStatus().then(status => setAiStatus(status));
  }, []);

  const handleSelectRecordFromHistory = (record) => {
    setViewingHistoryRecord(record);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Sticky Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewingHistoryRecord(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        aiStatus={aiStatus} 
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* If user is viewing a specific historical record report */}
        {viewingHistoryRecord ? (
          <div className="space-y-4">
            <button
              onClick={() => setViewingHistoryRecord(null)}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              ← Quay lại danh sách lịch sử
            </button>
            <AnalysisReport
              report={viewingHistoryRecord}
              onReset={() => setViewingHistoryRecord(null)}
              onCorrectionSuccess={(updated) => setViewingHistoryRecord(updated)}
            />
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage 
                setActiveTab={setActiveTab} 
                setSelectedWasteItem={setSelectedWasteItem} 
              />
            )}

            {activeTab === 'detect' && (
              <DetectPage aiStatus={aiStatus} />
            )}

            {activeTab === 'library' && (
              <LibraryPage onSelectItem={setSelectedWasteItem} />
            )}

            {activeTab === 'history' && (
              <HistoryPage onSelectRecord={handleSelectRecordFromHistory} />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsPage />
            )}

            {activeTab === 'about' && (
              <AboutPage />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Waste Knowledge Detail Modal */}
      {selectedWasteItem && (
        <WasteDetailModal
          item={selectedWasteItem}
          onClose={() => setSelectedWasteItem(null)}
        />
      )}

    </div>
  );
}

