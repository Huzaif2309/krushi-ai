"use client"; // This directive is used in Next.js to indicate that this component should be rendered on the client side.

import React from "react"; // Import React
import { useTheme } from "next-themes"; // Import the useTheme hook from next-themes
import { MagicCard } from "../../components/ui/magic-card"; // Import the MagicCard component
import { div } from "framer-motion/client";

// Define the MagicCardDemo functional component
const MagicCardDemo = () => {
  const { theme } = useTheme(); // Get the current theme using the useTheme hook

  return (
    <div className="w-[20vw] ">
        <div className="flex flex-col space-y-2 ">
            {Array.from({ length: 6 }).map((_, index) => (
                <MagicCard
                key={index}
                className="cursor-pointer flex-col items-center justify-center shadow-lg whitespace-nowrap text-2xl "
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                >
                Card {index + 1}
                </MagicCard>
            ))}
        </div>
    </div>
  );
};

// Export the component as the default export
export default MagicCardDemo;