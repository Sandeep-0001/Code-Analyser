"use client";
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const links = useMemo(
		() => [
			{
				label: "Leaderboard",
				to: "https://campus-to-corporate.vercel.app/leaderboard",
			},
			{ label: "Contests", to: "https://contest-board.vercel.app" },
			{ label: "Code Analyser", to: "https://code-analyser-beta.vercel.app" },
			{ label: "Similar Qs", to: "https://similar-question-search.vercel.app" },
			{ label: "Notes", to: "https://gla-notes.vercel.app" },
			{ label: "Company Sheets", to: "https://companywise-sheet.vercel.app" },
		],
		[]
	);

	const linkClassName = ({ isActive }) =>
		`transition-colors ${
			isActive ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300"
		}`;

	return (
		<nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
				<div className="flex items-center gap-8">
					<NavLink
						to="/"
						className="text-lg font-semibold tracking-wide text-slate-50"
						onClick={() => setIsOpen(false)}
					>
						CampusToCorporate
					</NavLink>

					<div className="hidden items-center gap-4 text-xs md:flex md:text-sm">
						{links.map((link) => (
							<NavLink key={link.to} to={link.to} className={linkClassName}>
								{link.label}
							</NavLink>
						))}
					</div>
				</div>

				<button
					type="button"
					onClick={() => setIsOpen((v) => !v)}
					className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 transition-colors hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 md:hidden"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
				>
					<svg
						viewBox="0 0 24 24"
						width="20"
						height="20"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{isOpen ? (
							<>
								<path d="M18 6 6 18" />
								<path d="M6 6l12 12" />
							</>
						) : (
							<>
								<path d="M4 6h16" />
								<path d="M4 12h16" />
								<path d="M4 18h16" />
							</>
						)}
					</svg>
				</button>
			</div>

			<div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
				<div className="mx-auto max-w-6xl px-4 pb-3">
					<div className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
						{links.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={linkClassName}
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</NavLink>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
}

export function NavbarDemo() {
	return <Navbar />;
}
