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
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
	const router = useRouter();
	return (
		<ClerkProvider>
			<div className="flex flex-row justify-around items-center p-4 fixed z-10 w-full bg-white dark:bg-black">
				{/* Logo Section */}
				<div className="font-bold text-xl md:text-3xl flex flex-row justify-center items-center gap-2">
					<Sprout className="text-[#16a32a] font-extrabold" size={35} />
					Krushi-AI
				</div>

				{/* Desktop Navigation */}
				<div className="flex-row hidden md:flex">
					<Button
						onClick={() => router.push("/analyze")}
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
					<SignedOut>
						{/* Show Sign-In and Sign-Up buttons for signed-out users */}
						<SignInButton>
							<Button
								variant="outline"
								className="hover:scale-105 transition-all duration-300"
							>
								Sign In
							</Button>
						</SignInButton>
						<SignUpButton>
							<Button
								variant="outline"
								className="hover:scale-105 transition-all duration-300"
							>
								Sign Up
							</Button>
						</SignUpButton>
					</SignedOut>
					<SignedIn>
						{/* Show UserButton for signed-in users */}
						<UserButton
							afterSignOutUrl="/"
							appearance={{
								elements: {
									rootBox:
										"rounded-full shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600",
								},
							}}
						/>
					</SignedIn>
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
								<DropdownMenuItem onClick={() => router.push("/analyze")}>
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
		</ClerkProvider>
	);
};

export default Navbar;
