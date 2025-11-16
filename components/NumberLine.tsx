
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { RocketIcon } from './Icons';
import { MAX_NUMBER } from '../constants';

interface NumberLineProps {
  startPosition: number;
  rocketPosition: number;
  onPositionChange: (position: number) => void;
  isDraggingDisabled: boolean;
}

const NumberLine: React.FC<NumberLineProps> = ({ startPosition, rocketPosition, onPositionChange, isDraggingDisabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const numberLineRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  const numbers = Array.from({ length: MAX_NUMBER + 1 }, (_, i) => i);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !numberLineRef.current) return;
    const rect = numberLineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = x / rect.width;
    const newPosition = Math.round(percentage * MAX_NUMBER);
    const clampedPosition = Math.max(0, Math.min(MAX_NUMBER, newPosition));
    onPositionChange(clampedPosition);
  }, [isDragging, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDraggingDisabled) return;
    setIsDragging(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDraggingDisabled) return;
    setIsDragging(true);
  };

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleTouchEnd = useCallback(() => setIsDragging(false), []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const getPositionPercentage = (num: number) => (num / MAX_NUMBER) * 100;

  const rocketStyle = {
    left: `calc(${getPositionPercentage(rocketPosition)}% - 24px)`, // Center rocket
    transition: isDragging ? 'none' : 'left 0.3s ease-in-out',
  };
  
  const trailStyle = {
    left: `${Math.min(getPositionPercentage(startPosition), getPositionPercentage(rocketPosition))}%`,
    width: `${Math.abs(getPositionPercentage(startPosition) - getPositionPercentage(rocketPosition))}%`,
    display: rocketPosition !== startPosition ? 'block' : 'none'
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 py-8 px-4 select-none">
      <div ref={numberLineRef} className="w-full h-4 bg-gray-700 rounded-full relative">
        <div 
          className="absolute h-full bg-orange-500 rounded-full opacity-70"
          style={trailStyle}
        />
        {numbers.map(num => (
          <div key={num} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${getPositionPercentage(num)}%` }}>
            <div className="w-2 h-8 bg-cyan-400 rounded-full -translate-y-1/2"></div>
          </div>
        ))}
         <div
          ref={rocketRef}
          className="absolute -top-12 w-12 h-12 cursor-grab active:cursor-grabbing"
          style={rocketStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <RocketIcon className={`w-full h-full text-red-500 drop-shadow-lg transition-transform duration-200 ${isDragging ? 'scale-125' : 'scale-100'}`} />
        </div>
      </div>
      <div className="w-full flex justify-between px-1">
        {numbers.map(num => (
          <span key={num} className="text-lg md:text-xl font-bold text-cyan-200" style={{ flexBasis: `${100 / (MAX_NUMBER + 1)}%`, textAlign: 'center' }}>
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NumberLine;
