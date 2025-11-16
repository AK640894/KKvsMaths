
import React from 'react';

interface ControlPanelProps {
  onCheckAnswer: () => void;
  isCheckingDisabled: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onCheckAnswer, isCheckingDisabled }) => {
  return (
    <div className="w-full flex justify-center py-4">
      <button
        onClick={onCheckAnswer}
        disabled={isCheckingDisabled}
        className="px-12 py-4 text-2xl font-black text-white bg-green-600 rounded-full shadow-lg border-4 border-green-400
                   hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:border-gray-400
                   transition transform hover:scale-110 active:scale-100"
      >
        Check Answer!
      </button>
    </div>
  );
};

export default ControlPanel;
