import React, { useState, useCallback } from 'react';
import { CharacterViewer } from './CharacterViewer';
import { MissionBriefing } from './MissionBriefing';
import { StatsDisplay } from './StatsDisplay';
import { ChatSystem } from './ChatSystem';
import { generateMission } from '../services/geminiService';
import type { Mission } from '../types';
import { Header } from './Header';
import { Footer } from './Footer';

interface LobbyScreenProps {
  user: {
    username: string;
  };
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({ user }) => {
  const [mission, setMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateMission = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMission(null);
    try {
      const newMission = await generateMission();
      setMission(newMission);
    } catch (e) {
      setError('Failed to generate mission. The battlefield is quiet... for now.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="h-[60vh] lg:h-[calc(100vh-150px)] w-full rounded-lg border border-teal-500/20 bg-gray-900/50 shadow-2xl shadow-teal-500/10 sticky top-4">
          <CharacterViewer />
        </div>
        <div className="flex flex-col gap-6">
          <StatsDisplay />
          <MissionBriefing 
            mission={mission}
            isLoading={isLoading}
            error={error}
            onGenerate={handleGenerateMission}
          />
          <ChatSystem username={user.username} />
        </div>
      </main>
      <Footer />
    </>
  );
};