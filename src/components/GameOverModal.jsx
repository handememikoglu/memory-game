import { PartyPopper, Repeat, Timer, Trophy, X } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "../LanguageContext";

export default function GameOverModal({ isOpen, onClose, time, moves, winnerText }) {
    const {t} = useLanguage();
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          <X/>
        </button>

        <div className="text-center space-y-4">
          <p className="flex justify-center items-center gap-2 text-green-800 text-xl font-semibold">
            <PartyPopper /> {t("gameOver")}
          </p>
          <p className="flex justify-center items-center gap-2">
            <Timer className="text-gray-600" /> {t("time")}: {time} {t("seconds")}
          </p>
          <p className="flex justify-center items-center gap-2">
            <Repeat className="text-gray-600" /> {t("moves")}: {moves}
          </p>
          <p className="flex justify-center items-center gap-2 font-medium text-lg">
            <Trophy className="text-yellow-600" /> {t("winner")}: {winnerText}
          </p>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            onClick={onClose}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
