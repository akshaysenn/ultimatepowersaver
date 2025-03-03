
import React from 'react';
import { Battery, Settings, BellRing } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-block px-3 py-1 mb-2 bg-energy-blue/10 text-energy-blue rounded-full text-xs font-medium">
            Smart Energy Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-energy-neutral-dark">
            Energy Consumption
          </h1>
          <p className="mt-1 text-muted-foreground">
            Monitor and optimize your daily energy usage
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white/70 border border-gray-100 hover:bg-white transition duration-300">
            <BellRing size={20} className="text-energy-neutral-dark/70" />
          </button>
          <button className="p-2 rounded-full bg-white/70 border border-gray-100 hover:bg-white transition duration-300">
            <Settings size={20} className="text-energy-neutral-dark/70" />
          </button>
          <div className="flex items-center gap-2 py-2 px-3 bg-white/70 rounded-full border border-gray-100">
            <Battery size={18} className="text-energy-green" />
            <span className="text-sm font-medium">Eco Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
