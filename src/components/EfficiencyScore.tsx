
import React, { useEffect, useRef } from 'react';
import { getEfficiencyCategory } from '@/lib/energyCalculations';

interface EfficiencyScoreProps {
  score: number;
}

const EfficiencyScore: React.FC<EfficiencyScoreProps> = ({ score }) => {
  const { category, color, message } = getEfficiencyCategory(score);
  const dialRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (needleRef.current) {
      // Convert score 0-100 to rotation -90 to 90 degrees
      const rotation = -90 + (score / 100) * 180;
      needleRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [score]);

  // Get background color based on category color
  const getBgColor = () => {
    switch (color) {
      case 'energy-green': return 'bg-energy-green';
      case 'energy-blue': return 'bg-energy-blue';
      case 'energy-yellow': return 'bg-energy-yellow';
      case 'energy-red': return 'bg-energy-red';
      default: return 'bg-energy-blue';
    }
  };

  // Get text color based on category color
  const getTextColor = () => {
    switch (color) {
      case 'energy-green': return 'text-energy-green';
      case 'energy-blue': return 'text-energy-blue';
      case 'energy-yellow': return 'text-energy-yellow';
      case 'energy-red': return 'text-energy-red';
      default: return 'text-energy-blue';
    }
  };

  return (
    <div className="dashboard-card w-full h-full">
      <h2 className="text-xl font-semibold text-energy-neutral-dark mb-2">
        Efficiency Score
      </h2>
      
      <div className="flex flex-col items-center mt-4 mb-2">
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Gauge background */}
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-r from-energy-red via-energy-yellow to-energy-green rounded-t-full"></div>
          
          {/* Gauge foreground (white mask) */}
          <div className="absolute bottom-0 w-full h-[85%] bg-white rounded-t-full"></div>
          
          {/* Gauge dial */}
          <div ref={dialRef} className="absolute bottom-0 w-full flex justify-center">
            {/* Needle */}
            <div 
              ref={needleRef}
              className="relative h-20 w-1 bg-energy-neutral-dark rounded-full origin-bottom transition-transform duration-1000 ease-out"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-energy-neutral-dark"></div>
            </div>
          </div>
          
          {/* Score display at the bottom center */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center">
            <span className={`text-2xl font-bold ${getTextColor()}`}>{score}</span>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${getBgColor()}`}>
            {category}
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-[250px] mx-auto">
            {message}
          </p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <div className="w-full h-2 bg-energy-red rounded-full mb-1"></div>
          <span className="text-muted-foreground">Low</span>
        </div>
        <div>
          <div className="w-full h-2 bg-energy-yellow rounded-full mb-1"></div>
          <span className="text-muted-foreground">Average</span>
        </div>
        <div>
          <div className="w-full h-2 bg-energy-green rounded-full mb-1"></div>
          <span className="text-muted-foreground">Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyScore;
