import { Brain } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function GameSetup({ onStart }) {
      const { t, language, setLanguage } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-100 p-6">
      <div className=" flex gap-4">
        <h1 className=" flex items-center justify-center gap-4 text-3xl font-bold text-slate-800"><Brain className="text-pink-400 w-8 h-8"/> {t("home_page_title")}</h1>
            <button
            onClick={() => setLanguage("tr")}
            disabled={language === "tr"}
            className={`px-2 py-1 rounded ${
              language === "tr" ? "bg-black text-white font-bold" : "bg-transparent"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLanguage("en")}
            disabled={language === "en"}
            className={`px-2 py-1 rounded ${
              language === "en" ? "bg-black text-white font-bold" : "bg-transparent"
            }`}
          >
            EN
          </button>
          </div>
      <div className="flex flex-col gap-4 w-64">
        <label className="font-medium">{t("playerCount")}</label>
        <select
          className="p-2 rounded border"
          onChange={(e) => onStart((prev) => ({ ...prev, players: parseInt(e.target.value) }))}
        >
          <option value="1">{t("singlePlayer")}</option>
          <option value="2">{t("twoPlayers")}</option>
        </select>

        <label className="font-medium mt-4">{t("gridSize")}</label>
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
          {t("startGame")}
        </button>
      </div>
    </div>
  );
}
