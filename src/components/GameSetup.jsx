import { Brain } from "lucide-react";

export default function GameSetup({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-100 p-6">
      <h1 className=" flex items-center justify-center gap-4 text-3xl font-bold text-slate-800"><Brain className="text-pink-400 w-8 h-8"/> Memory Game</h1>

      <div className="flex flex-col gap-4 w-64">
        <label className="font-medium">Oyuncu Sayısı</label>
        <select
          className="p-2 rounded border"
          onChange={(e) => onStart((prev) => ({ ...prev, players: parseInt(e.target.value) }))}
        >
          <option value="1">Tek Oyuncu</option>
          <option value="2">İki Oyuncu</option>
        </select>

        <label className="font-medium mt-4">Kart Boyutu</label>
        <select
          className="p-2 rounded border"
          onChange={(e) => onStart((prev) => ({ ...prev, gridSize: parseInt(e.target.value) }))}
        >
          <option value="4">4 x 4</option>
          <option value="6">6 x 6</option>
        </select>

        <button
          onClick={() => onStart((prev) => ({ ...prev, ready: true }))}
          className="mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Oyuna Başla
        </button>
      </div>
    </div>
  );
}
