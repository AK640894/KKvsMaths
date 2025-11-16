import React, { useEffect, useRef, useState } from 'react';
import { Sticker } from '../types';

interface RewardModalProps {
  isLoading: boolean;
  sticker: Sticker | null;
  onCollect: () => void;
  onNextMission: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ isLoading, sticker, onCollect, onNextMission }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    if (sticker && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create a space rock texture
        const width = canvas.width;
        const height = canvas.height;
        ctx.fillStyle = '#6b7280'; // gray-500
        ctx.fillRect(0, 0, width, height);

        // Add some craters
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const radius = Math.random() * 15 + 5;
          const alpha = Math.random() * 0.5 + 0.2;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.fill();
        }
      }
    }
  }, [sticker]);

  const getScratchCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = 'touches' in e && e.touches[0];
    const x = touch ? touch.clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = touch ? touch.clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    return { x, y };
  };

  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    const coords = getScratchCoordinates(e);
    if (!coords || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 30, 0, Math.PI * 2, false);
    ctx.fill();
  };
  
  const startScratching = (e: React.MouseEvent | React.TouchEvent) => {
    setIsScratching(true);
    handleScratch(e);
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    handleScratch(e);
  };

  const stopScratching = () => {
    setIsScratching(false);
  };

  const handleCollectClick = () => {
    onCollect();
    setIsCollected(true);
    // Reveal the full sticker
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-800 to-indigo-900 p-6 md:p-8 rounded-2xl border-2 border-purple-400 shadow-2xl shadow-purple-500/40 text-center w-11/12 max-w-md flex flex-col items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-yellow-300">Sticker Found!</h2>
        <p className="text-lg text-purple-200">Scratch the space rock to reveal your prize!</p>
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
          {isLoading && <div className="text-white">Generating your sticker...</div>}
          {sticker && (
            <>
              <img src={sticker.imageData} alt="New Sticker" className="absolute inset-0 w-full h-full object-cover z-0" />
              <canvas 
                ref={canvasRef} 
                width={320} 
                height={320}
                className="absolute inset-0 w-full h-full z-10 cursor-pointer"
                onMouseDown={startScratching}
                onMouseMove={scratch}
                onMouseUp={stopScratching}
                onMouseLeave={stopScratching}
                onTouchStart={startScratching}
                onTouchMove={scratch}
                onTouchEnd={stopScratching}
              />
            </>
          )}
        </div>
        
        {isCollected ? (
            <button 
                onClick={onNextMission} 
                className="w-full mt-4 px-8 py-3 text-xl font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105"
            >
                Next Mission
            </button>
        ) : (
            <button 
                onClick={handleCollectClick} 
                disabled={!sticker || isLoading}
                className="w-full mt-4 px-8 py-3 text-xl font-bold text-gray-900 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-400 transition transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Collect Sticker
            </button>
        )}
      </div>
    </div>
  );
};

export default RewardModal;
