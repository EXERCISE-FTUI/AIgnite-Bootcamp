import { useState } from 'react';
import Image from 'next/image';
import { divisionIcons } from '@/components/divisions/divisionsIcons';

interface SmallerWidthProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedIcon: number;
  setSelectedIcon: (index: number) => void;
}

const SmallerWidth = ({ isOpen, setIsOpen, selectedIcon, setSelectedIcon }: SmallerWidthProps) => {
  const divisionNames = [
    "UI/UX",
    "Software",
    "Human Resource",
    "Project",
    "Partnership",
    "Public Relations",
    "Creative",
    "Design",
    "Finance"
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[400px] h-20 relative bg-neutral-50 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] flex items-center justify-between px-6
            ${isOpen ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-lg'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 flex items-center justify-center">
              <Image 
                src={divisionIcons[selectedIcon].src}
                alt={divisionIcons[selectedIcon].alt}
                width={32}
                height={32}
              />
            </div>
            <span className="text-[#55457e] text-lg font-medium font-['Inter']">
              {divisionNames[selectedIcon]}
            </span>
          </div>
          <svg 
            className={`w-8 h-8 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute w-full bg-white rounded-b-lg shadow-lg p-4">
            <div className="grid grid-rows-2 grid-cols-5 gap-4">
              {divisionIcons.map((icon, index) => (
                <div 
                  key={index} 
                  className={`flex justify-center items-center cursor-pointer rounded-lg transition-all duration-300 ease-in-out
                    ${selectedIcon === index ? 'bg-[#55457E] rounded-none' : ''}`}
                  onClick={() => {
                    setSelectedIcon(index);
                    setIsOpen(false);
                  }}
                >
                  {selectedIcon === index ? (
                    <Image 
                      src={icon.selectedSrc}
                      alt={icon.alt} 
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image 
                      src={icon.src} 
                      alt={icon.alt} 
                      width={32}
                      height={32}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallerWidth;