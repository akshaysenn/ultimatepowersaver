
import React, { useEffect, useRef } from 'react';
import { applianceLabels } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EnergyUsageDisplayProps {
  energyUsage: Record<string, number>;
}

const EnergyUsageDisplay: React.FC<EnergyUsageDisplayProps> = ({ energyUsage }) => {
  const chartData = Object.entries(energyUsage)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: applianceLabels[key],
      value: parseFloat(value.toFixed(2)),
      id: key,
    }))
    .sort((a, b) => b.value - a.value);

  const totalEnergy = chartData.reduce((total, item) => total + item.value, 0);
  
  const colorMap: Record<string, string> = {
    refrigerator: '#0EA5E9',
    television: '#38BDF8',
    computer: '#7DD3FC',
    washer: '#0284C7',
    dryer: '#0369A1',
    dishwasher: '#0891B2',
    oven: '#0E7490',
    microwave: '#06B6D4',
    airConditioner: '#0CA5E9',
    heater: '#0284C7',
    lightBulb: '#7DD3FC',
  };

  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('animate-fade-in');
    }
  }, [energyUsage]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-energy-blue font-bold">{payload[0].value} kWh</p>
          <p className="text-xs text-muted-foreground">
            {((payload[0].value / totalEnergy) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-card w-full h-full" ref={containerRef}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-energy-neutral-dark">Energy Consumption</h2>
          <p className="text-sm text-muted-foreground">Daily usage in kilowatt-hours (kWh)</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-energy-blue">
            {totalEnergy.toFixed(1)} <span className="text-sm font-normal">kWh</span>
          </div>
          <p className="text-xs text-muted-foreground">Total Daily Usage</p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              barGap={8}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.substring(0, 3) + "..."}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value} kWh`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              >
                {chartData.map((entry) => (
                  <Cell 
                    key={entry.id} 
                    fill={colorMap[entry.id] || '#0EA5E9'}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No energy consumption data to display
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyUsageDisplay;
