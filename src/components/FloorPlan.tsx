import React from 'react';

interface FloorPlanProps {
  type: string;
  pdfPage?: number;
  className?: string;
}

export const FloorPlan: React.FC<FloorPlanProps> = ({ type, pdfPage = 1, className = '' }) => {
  return (
    <div className={`w-full h-full relative overflow-hidden bg-white/50 rounded-xl ${className}`}>
      {/* 
       used an iframe to render the specific page of the PDF.
        toolbar=0, navpanes=0 and view=Fit are standard PDF URL parameters to strip UI.
      */}
      <iframe
        src={`/RivaliPark.pdf#page=${pdfPage}&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
        title={`${type} Floor Plan`}
        className="absolute inset-0 w-full h-[150%] -top-[25%] border-0 opacity-100 mix-blend-multiply pointer-events-auto"
        style={{ transformOrigin: 'top center' }}
      />
    </div>
  );
};

