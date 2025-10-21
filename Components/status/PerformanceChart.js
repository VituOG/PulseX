import React from "react";

export default function PerformanceChart({ data = [] }) {
	if (!Array.isArray(data) || data.length === 0) {
		return (
			<div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-sm text-gray-400">
				Sem dados suficientes para o gráfico.
			</div>
		);
	}

	const maxValue = Math.max(
		...data.map((d) => Math.max(d.cpu ?? 0, d.memory ?? 0))
	);
	const safeMax = Math.max(100, Math.ceil(maxValue / 10) * 10);

	return (
		<div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
			<div className="text-sm text-gray-400 mb-3">Histórico de Performance (CPU vs RAM)</div>
			<div className="relative h-40 w-full">
				{/* grid */}
				<div className="absolute inset-0 grid grid-rows-4">
					{[0, 1, 2, 3].map((i) => (
						<div key={i} className="border-t border-white/10" />
					))}
				</div>

				{/* lines */}
				<svg className="relative w-full h-full" preserveAspectRatio="none">
					{["cpu", "memory"].map((key, idx) => {
						const pathD = data
							.map((point, i) => {
								const x = (i / Math.max(1, data.length - 1)) * 100;
								const y = 100 - ((point[key] ?? 0) / safeMax) * 100;
								return `${i === 0 ? "M" : "L"}${x},${y}`;
							})
							.join(" ");
						return (
							<path
								key={key}
								d={pathD}
								fill="none"
								stroke={idx === 0 ? "#ec4899" : "#60a5fa"}
								strokeWidth="2"
								vectorEffect="non-scaling-stroke"
							/>
						);
					})}
				</svg>
			</div>

			<div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
				<div className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-full bg-pink-500" />
					CPU
				</div>
				<div className="flex items-center gap-2">
					<span className="w-3 h-3 rounded-full bg-blue-400" />
					RAM
				</div>
				<div className="ml-auto text-gray-500">máx: {safeMax}%</div>
			</div>
		</div>
	);
}


