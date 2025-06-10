import { useState } from 'react';
import './App.css'
import GameBoard from './components/GameBoard'
import GameSetup from './components/GameSetup';
import { useLanguage } from './LanguageContext';

function App() {
  const { t, language, setLanguage } = useLanguage();

  const [gameConfig, setGameConfig] = useState({
    players: 1,
    gridSize: 4,
    ready: false,
  });

 return gameConfig.ready ? (
    <GameBoard players={gameConfig.players} gridSize={gameConfig.gridSize} />
  ) : (
    <GameSetup onStart={setGameConfig} />
  );
}
export default App
