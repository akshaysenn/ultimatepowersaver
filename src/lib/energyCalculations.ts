
// Average power consumption in watts for common appliances
export const appliancePower: Record<string, number> = {
  refrigerator: 150,
  television: 100,
  computer: 300,
  washer: 500,
  dryer: 3000,
  dishwasher: 1200,
  oven: 2400,
  microwave: 1100,
  airConditioner: 1500,
  heater: 1500,
  lightBulb: 60,
};

// Calculate daily energy consumption in kWh
export function calculateEnergyUsage(
  appliances: Record<string, number>
): Record<string, number> {
  const result: Record<string, number> = {};
  
  Object.entries(appliances).forEach(([appliance, hours]) => {
    if (appliancePower[appliance]) {
      // Convert watts to kilowatts and multiply by hours
      result[appliance] = (appliancePower[appliance] / 1000) * hours;
    }
  });
  
  return result;
}

// Calculate total energy usage
export function calculateTotalEnergy(energyUsage: Record<string, number>): number {
  return Object.values(energyUsage).reduce((total, value) => total + value, 0);
}

// Calculate efficiency score (0-100)
export function calculateEfficiencyScore(totalEnergy: number): number {
  // Benchmark: A household consuming 30 kWh/day would score 0
  // A household consuming 5 kWh/day or less would score 100
  const maxBenchmark = 30;
  const minBenchmark = 5;
  
  if (totalEnergy >= maxBenchmark) return 0;
  if (totalEnergy <= minBenchmark) return 100;
  
  // Linear scale between min and max benchmarks
  return Math.round(100 - ((totalEnergy - minBenchmark) / (maxBenchmark - minBenchmark)) * 100);
}

// Get efficiency category based on score
export function getEfficiencyCategory(score: number): {
  category: string;
  color: string;
  message: string;
} {
  if (score >= 80) {
    return {
      category: "Excellent",
      color: "energy-green",
      message: "Your energy usage is very efficient!",
    };
  } else if (score >= 60) {
    return {
      category: "Good",
      color: "energy-blue",
      message: "You're doing well, but there's room for improvement.",
    };
  } else if (score >= 40) {
    return {
      category: "Average",
      color: "energy-yellow",
      message: "Your energy usage is average. Consider our recommendations.",
    };
  } else {
    return {
      category: "Poor",
      color: "energy-red",
      message: "Your energy usage is high. Urgent action recommended.",
    };
  }
}

// Get personalized recommendations based on usage
export function getRecommendations(
  appliances: Record<string, number>
): string[] {
  const recommendations: string[] = [];
  const energyUsage = calculateEnergyUsage(appliances);
  
  // General recommendations
  recommendations.push("Unplug electronics when not in use to avoid phantom power draw.");
  recommendations.push("Use natural lighting during the day when possible.");
  
  // Specific recommendations based on usage patterns
  if (energyUsage.refrigerator && energyUsage.refrigerator > 3.6) {
    recommendations.push("Consider upgrading to an energy-efficient refrigerator.");
  }
  
  if (energyUsage.airConditioner && energyUsage.airConditioner > 6) {
    recommendations.push("Reduce air conditioner usage by using fans and natural ventilation.");
  }
  
  if (energyUsage.heater && energyUsage.heater > 6) {
    recommendations.push("Lower your thermostat by a few degrees and wear warmer clothing.");
  }
  
  if (energyUsage.lightBulb && energyUsage.lightBulb > 1) {
    recommendations.push("Replace regular light bulbs with LED alternatives to save energy.");
  }
  
  if (energyUsage.computer && energyUsage.computer > 3) {
    recommendations.push("Enable power-saving mode on your computer and turn it off when not in use.");
  }
  
  if (energyUsage.television && energyUsage.television > 4) {
    recommendations.push("Reduce screen brightness and consider limiting TV usage.");
  }
  
  if (energyUsage.washer || energyUsage.dryer) {
    recommendations.push("Wash clothes in cold water and air dry when possible.");
  }
  
  // Return 3-5 recommendations
  return recommendations.slice(0, 5);
}
