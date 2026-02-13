
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Balloon } from './components/Balloon';
import { ConfettiManager } from './components/ConfettiManager';
import { SuccessView } from './components/SuccessView';

const MAX_CLICKS = 25;
const DEFLATION_INTERVAL = 200; // Much faster deflation (every 200ms)
const DEFLATION_DELAY = 800; // Start deflating after 0.8s of inactivity

const App: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [isPopped, setIsPopped] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isAnimatingNumber, setIsAnimatingNumber] = useState(false);
  const lastClickTime = useRef<number>(Date.now());

  // Background color changes when popped
  const bgColorClass = isPopped ? 'bg-pink-400' : 'bg-yellow-400';

  // Faster Deflation logic
  useEffect(() => {
    if (isPopped) return;

    const timer = setInterval(() => {
      const now = Date.now();
      // Deflate rapidly if user hasn't clicked in the last 0.8 seconds
      if (now - lastClickTime.current > DEFLATION_DELAY) {
        setClicks(prev => Math.max(0, prev - 1));
      }
    }, DEFLATION_INTERVAL);

    return () => clearInterval(timer);
  }, [isPopped]);

  const handleInflate = useCallback(() => {
    if (isPopped) return;
    
    lastClickTime.current = Date.now();
    setIsAnimatingNumber(true);
    // Reset animation state quickly
    setTimeout(() => setIsAnimatingNumber(false), 150);

    setClicks(prev => {
      // Clamp clicks to MAX_CLICKS so we don't go negative on the countdown
      const next = Math.min(prev + 1, MAX_CLICKS);
      if (next >= MAX_CLICKS) {
        setIsExploding(true);
        setTimeout(() => {
          setIsPopped(true);
          setIsExploding(false);
        }, 300);
      }
      return next;
    });
  }, [isPopped]);

  const reset = useCallback(() => {
    setClicks(0);
    setIsPopped(false);
    setIsExploding(false);
  }, []);

  // Ensure remaining is never smaller than zero
  const remaining = Math.max(0, MAX_CLICKS - clicks);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center p-4 overflow-hidden select-none touch-none transition-colors duration-1000 ${bgColorClass}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {!isPopped ? (
        <div className="relative z-10 flex flex-col items-center transition-all duration-300">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-black text-blue-900 mb-4 drop-shadow-lg">הבלון של אופק!</h1>
            
            {/* Prominent responsive countdown number */}
            <div 
              key={remaining}
              className={`text-8xl md:text-9xl font-black text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.3)] select-none ${isAnimatingNumber ? 'number-anim' : ''}`}
            >
              {remaining}
            </div>
          </div>

          <div 
            onClick={handleInflate}
            className={`cursor-pointer transition-transform duration-100 ${isExploding ? 'pop-shake scale-150' : 'active:scale-90'}`}
          >
            <Balloon scale={1 + (clicks * 0.08)} />
          </div>

          <div className="mt-16 text-blue-800 font-bold italic opacity-70 animate-bounce text-center text-lg">
            {clicks > 15 ? "כמעט שם... אל תפסיקי! 🔥" : clicks > 0 ? "הוא בורח! תלחצי מהר! 💨" : "תלחצי עליי חזק! 🎈"}
          </div>
        </div>
      ) : (
        <SuccessView onReset={reset} />
      )}

      {/* Confetti Party when it pops */}
      {isPopped && <ConfettiManager />}
    </div>
  );
};

export default App;
