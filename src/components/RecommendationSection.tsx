
import React from 'react';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

interface RecommendationSectionProps {
  recommendations: string[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ recommendations }) => {
  return (
    <div className="dashboard-card w-full h-full">
      <div className="flex items-center mb-4">
        <Lightbulb className="text-energy-yellow mr-2" size={20} />
        <h2 className="text-xl font-semibold text-energy-neutral-dark">Energy Saving Tips</h2>
      </div>
      
      <div className="space-y-4 stagger-fade-in">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index}
            className="flex p-3 bg-white rounded-lg transition-all duration-300 hover:shadow-sm"
          >
            <CheckCircle2 className="text-energy-green mr-3 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-energy-neutral-dark">{recommendation}</p>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No recommendations available
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationSection;
