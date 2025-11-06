
import React from 'react';

const StatBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold font-orbitron ${color}`}>{value}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className={`${color.replace('text-', 'bg-')} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export const StatsDisplay: React.FC = () => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4 font-orbitron border-b-2 border-cyan-500 pb-2">Operative Stats</h2>
      <div className="space-y-4">
        <StatBar label="Health" value={95} color="text-green-400" />
        <StatBar label="Armor" value={80} color="text-blue-400" />
        <StatBar label="Agility" value={92} color="text-yellow-400" />
        <StatBar label="Stealth" value={75} color="text-purple-400" />
      </div>
    </div>
  );
};
