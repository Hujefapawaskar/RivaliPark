import React from 'react';
import { motion } from 'motion/react';
import { FloorData } from '../data/floors';

interface BuildingProps {
  floors: FloorData[];
  hoveredFloor: number | null;
  selectedFloor: number | null;
  onHover: (level: number | null) => void;
  onClick: (level: number) => void;
  isSmall?: boolean;
}

export const Building: React.FC<BuildingProps> = ({
  floors,
  hoveredFloor,
  selectedFloor,
  onHover,
  onClick,
  isSmall = false,
}) => {
  return (
    <div className={`relative flex items-center justify-center ${isSmall ? 'h-[40vh] lg:h-[70vh] w-auto aspect-[10/16]' : 'h-full w-full'}`}>
      <img src="/mainBuildingImg.jpeg" alt="Cliff Tower" className="w-full h-full object-cover object-center rounded-2xl shadow-xl border border-zinc-200" />

      {/* Floor Hitboxes Overlay */}
      {/* approximate the tower's bounds in the image to place our interactive hitboxes */}
      <div className="absolute top-[20%] bottom-[15%] left-[45%] w-[35%] -translate-x-1/2 flex flex-col items-center justify-between z-10 group">
        {floors.map((floor) => {
          const isHovered = hoveredFloor === floor.level;
          const isSelected = selectedFloor === floor.level;

          return (
            <div
              key={floor.level}
              className={`w-full flex-1 cursor-pointer flex items-center justify-center relative transition-colors duration-200
                ${isSelected ? 'bg-amber-500/60 ring-2 ring-amber-500 rounded-sm z-20' : isHovered ? 'bg-black/40 rounded-sm z-10' : 'bg-transparent'}
                hover:bg-black/30
              `}
              onMouseEnter={() => onHover(floor.level)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(floor.level)}
            >
              {/* Floor Number Indicator (Right side) */}
              {(isSelected || (isSmall && isHovered)) && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`absolute left-full ml-3 text-xs font-bold px-2.5 py-1 rounded shadow-md z-30 whitespace-nowrap 
                    ${isSelected ? 'bg-amber-500 text-black' : 'bg-white text-black border border-zinc-200'}`}
                >
                  Floor {floor.level}
                  <div className={`absolute top-1/2 -left-1 w-2 h-2 transform -translate-y-1/2 rotate-45 ${isSelected ? 'bg-amber-500' : 'bg-white border-b border-l border-zinc-200'}`} />
                </motion.div>
              )}

            </div>
          );
        })}
      </div>

      {/* Fixed Huge Floor Number Display */}
      {!isSmall && (hoveredFloor !== null || selectedFloor !== null) && (
        <div className="absolute left-[5%] lg:left-[10%] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 pointer-events-none z-0 shadow-2xl transition-all duration-300">
          <motion.div
            key={hoveredFloor ?? selectedFloor}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white font-light text-8xl lg:text-[120px] leading-none select-none opacity-90"
          >
            {hoveredFloor ?? selectedFloor}
          </motion.div>
        </div>
      )}
    </div>
  );
};

