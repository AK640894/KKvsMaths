
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mission, MissionType, Sticker } from './types';
import { generateNewMission } from './utils/missionGenerator';
import { STICKER_PROMPT_SUBJECTS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateStickerImage } from './services/geminiService';
import Header from './components/Header';
import MissionControl from './components/MissionControl';
import NumberLine from './components/NumberLine';
import ControlPanel from './components/ControlPanel';
import RewardModal from './components/RewardModal';
import StickerAlbumModal from './components/StickerAlbumModal';
import { StarField } from './components/StarField';

const App: React.FC = () => {
  const [stickers, setStickers] = useLocalStorage<Sticker[]>('arithme-rocket-stickers', []);
  const [unlockedThemes, setUnlockedThemes] = useLocalStorage<string[]>('arithme-rocket-themes', ['bg-blue-900/50']);
  const [currentTheme, setCurrentTheme] = useState<string>(unlockedThemes[unlockedThemes.length - 1]);
  const [mission, setMission] = useState<Mission>(generateNewMission());
  const [rocketPosition, setRocketPosition] = useState<number>(mission.operands[0]);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'incorrect'>('playing');
  const [isAlbumOpen, setIsAlbumOpen] = useState<boolean>(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState<boolean>(false);
  const [newSticker, setNewSticker] = useState<Sticker | null>(null);
  const [isGeneratingSticker, setIsGeneratingSticker] = useState<boolean>(false);
  
  const handleCheckAnswer = useCallback(() => {
    if (rocketPosition === mission.answer) {
      setGameState('correct');
      setIsRewardModalOpen(true);
      setIsGeneratingSticker(true);
      const randomSubject = STICKER_PROMPT_SUBJECTS[Math.floor(Math.random() * STICKER_PROMPT_SUBJECTS.length)];
      generateStickerImage(randomSubject).then(imageData => {
        if (imageData) {
          const newStickerData: Sticker = {
            id: Date.now().toString(),
            imageData: `data:image/png;base64,${imageData}`,
            prompt: randomSubject
          };
          setNewSticker(newStickerData);
        }
      }).finally(() => setIsGeneratingSticker(false));

    } else {
      setGameState('incorrect');
      setTimeout(() => setGameState('playing'), 1500);
    }
  }, [rocketPosition, mission.answer]);

  const handleCollectSticker = useCallback(() => {
    if (newSticker) {
      const updatedStickers = [...stickers, newSticker];
      setStickers(updatedStickers);

      if(updatedStickers.length % 5 === 0) {
        const newTheme = `bg-${['green', 'purple', 'red', 'yellow'][Math.floor(Math.random()*4)]}-900/50`;
        const updatedThemes = [...unlockedThemes, newTheme];
        setUnlockedThemes(updatedThemes);
        setCurrentTheme(newTheme);
      }
    }
  }, [newSticker, stickers, setStickers, unlockedThemes, setUnlockedThemes]);

  const handleNextMission = useCallback(() => {
    setIsRewardModalOpen(false);
    setNewSticker(null);
    const newMission = generateNewMission();
    setMission(newMission);
    setRocketPosition(newMission.operands[0]);
    setGameState('playing');
  }, []);

  const themeOptions = useMemo(() => {
    return unlockedThemes.map(themeClass => ({
      value: themeClass,
      label: `${themeClass.split('-')[1].charAt(0).toUpperCase() + themeClass.split('-')[1].slice(1)} Space`
    }));
  }, [unlockedThemes]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-900 overflow-hidden font-sans">
      <StarField />
      <div className={`relative z-10 w-full max-w-4xl h-[90vh] max-h-[700px] bg-black bg-opacity-50 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col p-4 md:p-6 transition-colors duration-500 ${currentTheme}`}>
        <Header 
          onAlbumClick={() => setIsAlbumOpen(true)} 
          stickerCount={stickers.length}
          theme={currentTheme}
          setTheme={setCurrentTheme}
          themeOptions={themeOptions}
        />
        <main className="flex-grow flex flex-col items-center justify-center gap-6 md:gap-10 mt-4">
          <MissionControl mission={mission} gameState={gameState} />
          <NumberLine 
            startPosition={mission.operands[0]}
            rocketPosition={rocketPosition}
            onPositionChange={setRocketPosition}
            isDraggingDisabled={gameState !== 'playing'}
          />
          <ControlPanel 
            onCheckAnswer={handleCheckAnswer} 
            isCheckingDisabled={gameState !== 'playing'} 
          />
        </main>
      </div>
      
      {isRewardModalOpen && (
        <RewardModal 
          isLoading={isGeneratingSticker}
          sticker={newSticker}
          onCollect={handleCollectSticker}
          onNextMission={handleNextMission}
        />
      )}

      {isAlbumOpen && (
        <StickerAlbumModal 
          stickers={stickers} 
          onClose={() => setIsAlbumOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
