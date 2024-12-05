"use client";

import WeatherApp from "@/components/ai/WeatherComponent";
import GovHelp from "@/components/GovHelp";
// import Fertiliser from "@/components/ai/Fertiliser";
import Particles from "../components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CloudSunRain, Landmark } from "lucide-react";
// import { Search } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { MarqueeDemo } from "@/components/Marquee";
import TypingAnimation from "@/components/ui/typing-animation";
import { useRouter } from "next/navigation";
import AiChatbot from "@/components/ai/ChatBot";

const herotext = [
  { language: "English", script: "Krushi-AI" },
  { language: "Hindi", script: "कृषी-AI" },
  { language: "Kannada", script: "ಕೃಷಿ-AI" },
  { language: "Malayalam", script: "കൃഷി-AI" },
  { language: "Bengali", script: "কৃষি-AI" },
  { language: "Gujarati", script: "કૃષિ-AI" },
  { language: "Tamil", script: "கிருஷி-AI" },
  { language: "Telugu", script: "కృషి-AI" },
  { language: "Punjabi", script: "ਕ੍ਰੁਸ਼ੀ-AI" },
  { language: "Odia", script: "କୃଷି-AI" },
];

export default function Home() {
  const [color, setColor] = useState("#ffff00");
  const [currentText, setCurrentText] = useState(herotext[0].script); // Initialize with the first text
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#16a32a" : "#16a34a");
  }, [resolvedTheme]);

  // Change the text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Get the next text in the array
      const nextIndex = (herotext.findIndex(item => item.script === currentText) + 1) % herotext.length;
      setCurrentText(herotext[nextIndex].script);
    }, 6000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentText]);

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4">
      <div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <TypingAnimation
          key={currentText} // Using key to force re-render on text change
          className="text-6xl md:text-8xl font-bold text-[#16a34a]"
          text={currentText} // Dynamically update the text every 5 seconds
        />
        <p className="text-xl md:text-3xl mx-10 text-center my-4">
          Transforming agriculture with precision and power, Krushi AI empowers
          farmers to achieve unmatched productivity and success. Elevate your
          farming journey today.
        </p>
        <RainbowButton
          onClick={() => {
            router.push("http://127.0.0.1:3001/kuchtohhai/templates/map.html");
          }}
        >
          Analyze Crop Yields
        </RainbowButton>
        <Particles
          className="absolute inset-0"
          quantity={600}
          ease={80}
          color={color}
          refresh
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 h-fit">
        <div className="w-full md:w-1/3 h-full">
          <h2 className="text-center font-bold text-2xl mb-2">
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
          <h2 className="text-center font-bold text-2xl mb-2">
            <div className="flex flex-row gap-2 justify-center items-center">
              <div className="text-[#16a34a]">
                <Landmark />
              </div>
              <div>Government Initiatives</div>
            </div>
          </h2>
          <GovHelp />
        </div>
        {/* <div className="w-full md:w-1/3 h-full">
          <h2 className="text-center font-bold text-2xl mb-2">
            <div className="flex flex-row gap-2 justify-center items-center">
              <div className="text-[#16a34a]">
                <Search />
              </div>
              <div>Fertilizer AI</div>
            </div>
          </h2>
          <Fertiliser />
        </div> */}
      </div>
      <div>
        <MarqueeDemo />
      </div>
      <div className="sdg"></div>
      <AiChatbot />
    </div>
  );
}
