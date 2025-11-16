"use client";
import React from "react";
import { NavLink } from "react-router-dom";

export function NavbarDemo() {
	const navStyle = {
		borderBottom: "1px solid #1f2937",
		background: "rgba(15,23,42,0.96)",
		backdropFilter: "blur(10px)",
	};
	const wrapperStyle = {
		maxWidth: "960px",
		margin: "0 auto",
		padding: "0 16px",
		height: 56,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	};
	const brandStyle = {
		fontSize: 18,
		fontWeight: 600,
		letterSpacing: 0.5,
		color: "#f9fafb",
		textDecoration: "none",
	};
	const linksRow = {
		display: "flex",
		gap: 16,
		fontSize: 18,
		color: "#cbd5f5",
		flexWrap: "wrap",
	};
	const linkBase = {
		textDecoration: "none",
		color: "#e5e7eb",
		transition: "color 150ms ease",
	};
	const activeColor = "#22d3ee";

	const makeLinkStyle = (isActive) => ({
		...linkBase,
		color: isActive ? activeColor : linkBase.color,
	});

	return (
		<nav style={navStyle}>
			<div style={wrapperStyle}>
				<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
					<NavLink to="https://campus-to-corporate.vercel.app" style={brandStyle}>
						CampusToCorporate
					</NavLink>
					<div style={linksRow}>
						<NavLink
							to="https://campus-to-corporate.vercel.app/leaderboard"
							style={({ isActive }) => makeLinkStyle(isActive)}
						>
							Leaderboard
						</NavLink>
						<NavLink to="https://contest-board.vercel.app" style={({ isActive }) => makeLinkStyle(isActive)}>
							Contests
						</NavLink>
						<NavLink to="https://code-analyser-beta.vercel.app" style={({ isActive }) => makeLinkStyle(isActive)}>
							Code Analyser
						</NavLink>
						<NavLink
							to="https://similar-question-search.vercel.app"
							style={({ isActive }) => makeLinkStyle(isActive)}
						>
							Similar Qs
						</NavLink>
						<NavLink to="https://gla-notes.vercel.app" style={({ isActive }) => makeLinkStyle(isActive)}>
							Notes
						</NavLink>
						<NavLink
							to="https://companywise-sheet.vercel.app"
							style={({ isActive }) => makeLinkStyle(isActive)}
						>
							Company Sheets
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
}
