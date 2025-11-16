import React from 'react';
import { BookIcon, PaintBrushIcon } from './Icons';

interface HeaderProps {
  onAlbumClick: () => void;
  stickerCount: number;
  theme: string;
  setTheme: (theme: string) => void;
  themeOptions: { value: string; label: string }[];
}

const Header: React.FC<HeaderProps> = ({ onAlbumClick, stickerCount, theme, setTheme, themeOptions }) => {
  return (
    <header className="w-full flex justify-between items-center px-2 md:px-4 py-2 bg-black/30 rounded-t-xl border-b-2 border-cyan-400/30">
      <h1 className="text-2xl md:text-4xl font-black tracking-wider text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
        Kushank-Kanishka vs Maths
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
            <PaintBrushIcon className="w-6 h-6 text-purple-300 absolute left-3 pointer-events-none" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="pl-10 pr-4 py-2 text-white bg-purple-900/50 border-2 border-purple-400/50 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none appearance-none cursor-pointer"
            >
              {themeOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-purple-900">
                  {option.label}
                </option>
              ))}
            </select>
        </div>
        <button
          onClick={onAlbumClick}
          className="relative flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition transform hover:scale-105"
        >
          <BookIcon className="w-6 h-6" />
          <span className="hidden sm:inline">Stickers</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            {stickerCount}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;