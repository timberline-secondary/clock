import Head from "next/head";
import { useState, useEffect } from "react";
import Selection from "../components/schedule.js";
import res from "../components/schedule.json";

export default function Home() {
	const [block, setBlock] = useState("loading...");
	const [countdown, setCountdown] = useState("loading...");

	function formatCountdown() {
		const difference =
			new Date(
				`${
					months[new Date().getMonth()]
				} ${new Date().getDate()}, ${new Date().getFullYear()} ${countdown}`
			).getTime() - new Date().getTime();
		const hours = Math.floor(
			(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);
		return `${hours}h ${minutes}m ${seconds}s`;
	}

	const data = res.schedule[Selection()].values;

	for (const property in data) {
		if (
			res.schedule[Selection()].values[property].start <
			new Date().toLocaleTimeString(["fr-FR"])
		) {
			useEffect(() => {
				setBlock(res.schedule[Selection()].values[property].text);
				setCountdown(res.schedule[Selection()].values[property].end);
			}, []);
		}
	}

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const [time, setTime] = useState(new Date().toLocaleTimeString(["fr-FR"]));
	const [properTime, setProperTime] = useState(
		new Date().toLocaleTimeString(["en-US"])
	);
	const [date, setDate] = useState(
		`${days[new Date().getDay()]}, ${
			months[new Date().getMonth()]
		} ${new Date().getDate()}, ${new Date().getFullYear()}`
	);

	setInterval(() => {
		setTime(new Date().toLocaleTimeString(["fr-FR"]));
		setProperTime(new Date().toLocaleTimeString(["en-US"]));
		setDate(
			`${days[new Date().getDay()]}, ${
				months[new Date().getMonth()]
			} ${new Date().getDate()}, ${new Date().getFullYear()}`
		);
	}, 1000);

	return (
		<>
			<div className="bg"></div>
			<div className="absolute top-0 left-0 text-white font-medium text-lg m-7">
				{properTime}
			</div>
			<div className="absolute top-0 right-0 text-white font-medium text-lg m-7">
				Next block at: {countdown}
			</div>
			<div className="flex flex-col items-center justify-center z-10 absolute w-full h-full">
				<div className="text-white font-medium text-5xl">{block}</div>
				<div className="relative select-none text-7xl m-2 text-white font-bold">
					{time}
				</div>
				<div className="font-medium text-5xl text-white select-none">
					{date}
				</div>
				<div className="mt-12 font-medium text-white text-5xl">
					Time Until Block End:
				</div>
				<div className="text-white font-medium text-5xl">
					{formatCountdown()}
				</div>
			</div>
		</>
	);
}
