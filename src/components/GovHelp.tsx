"use client"
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
    photo: "/govweb/eNAM.png", // Example logo URL
  },
  {
    id: 2,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    link: "https://pmkisan.gov.in/",
    photo: "/govweb/pmkisan.png", // Example logo URL
  },
  {
    id: 3,
    name: "Indian Council of Agricultural Research (ICAR)",
    link: "https://icar.org.in/",
    photo: "/govweb/icar.png", // Example logo URL
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    link: "https://soilhealth.dac.gov.in/",
    photo: "/govweb/soil.png", // Example logo URL
  },
  {
    id: 5,
    name: "Kisan Credit Card (KCC)",
    link: "https://www.nabard.org/",
    photo: "/govweb/kcc.jpeg", // Example logo URL
  },
];

const GovHelp = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col'>
      <ShineBorder
        className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="flex flex-col p-2 space-y-4">
          {data.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <Image
                src={item.photo}
                alt={item.name}
                width={50} // Set appropriate width
                height={50} // Set appropriate height
                className="rounded" // Optional: Add some styling
              />

              <div className="flex flex-row justify-center">
                <span className="text-lg font-semibold">{item.name}</span>
                <button
                  onClick={() => router.push(item.link)}
                  className="rounded-full text-[#16a32a] px-2 py-1 w-fit "
                >
                  <SquareArrowOutUpRight />
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