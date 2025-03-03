
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ApplianceInputPanel from '@/components/ApplianceInputPanel';
import EnergyUsageDisplay from '@/components/EnergyUsageDisplay';
import EfficiencyScore from '@/components/EfficiencyScore';
import RecommendationSection from '@/components/RecommendationSection';
import { initialApplianceUsage } from '@/lib/mockData';
import { 
  calculateEnergyUsage, 
  calculateTotalEnergy, 
  calculateEfficiencyScore,
  getRecommendations
} from '@/lib/energyCalculations';

const Index = () => {
  const [applianceUsage, setApplianceUsage] = useState(initialApplianceUsage);
  const [energyUsage, setEnergyUsage] = useState<Record<string, number>>({});
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [efficiencyScore, setEfficiencyScore] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Update calculations when appliance usage changes
  useEffect(() => {
    // Calculate energy usage for each appliance
    const newEnergyUsage = calculateEnergyUsage(applianceUsage);
    setEnergyUsage(newEnergyUsage);
    
    // Calculate total energy consumption
    const newTotalEnergy = calculateTotalEnergy(newEnergyUsage);
    setTotalEnergy(newTotalEnergy);
    
    // Calculate efficiency score
    const newEfficiencyScore = calculateEfficiencyScore(newTotalEnergy);
    setEfficiencyScore(newEfficiencyScore);
    
    // Get personalized recommendations
    const newRecommendations = getRecommendations(applianceUsage);
    setRecommendations(newRecommendations);
  }, [applianceUsage]);

  // Handle appliance usage updates
  const handleApplianceUpdate = (applianceId: string, hours: number) => {
    setApplianceUsage((prev) => ({
      ...prev,
      [applianceId]: hours,
    }));
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 py-8 max-w-7xl mx-auto">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Appliance Input */}
        <div className="lg:col-span-1">
          <ApplianceInputPanel 
            applianceUsage={applianceUsage} 
            onUpdate={handleApplianceUpdate} 
          />
        </div>
        
        {/* Right column: Energy Display, Score, and Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <EnergyUsageDisplay energyUsage={energyUsage} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EfficiencyScore score={efficiencyScore} />
            <RecommendationSection recommendations={recommendations} />
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-xs text-muted-foreground">
        <p>Smart Energy Consumption Dashboard — Made with precision and care</p>
      </footer>
    </div>
  );
};

export default Index;
