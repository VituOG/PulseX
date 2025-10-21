import React from "react";
import { X } from "lucide-react";

export default function ProcessItem({ process, onKill }) {
	const { id, name, category, icon, ramUsage, cpuUsage, isRunning } = process;

	return (
		<div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4">
			<div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
				{icon}
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<div className="text-white font-medium">{name}</div>
					<div className="text-xs text-gray-500">{category}</div>
				</div>
				<div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
					<div className="text-gray-400">CPU: <span className="text-pink-400 font-medium">{cpuUsage.toFixed(1)}%</span></div>
					<div className="text-gray-400">RAM: <span className="text-blue-400 font-medium">{ramUsage.toFixed(0)} MB</span></div>
					<div className="hidden md:block text-gray-400">Status: <span className={isRunning ? "text-green-400" : "text-gray-500"}>{isRunning ? "Em execução" : "Encerrado"}</span></div>
				</div>
				<div className="h-2 bg-white/10 rounded-full overflow-hidden mt-3">
					<div className="h-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${Math.max(0, Math.min(100, cpuUsage))}%` }} />
				</div>
			</div>
			<button
				onClick={() => onKill(id)}
				disabled={!isRunning}
				className="px-3 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<X className="w-4 h-4" />
			</button>
		</div>
	);
}


