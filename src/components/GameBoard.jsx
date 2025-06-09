import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Goal, PartyPopper, PersonStanding, Repeat, Timer, Trophy } from "lucide-react";

const allEmojis = [
  "🍎", "🍌", "🍇", "🍓", "🍉", "🥝", "🍒", "🍑",
  "🍍", "🥥", "🥭", "🍋", "🫐", "🍈", "🍅", "🌽",
  "🥕", "🍆"
];

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function GameBoard({ players, gridSize }) {
  const totalCards = gridSize * gridSize;
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [turn, setTurn] = useState(1); 
  const [score, setScore] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    const selected = allEmojis.slice(0, totalCards / 2);
    const doubled = [...selected, ...selected];
    const shuffled = shuffle(doubled).map((emoji, index) => ({
      id: index,
      emoji,
    }));
    setCards(shuffled);
  }, [gridSize]);

  useEffect(() => {
    let interval;
    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setGameOver(true);
      setIsRunning(false);
    }
  }, [matched, cards]);

  const handleFlip = (card) => {
    if (!isRunning) setIsRunning(true);
    if (flipped.length === 2 || flipped.some((c) => c.id === card.id)) return;

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      if (newFlipped[0].emoji === newFlipped[1].emoji) {
        setMatched((prev) => [...prev, newFlipped[0].id, newFlipped[1].id]);

        if (players === 2) {
          setScore((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));
        }

        setTimeout(() => setFlipped([]), 800);
      } else {
        if (players === 2) {
          setTimeout(() => {
            setTurn(turn === 1 ? 2 : 1);
            setFlipped([]);
          }, 800);
        } else {
          setTimeout(() => setFlipped([]), 800);
        }
      }
    }
  };

  const handleRestart = () => {
    const selected = allEmojis.slice(0, totalCards / 2);
    const doubled = [...selected, ...selected];
    const shuffled = shuffle(doubled).map((emoji, index) => ({
      id: index,
      emoji,
    }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setGameOver(false);
    setIsRunning(false);
    setTurn(1);
    setScore({ 1: 0, 2: 0 });
  };

  const handleNewGame = () => window.location.reload(); 

  const isFlipped = (id) => flipped.some((c) => c.id === id) || matched.includes(id);

  return (
    <>
      <Header onRestart={handleRestart} onNewGame={handleNewGame} />

      {players === 2 && (
        <div className="text-center mb-4 font-medium">
            <p className="flex items-center justify-center gap-2">Sıra: Oyuncu {turn} | <Goal className="text-red-700"/>  Skor: <PersonStanding className="text-indigo-500"/> {score[1]}  <PersonStanding/> {score[2]}</p>
        </div>
      )}

      <main
        className={`grid grid-cols-${gridSize} gap-3 md:gap-5 max-w-screen-sm mx-auto mb-10`}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleFlip(card)}
            className={`flex items-center justify-center rounded-xl text-2xl md:text-4xl cursor-pointer select-none aspect-square transition duration-300 ${
              isFlipped(card.id)
                ? "bg-white border-2 border-slate-300"
                : "bg-blue-300 hover:bg-blue-400"
            }`}
          >
            {isFlipped(card.id) ? card.emoji : ""}
          </div>
        ))}
      </main>

      <Footer time={time} moves={moves} />

      {gameOver && (
        <div className=" flex flex-col mt-6 p-4 bg-green-100 text-green-800 rounded-xl text-center font-medium">
            <p className="flex items-center justify-center gap-2"> <PartyPopper/> Oyun Bitti!</p>
            <p className="flex items-center justify-center gap-2"> <Timer/> Süre : {time} saniye</p>
            <p className="flex items-center justify-center gap-2"> <Repeat/> Hamle: {moves}</p>
          {players === 2 && (
            <>
              <br />
              <p className="flex items-center justify-center gap-2"><Trophy/> Kazanan:{" "}</p>
              {score[1] === score[2]
                ? "Berabere!"
                : score[1] > score[2]
                ? "Oyuncu 1"
                : "Oyuncu 2"}
            </>
          )}
        </div>
      )}
    </>
  );
}
