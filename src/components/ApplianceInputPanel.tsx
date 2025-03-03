
import React, { useState } from 'react';
import { applianceLabels } from '@/lib/mockData';
import { Plus, Minus } from 'lucide-react';

interface ApplianceInputPanelProps {
  applianceUsage: Record<string, number>;
  onUpdate: (applianceId: string, hours: number) => void;
}

const ApplianceInputPanel: React.FC<ApplianceInputPanelProps> = ({
  applianceUsage,
  onUpdate,
}) => {
  const [activeAppliance, setActiveAppliance] = useState<string | null>(null);
  
  const handleHoursChange = (applianceId: string, value: string) => {
    const hours = parseFloat(value);
    if (!isNaN(hours) && hours >= 0 && hours <= 24) {
      onUpdate(applianceId, hours);
    }
  };

  const incrementHours = (applianceId: string) => {
    const currentHours = applianceUsage[applianceId] || 0;
    if (currentHours < 24) {
      onUpdate(applianceId, Math.min(24, currentHours + 0.5));
    }
  };

  const decrementHours = (applianceId: string) => {
    const currentHours = applianceUsage[applianceId] || 0;
    if (currentHours > 0) {
      onUpdate(applianceId, Math.max(0, currentHours - 0.5));
    }
  };

  return (
    <div className="dashboard-card w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-energy-neutral-dark">Daily Appliance Usage</h2>
        <p className="text-sm text-muted-foreground">Hours per day</p>
      </div>
      
      <div className="space-y-4 stagger-fade-in">
        {Object.keys(applianceLabels).map((applianceId) => (
          <div 
            key={applianceId}
            className={`p-4 rounded-xl transition-all duration-300 ${
              activeAppliance === applianceId 
                ? 'bg-energy-blue/5 border border-energy-blue/20' 
                : 'bg-white hover:bg-energy-neutral hover:shadow-sm'
            }`}
            onClick={() => setActiveAppliance(applianceId)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{applianceLabels[applianceId]}</span>
              
              <div className="flex items-center">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full text-energy-neutral-dark hover:bg-energy-blue/10 transition duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    decrementHours(applianceId);
                  }}
                >
                  <Minus size={16} />
                </button>
                
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={applianceUsage[applianceId]}
                  onChange={(e) => handleHoursChange(applianceId, e.target.value)}
                  className="w-14 mx-1 py-1 px-2 text-center rounded bg-transparent focus:bg-white focus:ring-1 focus:ring-energy-blue/20 border border-transparent focus:border-energy-blue/20 outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
                
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full text-energy-neutral-dark hover:bg-energy-blue/10 transition duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    incrementHours(applianceId);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceInputPanel;
