import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface FloorPlanProps {
  type: string;
  pdfPage?: number;
  className?: string;
}

export const FloorPlan: React.FC<FloorPlanProps> = ({ type, pdfPage = 1, className = '' }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleReset = () => setScale(1);

  return (
    <div 
      className={`w-full h-full relative overflow-hidden bg-white/50 rounded-xl ${className} flex items-center justify-center p-4`}
      ref={containerRef}
    >
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white/80 backdrop-blur-md p-2 rounded-lg shadow-lg border border-black/5">
        <button 
          onClick={handleZoomIn} 
          className="p-1.5 hover:bg-black/5 rounded-md transition-colors text-black/70 hover:text-black"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button 
          onClick={handleReset} 
          className="p-1.5 hover:bg-black/5 rounded-md transition-colors text-black/70 hover:text-black"
          title="Reset Zoom"
        >
          <Maximize size={20} />
        </button>
        <button 
          onClick={handleZoomOut} 
          className="p-1.5 hover:bg-black/5 rounded-md transition-colors text-black/70 hover:text-black"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
      </div>

      <motion.div
        drag={scale > 1}
        dragConstraints={containerRef}
        animate={{ scale, x: scale === 1 ? 0 : undefined, y: scale === 1 ? 0 : undefined }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full h-full ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        <img
          src={`/floor-plan-page-${pdfPage}.jpeg`}
          alt={`${type} Floor Plan`}
          className="w-full h-full object-contain mix-blend-multiply pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
};
