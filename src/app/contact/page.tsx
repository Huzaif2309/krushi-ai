"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Sprout } from "lucide-react";

const ContactUs = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-10 pt-20 md:pt-0">
			{/* Heading Section */}
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-extrabold tracking-wide flex flex-rwo justify-center items-center space-x-4">
					<div>Got Questions? Let&apos;s Chat!</div> <div className="hidden md:flex text-[#16a32a]"><Sprout size={50}/></div>
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Whether it&apos;s a shout-out, a curious query, or a sprinkle of feedback,
					we&apos;re all ears (and eyes)! Fill out the form, and we&apos;ll get back to
					you faster than a sunflower grows!
				</p>
			</div>

			{/* Contact Form Card */}
			<Card className="w-full max-w-2xl shadow-lg">
				<CardHeader>
					<CardTitle className="text-[#16a32a]">Reach Out to Us</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col space-y-6">
						{/* Name Field */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								Your Name
							</label>
							<Input
								id="name"
								type="text"
								placeholder="What do we call you?"
								className="mt-1"
							/>
						</div>

						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								Your Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="We promise no spam!"
								className="mt-1"
							/>
						</div>

						{/* Message Field */}
						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								Your Message
							</label>
							<Textarea
								id="message"
								placeholder="What's on your mind? 🌟"
								rows={4}
								className="mt-1"
							/>
						</div>

						{/* Submit Button */}
						<div className="flex justify-center items-center">
                        <RainbowButton
							className="w-fit flex justify-center items-center font-bold bg-[#16a32a] hover:bg-[#128724] py-3 px-6 rounded-lg transition-all shadow-md">
                                Send My Message! 🌿
                        </RainbowButton>
                        </div>
					</form>
				</CardContent>
			</Card>

			{/* Additional Contact Options */}
			<div className="text-center space-y-2">
				<p className="text-gray-600 dark:text-gray-400">
					Prefer old-school methods? 📞 Drop us a call at{" "}
					<span className="text-[#16a32a] font-bold">+91 9239 089 089</span>
				</p>
				<p className="text-gray-600 dark:text-gray-400">
					Or shoot an email to{" "}
					<a
						href="mailto:samkitsamsukha@gmail.com"
						className="text-[#16a32a] font-bold underline"
					>
						krushiai@gmail.com
					</a>
				</p>
			</div>
		</div>
	);
};

export default ContactUs;
