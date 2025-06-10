import { useState } from "react";
import { useLanguage } from "../LanguageContext";

export default function Header({onRestart, onNewGame}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {t} = useLanguage();

  return (
    <header className="flex items-center justify-between gap-4 mb-6 flex-row md:justify-between p-6">
      <h1 className="text-3xl font-bold text-slate-800">MEMORY</h1>

      <div className="hidden md:flex gap-4">
        <button onClick={() => onRestart()} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          {t("restart")}
        </button>
        <button onClick={() => onNewGame()} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
          {t("newGame")}
        </button>
      </div>

      <div className="md:hidden relative">
        <button onClick={() => setMenuOpen((prev) => !prev)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          {t("menu")}
        </button>
        {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-40 z-10">
                <button onClick={() => {setMenuOpen(false); onRestart();}}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-b">
                        {t("restart")}</button>
                <button onClick={() => {setMenuOpen(false); onNewGame();}}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                        {t("newGame")}</button>
            </div>
        )}
      </div>
    </header>
  );
}
