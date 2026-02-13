
import React from 'react';

interface BalloonProps {
  scale: number;
}

export const Balloon: React.FC<BalloonProps> = ({ scale }) => {
  return (
    <div 
      className="relative flex items-center justify-center wobble-anim"
      style={{ 
        transform: `scale(${scale})`,
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      {/* Balloon String */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 h-24 w-1 bg-gray-800 origin-top rotate-2"></div>
      
      {/* Balloon Body */}
      <div className="w-32 h-40 bg-gradient-to-tr from-red-600 via-red-500 to-red-300 rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] shadow-2xl relative border-4 border-red-700">
        {/* Shine */}
        <div className="absolute top-4 left-6 w-8 h-12 bg-white/30 rounded-full blur-sm"></div>
        
        {/* Face (funny/easter egg style) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex gap-4 mb-2">
            <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
          </div>
          <div className="w-8 h-4 border-b-4 border-black rounded-full"></div>
        </div>
      </div>
      
      {/* Balloon Knot */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 bg-red-700 rounded-sm"></div>
    </div>
  );
};
