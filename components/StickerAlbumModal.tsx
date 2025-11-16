
import React from 'react';
import { Sticker } from '../types';
import { CloseIcon } from './Icons';

interface StickerAlbumModalProps {
  stickers: Sticker[];
  onClose: () => void;
}

const StickerAlbumModal: React.FC<StickerAlbumModalProps> = ({ stickers, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 w-full max-w-3xl h-full max-h-[90vh] rounded-2xl border-2 border-yellow-400/50 shadow-2xl shadow-yellow-500/30 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-yellow-400/30">
          <h2 className="text-3xl font-black text-yellow-300">My Sticker Album</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition">
            <CloseIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="flex-grow p-6 overflow-y-auto">
          {stickers.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-400">Your album is empty. Complete missions to earn stickers!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {stickers.map(sticker => (
                <div key={sticker.id} className="aspect-square bg-black/30 rounded-lg p-2 flex items-center justify-center hover:bg-purple-900/50 transition-colors">
                  <img src={sticker.imageData} alt={sticker.prompt} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickerAlbumModal;
