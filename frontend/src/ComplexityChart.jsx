// TimeComplexityChart.jsx
import React from "react";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Legend,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Legend,
	Title,
	Tooltip
);

const TimeComplexityChart = ({
	complexityType,
	complexity,
	name,
	colorOfLine = "#60a5fa", // simpler default color compatible across browsers
}) => {
	// Use a smaller sample range and start at 2 to avoid log2(0/negative) which produced NaNs
	const n = Array.from({ length: 100 }, (_, i) => i + 2);
	// Normalize the incoming complexity type and string value, and map them to a small
	// set of canonical labels used by the chart.
	const rawType = String(complexityType || "").trim().toLowerCase();
	const rawComplexity = String(complexity || "").trim().toLowerCase();

	let selectedComplexity = rawType.replace(/[^a-z]/g, ""); // strip symbols like (), spaces

	// Helper checks based on either the type label or the raw Big-O string
	const looksLike = (substr) =>
		rawType.includes(substr) || rawComplexity.includes(substr);

	if (looksLike("factorial") || rawComplexity.includes("n!") || rawComplexity.includes("!")) {
		selectedComplexity = "factorial";
	} else if (looksLike("exponential") || rawComplexity.includes("2^n") || rawComplexity.includes("2**n")) {
		selectedComplexity = "exponential";
	} else if (looksLike("cubic") || rawComplexity.includes("n^3") || rawComplexity.includes("n3")) {
		selectedComplexity = "cubic";
	} else if (looksLike("quadratic") || rawComplexity.includes("n^2") || rawComplexity.includes("n2")) {
		selectedComplexity = "quadratic";
	} else if (looksLike("nlogn") || rawType.includes("linearithmic")) {
		selectedComplexity = "linearithmic";
	} else if (looksLike("log") && !looksLike("nlogn")) {
		selectedComplexity = "logarithmic";
	} else if (looksLike("linear")) {
		selectedComplexity = "linear";
	} else if (looksLike("constant")) {
		selectedComplexity = "constant";
	}

	// supported labels we still draw even if type is outside this list
	const supported = [
		"constant",
		"logarithmic",
		"linear",
		"linearithmic",
		"quadratic",
		"cubic",
		"exponential",
		"factorial",
	];
	const isDisabled = complexityType === "none" || !supported.includes(selectedComplexity);
	const palette = {
		constant: "#a3a3a3",
		logarithmic: "#38bdf8",
		linear: "#22c55e",
		linearithmic: "#eab308",
		quadratic: "#f97316",
		cubic: "#c084fc",
		exponential: "#facc15",
		factorial: "#f43f5e",
	};
	const dataset = (label, dataFunc) => {
		const baseColor = palette[label] || "#64748b";
		const isSelected = selectedComplexity === label;
		return {
			label,
			data: n.map(dataFunc),
			borderColor: isSelected ? baseColor : baseColor + "66",
			borderWidth: isSelected ? 3 : 1.5,
			borderDash: isSelected ? [] : [4, 4],
			fill: false,
			tension: 0.28,
		};
	};

	// Normalize/scale the curves so they render nicely within the chart max values
	const data = {
		labels: n,
		datasets: [
			// constant ~ flat
			dataset("constant", () => 2),
			// logarithmic ~ slowly increasing
			dataset("logarithmic", (x) => Math.log2(x) * 3),
			// linear ~ straight line
			dataset("linear", (x) => x * 0.35),
			// linearithmic ~ between linear and quadratic
			dataset("linearithmic", (x) => x * Math.log2(x) * 0.08),
			// quadratic ~ steeper curve
			dataset("quadratic", (x) => (x * x) * 0.002),
			// cubic ~ steeper than quadratic
			dataset("cubic", (x) => (x * x * x) * 0.00008),
			// exponential ~ 2^n scaled to stay visible
			dataset("exponential", (x) => Math.pow(2, x) * 0.00001),
			// factorial-like growth (very steep) scaled heavily down so it stays in view
			dataset("factorial", (x) => {
				// approximate n * n! growth without actual factorial to avoid overflow
				// use a fast-growing polynomial as a visual proxy
				return (x * x * x * x) * 0.00002; // tuned to keep within chart bounds
			}),
		],
	};

	const options = {
		responsive: true,
		elements: {
			line: {
				borderWidth: 1,
				capBezierPoints: true,
			},
			point: {
				radius: 0,
			},
		},
		clip: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},

		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					color: '#9ca3af',
					font: {
						size: 10,
					},
					usePointStyle: true,
				},
			},
			tooltip: {
				enabled: true,
				intersect: false,
				mode: "nearest",
				titleFont: {
					size: 14,
					family: "monospace",
					weight: "bold",
					capitalize: "uppercase",
				},
				bodyFont: {
					size: 13,
					family: "monospace",
					weight: "normal",
				},
				backgroundColor: "oklch(20.8% 0.042 265.755)", // Tooltip background
				titleColor: "oklch(100% 0 0)", // Title text color
				bodyColor: "oklch(100% 0 0)", // Main text color
				borderColor: "oklch(27.8% 0.033 256.848)", // Border color
				borderWidth: 1,
				cornerRadius: 6,
				padding: 10,
				displayColors: false,
				callbacks: {
					label: function (context) {
						return context.dataset.label; // ✨ your custom message here
					},
					title: function () {
						return ""; // disables the title (optional)
					},
				},
			},
		},
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: true,
					color: "#888",
					width: 0.3,
				},
				ticks: {
					display: false,
				},
				max: 50,
			},
			y: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: true,
					color: "#888",
					width: 0.3,
				},
				ticks: {
					display: false,
				},
				max: 50,
			},
		},
		maintainAspectRatio: false,
		aspectRatio: 1,
	};
	return (
		<div className="h-[180px] w-[220px]">
			<Line data={data} options={options} />
		</div>
	);
};

export default TimeComplexityChart;
