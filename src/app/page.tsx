"use client";

import WeatherApp from "@/components/ai/WeatherComponent";
import GovHelp from "@/components/GovHelp";
import Fertiliser from "@/components/ai/Fertiliser";
import Particles from "../components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CloudSunRain, Landmark } from "lucide-react";
import { Search } from "lucide-react";
export default function Home() {
	const [color, setColor] = useState("#ffff00");
	const { resolvedTheme } = useTheme();
	useEffect(() => {
		setColor(resolvedTheme === "dark" ? "#16a32a" : "#16a34a");
	}, [resolvedTheme]);
	return (
		<div className="flex flex-1 flex-col min-h-screen p-4">
			<div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
				<h1 className="text-6xl md:text-8xl font-bold text-[#16a34a]">
					Krushi-AI
				</h1>
				<p className="text-xl md:text-3xl mx-10 text-center my-4">
					Transforming agriculture with precision and power, Krushi AI empowers
					farmers to achieve unmatched productivity and success. Elevate your
					farming journey today.
				</p>
				<Particles
					className="absolute inset-0"
					quantity={600}
					ease={80}
					color={color}
					refresh
				/>
			</div>
			<div className="flex flex-col md:flex-row gap-6 h-fit">
				<div className="w-full md:w-1/3 h-full">
					<h2 className="text-center  font-bold text-2xl mb-2">
						<div className="flex flex-row gap-2 justify-center items-center">
							<div className="text-[#16a34a]">
								<CloudSunRain />
							</div>
							<div>Weather Forecast</div>
						</div>
					</h2>
					<WeatherApp />
				</div>
				<div className="w-full md:w-1/3 h-full">
        <h2 className="text-center  font-bold text-2xl mb-2">
						<div className="flex flex-row gap-2 justify-center items-center">
							<div className="text-[#16a34a]">
                <Landmark />
							</div>
							<div>Government Initiatives</div>
						</div>
					</h2>
					<GovHelp />
				</div>
				<div className="w-full md:w-1/3 h-full">
        <h2 className="text-center  font-bold text-2xl mb-2">
						<div className="flex flex-row gap-2 justify-center items-center">
							<div className="text-[#16a34a]">
                <Search />
							</div>
							<div>Government Initiatives</div>
						</div>
					</h2>
					<Fertiliser />
				</div>
			</div>
		</div>
	);
}
