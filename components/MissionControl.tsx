
import React from 'react';
import { Mission } from '../types';

interface MissionControlProps {
  mission: Mission;
  gameState: 'playing' | 'correct' | 'incorrect';
}

const MissionControl: React.FC<MissionControlProps> = ({ mission, gameState }) => {
  const getGameStateContent = () => {
    switch (gameState) {
      case 'correct':
        return <span className="text-green-400 animate-bounce">Great Job, Commander!</span>;
      case 'incorrect':
        return <span className="text-red-400 animate-shake">Oops! Try again!</span>;
      case 'playing':
      default:
        return mission.text;
    }
  };

  return (
    <div className="w-full max-w-2xl text-center bg-black/40 p-4 rounded-xl border border-cyan-300/30 shadow-lg">
      <h2 className="text-xl md:text-3xl font-bold text-cyan-200">
        {getGameStateContent()}
      </h2>
    </div>
  );
};

export default MissionControl;
