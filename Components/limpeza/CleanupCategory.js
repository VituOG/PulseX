import React from "react";

export default function CleanupCategory({ title, description, icon: Icon, size, selected, onToggle, color }) {
	return (
		<button onClick={onToggle} className={`w-full text-left bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/5 ${selected ? "ring-1 ring-pink-500/40" : ""}`}>
			<div className="flex items-center gap-4">
				<div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${color}`}>
					{Icon ? <Icon className="w-6 h-6 text-white" /> : null}
				</div>
				<div className="flex-1">
					<div className="text-white font-medium">{title}</div>
					<div className="text-sm text-gray-400">{description}</div>
				</div>
				<div className="text-right">
					<div className="text-xl font-bold text-pink-400">{size} MB</div>
					<div className="text-xs text-gray-500">{selected ? "Selecionado" : "Toque para selecionar"}</div>
				</div>
			</div>
		</button>
	);
}


