import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

const reviews = [
	{
		name: "Ramesh Patel",
		username: "@ramesh_patel",
		body: "This app has transformed the way I manage my crops. The recommendations are spot on and easy to follow.",
		lang: "English",
		img: "https://avatar.vercel.sh/ramesh",
	},
	{
		name: "Sarla Devi",
		username: "@sarla_devi",
		body: "इस ऐप ने मेरी फसल प्रबंधन का तरीका बदल दिया है। इसकी सिफारिशें सटीक और पालन करने में आसान हैं।",
		lang: "Hindi",
		img: "https://avatar.vercel.sh/sarla",
	},
	{
		name: "Rajendra Singh",
		username: "@rajendra_singh",
		body: "এই অ্যাপটি আমার ফসল ব্যবস্থাপনার পদ্ধতি বদলে দিয়েছে। সুপারিশগুলি অত্যন্ত সঠিক এবং অনুসরণ করা সহজ।",
		lang: "Bengali",
		img: "https://avatar.vercel.sh/rajendra",
	},
	{
		name: "Lakshmi Nair",
		username: "@lakshmi_nair",
		body: "ഈ ആപ്പ് എന്റെ വിളകളുടെ പരിപാലനം മാറ്റിമറിച്ചു. ശുപാർശകൾ കൃത്യവും അനുസരിക്കാൻ എളുപ്പവുമാണ്.",
		lang: "Malayalam",
		img: "https://avatar.vercel.sh/lakshmi",
	},
	{
		name: "Nagaraj Gowda",
		username: "@nagaraj_gowda",
		body: "ಈ ಅಪ್ಲಿಕೇಶನ್ ನನ್ನ ಬೆಳೆ ನಿರ್ವಹಣೆಯ ಶೈಲಿಯನ್ನು ಪರಿವರ್ತಿಸಿದೆ. ಶಿಫಾರಸುಗಳು ನಿಖರವಾಗಿವೆ ಮತ್ತು ಅನುಸರಿಸಲು ಸುಲಭವಾಗಿದೆ.",
		lang: "Kannada",
		img: "https://avatar.vercel.sh/nagaraj",
	},
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
				// light styles
				"border-green-500 bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<Image
					className="rounded-full"
					width={32}
					height={32}
					alt=""
					src={img}
				/>
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">{username}</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
};

export function MarqueeDemo() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background mt-8 p-8">
			<AnimatedGradientText>
				<span
					className={cn(
						`text-2xl inline animate-gradient bg-gradient-to-r from-[#ffff00] px-4 via-green-400 to-green-700 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
					)}
				>
					Feedbacks
				</span>
			</AnimatedGradientText>
			<Marquee pauseOnHover className="[--duration:20s] mt-8">
				{firstRow.map((review) => (
					<ReviewCard key={review.username} {...review} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover className="[--duration:20s]">
				{secondRow.map((review) => (
					<ReviewCard key={review.username} {...review} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
		</div>
	);
}
