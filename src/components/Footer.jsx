import { ArrowLeftRight, Hourglass } from "lucide-react";

export default function Footer({ time, moves }) {
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <footer className="flex flex-col md:flex-row justify-between gap-4 mt-6">
      <div className="bg-slate-200 rounded-lg p-4 text-center flex-1">
        <p className=" flex items-center justify-center gap-2 text-xl font-semibold text-slate-600"> <Hourglass/>Time</p>
        <p className="text-2xl font-bold text-slate-800 ">{formatTime(time)}</p>
      </div>
      <div className=" bg-slate-200 rounded-lg p-4 text-center flex-1">
        <p className=" flex items-center justify-center gap-2 text-xl font-semibold text-slate-600"><ArrowLeftRight/> Moves</p>
        <p className="text-2xl font-bold text-slate-800">{moves}</p>
      </div>
    </footer>
  );
}
