"use client";

import WeatherApp from "@/components/ai/WeatherComponent";
import GovHelp from "@/components/GovHelp";
import Fertiliser from "@/components/ai/Fertiliser";
import Particles from "../components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
	const [color, setColor] = useState("#ffff00");
	const { resolvedTheme } = useTheme();
	useEffect(() => {
		setColor(resolvedTheme === "dark" ? "#16a32a" : "#0000ff");
	}, [resolvedTheme]);
	return (
		<div className="flex flex-1 flex-col min-h-screen p-4">
			<div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
				<h1 className="text-8xl font-bold text-[#16a34a]">Krushi-AI</h1>
        <p className="text-3xl mx-10 text-center my-4">Transforming agriculture with precision and power, Krushi AI empowers farmers to achieve unmatched productivity and success. Elevate your farming journey today.</p>
				<Particles
					className="absolute inset-0"
					quantity={800}
					ease={80}
					color={color}
					refresh
				/>
			</div>
			<div className="flex flex-col md:flex-row gap-6 h-fit">
				<div className="w-1/3 h-full">
					<h2 className="text-center text-[#16a34a] font-bold text-2xl mb-2">
						Weather Forecast
					</h2>
					<WeatherApp />
				</div>
				<div className="w-1/3 h-full">
					<h2 className="text-center text-[#16a34a] font-bold text-2xl mb-2">
						Government Initiatives
					</h2>
					<GovHelp />
				</div>
				<div className="w-1/3 h-full">
					<h2 className="text-center text-[#16a34a] font-bold text-2xl mb-2">
						Fertilizer
					</h2>
					<Fertiliser />
				</div>
			</div>
		</div>
	);
}
