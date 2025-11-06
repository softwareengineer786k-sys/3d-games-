import React, { useState, useCallback } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { LobbyScreen } from './components/LobbyScreen';

function App() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleLogin = useCallback((username: string) => {
    if (username) {
      setUser({ username });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black bg-opacity-80 backdrop-blur-sm flex flex-col">
      {!user ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <LobbyScreen user={user} />
      )}
    </div>
  );
}

export default App;