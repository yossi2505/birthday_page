
import React from 'react';

interface SuccessViewProps {
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onReset }) => {
  return (
    <div className="z-20 flex flex-col items-center justify-center animate-[scale-in_0.5s_ease-out]">
      <div className="text-center mb-6">
        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight animate-bounce">
          מזל טוב <span className="text-pink-600 block sm:inline">אופק!!!</span>
        </h1>
        <p className="text-2xl font-bold text-pink-700 bg-white inline-block px-6 py-3 mt-4 rounded-full transform -rotate-2 shadow-2xl border-4 border-pink-200">
          יום הולדת שמח יא מלכה! 👑✨
        </p>
      </div>

      {/* Dancing Cat GIF */}
      <div className="relative mb-8 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl rotate-3">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h6ajJ5N3BwdzJ4enB6ejJ5N3BwdzJ4enB6ejJ5N3BwdzJ4enB6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/GeimqsH0TLDt4tScGw/giphy.gif" 
          alt="Dancing Cat" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent"></div>
      </div>

      <button 
        onClick={onReset}
        className="group relative px-12 py-6 bg-pink-500 hover:bg-pink-600 text-white text-3xl font-black rounded-3xl shadow-[0_12px_0_rgb(190,24,93)] active:shadow-none active:translate-y-[12px] transition-all"
      >
        עוד פעם! 🎀
        <span className="absolute -top-4 -right-4 text-4xl group-hover:rotate-12 transition-transform">💅</span>
      </button>

      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
