import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { buildingFloors, FloorData } from './data/floors';
import { FloorPlan } from './components/FloorPlan';
import { Building } from './components/Building';
import { GitCompare, X, Menu, Home, Calendar, Image as ImageIcon, Map, FileText, Video, Camera } from 'lucide-react';

export default function App() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareFloor, setCompareFloor] = useState<number | null>(null);

  const hoveredData = buildingFloors.find(f => f.level === hoveredFloor);
  const selectedFloorData = buildingFloors.find(f => f.level === selectedFloor);
  const compareFloorData = buildingFloors.find(f => f.level === compareFloor);

  const handleFloorClick = (level: number) => {
    if (compareMode && selectedFloorData) {
      const clickedFloorData = buildingFloors.find(f => f.level === level);
      // Only set compare floor if it has a different layout than the selected floor
      if (clickedFloorData && clickedFloorData.layoutId !== selectedFloorData.layoutId) {
        setCompareFloor(level);
      } else if (level === selectedFloor) {
        // Do nothing, they clicked the base floor
      }
    } else {
      setSelectedFloor(level);
      setCompareMode(false);
      setCompareFloor(null);
    }
  };

  const closeDetailView = () => {
    setSelectedFloor(null);
    setCompareMode(false);
    setCompareFloor(null);
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (compareMode) {
      setCompareFloor(null);
    }
  };

  return (
    <div className="min-h-dvh bg-[#FDFBF7] text-zinc-900 font-sans flex flex-col overflow-hidden relative">

      {/* Background for Full Screen Mode */}
      {!selectedFloor && (
        <div className="absolute inset-0 z-0">
          <img src="/mainBuildingImg.jpeg" alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-t from-white/90 via-[#FDFBF7]/80 to-[#FDFBF7]/40" />
        </div>
      )}

      {/* Header - Hidden when floor is selected */}
      {!selectedFloor && (
        <header className="px-4 lg:px-6 py-6 lg:py-8 flex justify-between items-center z-30 relative shrink-0">
          <div className="flex-1"></div>
          <div className="flex flex-col items-center justify-center cursor-pointer" onClick={closeDetailView}>
            <h2 className="text-xs lg:text-sm font-semibold tracking-widest text-zinc-800 uppercase mb-1">CCI Projects</h2>
            <h1 className="text-xl lg:text-3xl font-light tracking-[0.2em] text-black text-center">RIVALI PARK</h1>
            <p className="text-[10px] lg:text-xs tracking-widest text-zinc-500 uppercase mt-1">Borivali East, Mumbai</p>
          </div>
          <div className="flex-1 flex justify-end">
            <h2 className="text-lg font-semibold tracking-widest text-zinc-800 uppercase hidden md:block">CCI Projects</h2>
          </div>
        </header>
      )}

      <main className={`flex-1 relative flex overflow-hidden z-10 w-full ${selectedFloor ? 'p-2 lg:p-4' : 'px-4 pb-20 lg:pb-4'}`}>
        <AnimatePresence mode="wait">

          {/* HOME VIEW: Full Building Interactive */}
          {!selectedFloor && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute inset-0 flex items-center justify-center w-full h-full pb-16 lg:pb-20"
            >
              <div className="w-full max-w-lg lg:max-w-2xl h-[70vh] lg:h-[80vh]">
                <Building
                  floors={buildingFloors}
                  hoveredFloor={hoveredFloor}
                  selectedFloor={selectedFloor}
                  onHover={setHoveredFloor}
                  onClick={handleFloorClick}
                  isSmall={false}
                />
              </div>
            </motion.div>
          )}

          {/* DETAIL / COMPARE VIEW */}
          {selectedFloor && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-6 lg:px-8 py-2 lg:py-4 overflow-y-auto lg:overflow-hidden"
            >

              {/* Left Side: Floor Plans */}
              <div className="flex-1 flex flex-col gap-4 pr-0 lg:pr-2 min-h-min lg:min-h-0 lg:overflow-y-auto w-full">

                {/* Header Controls for Detail View */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200 pb-4 shrink-0 gap-4 md:gap-0 sticky top-0 bg-[#FDFBF7] z-20 pt-2 lg:pt-0">
                  <h2 className="text-xl lg:text-2xl font-light uppercase tracking-wider text-black">
                    {compareMode && compareFloor
                      ? <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span>COMPARING</span> <span className="font-semibold text-[#C8A05B]">FLOOR {selectedFloor} TO {compareFloor}</span></span>
                      : `${selectedFloorData?.name} PLAN`}
                  </h2>
                  <div className="flex items-center gap-2 lg:gap-4 self-end md:self-auto">
                    <button
                      onClick={toggleCompareMode}
                      className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-full transition-all text-xs lg:text-sm font-medium tracking-wide shadow-sm border ${compareMode ? 'bg-[#C8A05B] text-white border-[#C8A05B]' : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200'}`}
                    >
                      <GitCompare className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">{compareMode ? 'Cancel Compare' : 'Compare Unique Layouts'}</span>
                      <span className="sm:hidden">{compareMode ? 'Cancel' : 'Compare'}</span>
                    </button>
                    <button
                      onClick={closeDetailView}
                      className="p-2 lg:p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors shadow-md shrink-0"
                    >
                      <X className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>

                {/* Floor Plan Content Grid */}
                <div className={`flex flex-col lg:flex-row gap-4 lg:gap-6 pt-2 lg:pt-4 w-full h-auto lg:h-full lg:min-h-0 ${compareMode ? '' : 'max-w-4xl mx-auto'}`}>

                  {/* Primary Floor Plan */}
                  <div className={`flex flex-col bg-white rounded-xl border border-[#E5E0D8] shadow-sm overflow-hidden p-4 lg:p-6 relative min-h-100 lg:min-h-125 ${compareMode ? 'w-full lg:w-1/2' : 'w-full h-full'}`}>
                    <div className="absolute top-4 lg:top-6 left-4 lg:left-6 inline-flex px-2 lg:px-3 py-1 bg-[#C8A05B] text-white text-[10px] lg:text-xs font-semibold tracking-wider rounded z-10">
                      {selectedFloorData?.type}
                    </div>
                    {selectedFloorData && (
                      <FloorPlan type={selectedFloorData.type} pdfPage={selectedFloorData.pdfPage} className="w-full flex-1 mt-6 lg:mt-8 min-h-75" />
                    )}
                  </div>

                  {/* Secondary Floor Plan (Comparison) */}
                  {compareMode && (
                    <AnimatePresence mode="wait">
                      {compareFloorData ? (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="w-full lg:w-1/2 flex flex-col bg-white rounded-xl border border-emerald-200 shadow-sm overflow-hidden p-4 lg:p-6 relative min-h-100 lg:min-h-125"
                        >
                          <div className="absolute top-4 lg:top-6 left-4 lg:left-6 inline-flex px-2 lg:px-3 py-1 bg-emerald-600 text-white text-[10px] lg:text-xs font-semibold tracking-wider rounded z-10">
                            {compareFloorData.type}
                          </div>
                          <FloorPlan type={compareFloorData.type} pdfPage={compareFloorData.pdfPage} className="w-full flex-1 mt-6 lg:mt-8 min-h-75" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200 text-zinc-400 p-6 lg:p-8 text-center min-h-62.5 lg:min-h-0"
                        >
                          <p className="text-base lg:text-lg font-medium text-zinc-600 mb-1 lg:mb-2">Select a different floor layout</p>
                          <p className="text-xs lg:text-sm max-w-sm">Tap on the building navigator to select a floor with a unique layout to compare against {selectedFloorData?.name}.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                </div>

              </div>

              {/* Right Side: Building Navigator Sidebar */}
              <div className="w-full lg:w-80 shrink-0 flex flex-col items-center bg-white rounded-xl border border-[#E5E0D8] shadow-sm p-3 lg:p-4 mb-4 lg:mb-0 h-auto lg:h-full lg:max-h-[85vh] overflow-y-auto relative z-10">
                <div className="w-full h-[45vh] lg:h-[60vh] lg:flex-1 relative flex items-center justify-center shrink-0 min-h-[40vh]">
                  <Building
                    floors={buildingFloors}
                    hoveredFloor={hoveredFloor}
                    selectedFloor={compareMode && !compareFloor ? null : (compareMode ? compareFloor : selectedFloor)}
                    onHover={setHoveredFloor}
                    onClick={handleFloorClick}
                    isSmall={true}
                  />
                </div>
                {/* Details Card */}
                <div className="w-full mt-4 bg-zinc-50 rounded-lg p-3 lg:p-5 border border-zinc-100 text-center shrink-0">
                  <h3 className="font-medium text-zinc-800 mb-2 lg:mb-3 uppercase tracking-wider text-xs lg:text-sm">Unit Details</h3>
                  <div className="flex justify-between items-center text-xs lg:text-sm mb-1.5 lg:mb-2">
                    <span className="text-zinc-500">Area</span>
                    <span className="font-semibold text-zinc-900">{selectedFloorData?.area}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs lg:text-sm mb-1.5 lg:mb-2">
                    <span className="text-zinc-500">Bedrooms</span>
                    <span className="font-semibold text-zinc-900">{selectedFloorData?.bedrooms || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs lg:text-sm">
                    <span className="text-zinc-500">View</span>
                    <span className="bg-zinc-600 text-white text-[9px] lg:text-[10px] uppercase font-bold px-1.5 lg:px-2 py-0.5 rounded">Panoramic</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation - Hidden when floor is selected */}
      {!selectedFloor && (
        <div className="fixed bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-md rounded-full px-4 lg:px-8 py-3 lg:py-4 flex items-center gap-4 lg:gap-8 z-50 shadow-2xl border border-zinc-700 w-max max-w-[95vw] overflow-x-auto no-scrollbar">
          <button className="text-zinc-300 hover:text-white transition-colors"><Home className="w-4 h-4 lg:w-5 lg:h-5" /></button>
          <button className="text-zinc-300 hover:text-white transition-colors"><Calendar className="w-4 h-4 lg:w-5 lg:h-5" /></button>
          <button className="text-zinc-300 hover:text-white transition-colors"><Camera className="w-4 h-4 lg:w-5 lg:h-5" /></button>
          <button className="text-zinc-300 hover:text-white transition-colors"><ImageIcon className="w-4 h-4 lg:w-5 lg:h-5" /></button>
          <button className="text-white bg-white/10 p-1.5 lg:p-2 rounded-lg lg:rounded-xl transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)]"><Map className="w-4 h-4 lg:w-5 lg:h-5" /></button>
          <button className="text-zinc-300 hover:text-white transition-colors"><Video className="w-4 h-4 lg:w-5 lg:h-5" /></button>
          <button className="text-zinc-300 hover:text-white transition-colors"><FileText className="w-4 h-4 lg:w-5 lg:h-5" /></button>
        </div>
      )}

    </div>
  );
}

