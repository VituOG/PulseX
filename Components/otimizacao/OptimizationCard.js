import React from "react";

export default function OptimizationCard({
	title,
	description,
	icon: Icon,
	color,
	features = [],
	estimatedTime,
	isOptimizing = false,
	onOptimize,
	highlight = false,
}) {
	return (
		<div className={`rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 ${highlight ? "ring-1 ring-pink-500/40" : ""}`}>
			<div className="flex items-start gap-4">
				<div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${color}`}>
					{Icon ? <Icon className="w-6 h-6 text-white" /> : null}
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-white">{title}</h3>
					<p className="text-sm text-gray-400 mb-4">{description}</p>
					<ul className="space-y-2 text-sm text-gray-300 mb-4">
						{features.map((f, i) => (
							<li key={i} className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-white/50" />
								{f}
							</li>
						))}
					</ul>
					<div className="flex items-center justify-between">
						<div className="text-xs text-gray-400">Tempo estimado: {estimatedTime}</div>
						<button
							onClick={onOptimize}
							disabled={isOptimizing}
							className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:opacity-90 disabled:opacity-50"
						>
							{isOptimizing ? "Otimizando..." : "Otimizar"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}


