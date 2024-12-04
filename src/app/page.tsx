import WeatherApp from "@/components/ai/WeatherComponent";

export default function Home() {
	return (
		<div className="flex flex-1 flex-col min-h-screen p-4">
			<div className="h-[50vh] p-4"></div>
			<div className="flex ">
				<WeatherApp />
			</div>
		</div>
	);
}
