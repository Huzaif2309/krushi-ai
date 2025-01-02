"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { ChartArea, Menu, Send, Sprout } from "lucide-react";

import { Github, LifeBuoy } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Navbar = () => {
	const router = useRouter();
	return (
			<div className="flex flex-row justify-around items-center p-4 fixed z-10 w-full bg-white dark:bg-black">
				{/* Logo Section */}
				<div className="font-bold text-xl md:text-3xl flex flex-row justify-center items-center gap-2">
					<Sprout className="text-[#16a32a] font-extrabold" size={35} />
					Krushi-AI
				</div>

				{/* Desktop Navigation */}
				<div className="flex-row hidden md:flex">
					<Button
						onClick={() => router.push("https://8t9b3j30-7000.inc1.devtunnels.ms//")}
						variant="outline"
						className="border-none hover:scale-105 transition-all duration-300"
					>
						Analyze
					</Button>
					<Button
						onClick={() => router.push("/contact")}
						variant="outline"
						className="border-none hover:scale-105 transition-all duration-300"
					>
						Contact Us
					</Button>
				</div>

				{/* Mode Toggle and Clerk Buttons */}
				<div className="flex flex-row items-center gap-4">
					<ModeToggle />
				</div>

				{/* Mobile Menu */}
				<div className="md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost">
								<Menu />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Menu</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => router.push("https://65hqhf12-7000.inc1.devtunnels.ms/")}>
									<ChartArea />
									<span>Analyze Crop Yields</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => router.push("/contact")}>
									<Send />
									<span>Contact Us</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() =>
									router.push("https://github.com/samkitsamsukha/krushi-ai")
								}
							>
								<Github />
								<span>GitHub</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LifeBuoy />
								<span>FAQ&apos;s</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
	);
};

export default Navbar;
