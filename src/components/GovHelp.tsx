"use client";
import React from 'react';
import ShineBorder from './ui/shine-border';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';

const data = [
  {
    id: 1,
    name: "National Agriculture Market (eNAM)",
    link: "https://enam.gov.in/",
    photo: "/govweb/eNAM.png",
  },
  {
    id: 2,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    link: "https://pmkisan.gov.in/",
    photo: "/govweb/pmkisan.png",
  },
  {
    id: 3,
    name: "Indian Council of Agricultural Research (ICAR)",
    link: "https://icar.org.in/",
    photo: "/govweb/icar.png",
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    link: "https://soilhealth.dac.gov.in/",
    photo: "/govweb/soil.png",
  },
  {
    id: 5,
    name: "Kisan Credit Card (KCC)",
    link: "https://www.nabard.org/",
    photo: "/govweb/kcc.jpeg",
  },
];

const GovHelp = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col h-full'>
      <ShineBorder
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border dark:bg-gray-800 h-[50vh]"
        color={["#16a32a", "#ffff00", "#9FE2bf"]}
      >
        <div className="flex flex-col p-4 space-y-6">
          {data.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 rounded-lg bg-white dark:bg-transparent transition-shadow duration-300">
              <div className='w-14 h-12'>
              <Image
                src={item.photo}
                alt={item.name}
                width={60} // Increased width for better visibility
                height={60} // Increased height for better visibility
                className="rounded-full border border-gray-300" // Added border for better definition
              />
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-md font-semibold">{item.name}</span>
                <button
                  onClick={() => router.push(item.link)}
                  className="flex items-center justify-center rounded-full text-[#16a32a] px-2 py-1 transition-colors duration-300"
                >
                  <SquareArrowOutUpRight size={20}/>
                </button>
              </div>
             
            </div>
          ))}
    </div>
      </ShineBorder >
    </div >
  );
}

export default GovHelp;