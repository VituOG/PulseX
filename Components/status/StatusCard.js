import React from "react";

export default function StatusCard({ title, value, icon: Icon, color, progress = 0 }) {
	return (
		<div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
			<div className="flex items-center justify-between mb-3">
				<div>
					<div className="text-sm text-gray-400">{title}</div>
					<div className="text-2xl font-bold text-white">{value}</div>
				</div>
				<div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${color}`}>
					{Icon ? <Icon className="w-5 h-5 text-white" /> : null}
				</div>
			</div>
			<div className="h-2 bg-white/10 rounded-full overflow-hidden">
				<div
					className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
					style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
				/>
			</div>
		</div>
	);
}


