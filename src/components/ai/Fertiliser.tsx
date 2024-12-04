"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Fertiliser = () => {
    const [inputText, setInputText] = useState(""); // For user input
    const [results, setResults] = useState(null); // For API results
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://65hqhf12-5000.inc1.devtunnels.ms/recommend",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        inputText, // Pass input data
                    }),
                }
            );
    
            // Log raw response for debugging
            const rawResponse = await response.text();
            console.log("Raw API Response:", rawResponse);
    
            // Parse as JSON only if the response is valid JSON
            const data = JSON.parse(rawResponse);
            setResults(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="h-full mx-auto flex flex-col space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="inputText"
                        className="block text-lg font-semibold"
                    >
                        Enter Fertilizer Details:
                    </label>
                    <textarea
                        id="inputText"
                        placeholder="Describe the fertilizer input or related queries..."
                        rows={4}
                        className="shadow-sm resize-none appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>
                <Button
                    variant="default"
                    type="submit"
                    className={`text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-600 bg-[#16a32a] ${
                        isLoading && "cursor-wait"
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center space-x-2">
                            <span className="loader border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
                            <span>Analyzing...</span>
                        </span>
                    ) : (
                        "Get Recommendation"
                    )}
                </Button>
            </form>
            {results && (
                <div className="mt-6 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">
                        Fertilizer Recommendation:
                    </h3>
                    <p className="text-lg text-teal-700 font-medium">
                        {results.recommendation}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Fertiliser;
