import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-gray-800/60 backdrop-blur-md p-8 rounded-lg border border-gray-700 shadow-lg text-center animate-fade-in">
        <h1 className="text-4xl font-black text-white font-orbitron tracking-widest mb-2">
          <span className="text-cyan-400">GEMINI</span> FIREFIGHT
        </h1>
        <p className="text-gray-400 mb-8">Enter your callsign to connect.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your callsign"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            aria-label="Username"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 font-orbitron uppercase tracking-wider shadow-lg shadow-cyan-500/20"
          >
            Connect
          </button>
        </form>
        <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <button
            onClick={() => onLogin('Spectre')}
            className="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="#FBBC05"/><path fillRule="evenodd" clipRule="evenodd" d="M9.82023 24.0001C9.82023 22.793 10.0809 21.6315 10.5516 20.5721L4.82178 16.5235C3.62029 18.784 3 21.3218 3 24.0001C3 26.6784 3.62029 29.2162 4.82178 31.4767L10.5516 27.4281C10.0809 26.3687 9.82023 25.2072 9.82023 24.0001Z" fill="#EA4335"/><path fillRule="evenodd" clipRule="evenodd" d="M24 9.5C26.5132 9.5 28.7183 10.384 30.4379 11.9549L35.2443 7.14853C32.3219 4.54228 28.4716 3 24 3C18.3567 3 13.3867 6.13061 11.232 10.7107L16.993 14.7171C18.0673 11.7258 20.7816 9.5 24 9.5Z" fill="#34A853"/><path fillRule="evenodd" clipRule="evenodd" d="M16.993 33.2829L11.232 37.2893C13.3867 41.8694 18.3567 45 24 45C28.4716 45 32.3219 43.4577 35.2443 40.8515L30.4379 36.0451C28.7183 37.616 26.5132 38.5 24 38.5C20.7816 38.5 18.0673 36.2742 16.993 33.2829Z" fill="#4285F4"/></svg>
            Connect with Google
        </button>
      </div>
    </div>
  );
};