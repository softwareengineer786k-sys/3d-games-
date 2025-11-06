
import React from 'react';
import type { Mission } from '../types';

interface MissionBriefingProps {
  mission: Mission | null;
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-400"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-400 delay-200"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-400 delay-400"></div>
    <span className="ml-2">Contacting Nexus Command...</span>
  </div>
);

const InfoRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="py-2 border-b border-gray-700/50">
    <p className="text-sm text-cyan-400 font-orbitron uppercase tracking-widest">{label}</p>
    <p className="text-lg text-gray-200">{value}</p>
  </div>
);

export const MissionBriefing: React.FC<MissionBriefingProps> = ({ mission, isLoading, error, onGenerate }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col min-h-[300px]">
      <h2 className="text-2xl font-bold text-white mb-4 font-orbitron border-b-2 border-cyan-500 pb-2">Mission Briefing</h2>
      <div className="flex-grow">
        {isLoading && <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>}
        {error && <div className="text-red-400 bg-red-900/50 p-4 rounded text-center h-full flex items-center justify-center">{error}</div>}
        {mission && !isLoading && (
          <div className="space-y-3 animate-fade-in">
            <InfoRow label="Codename" value={mission.title} />
            <InfoRow label="Location" value={mission.location} />
            <InfoRow label="Objective" value={mission.objective} />
            <InfoRow label="Reward" value={`§ ${mission.reward.toLocaleString()}`} />
          </div>
        )}
        {!mission && !isLoading && !error && (
            <div className="text-gray-400 text-center h-full flex items-center justify-center">
                <p>Awaiting new orders from Command. Press the button below to get your next assignment.</p>
            </div>
        )}
      </div>
      <button 
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-6 w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 font-orbitron uppercase tracking-wider shadow-lg shadow-cyan-500/20"
      >
        {isLoading ? 'GENERATING...' : 'GENERATE MISSION'}
      </button>
    </div>
  );
};
