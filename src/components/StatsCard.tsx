import React from 'react';
import  {type BatteryStats } from '../types/battery';

interface StatsCardProps {
  stats: BatteryStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const statItems = [
    { label: 'Max SOC', value: `${stats.maxSOC.toFixed(1)}%`, color: 'text-green-600' },
    { label: 'Min SOC', value: `${stats.minSOC.toFixed(1)}%`, color: 'text-red-600' },
    { label: 'Avg SOC', value: `${stats.avgSOC.toFixed(1)}%`, color: 'text-blue-600' },
    { label: 'Max Voltage', value: `${stats.maxVoltage.toFixed(2)}V`, color: 'text-purple-600' },
    { label: 'Min Voltage', value: `${stats.minVoltage.toFixed(2)}V`, color: 'text-orange-600' },
    { label: 'Avg Voltage', value: `${stats.avgVoltage.toFixed(2)}V`, color: 'text-indigo-600' },
    { label: 'Max Current', value: `${stats.maxCurrent.toFixed(2)}A`, color: 'text-cyan-600' },
    { label: 'Min Current', value: `${stats.minCurrent.toFixed(2)}A`, color: 'text-pink-600' },
    { label: 'Total Energy', value: `${stats.totalEnergy.toFixed(2)}Wh`, color: 'text-emerald-600' },
    { label: 'Total Ah', value: `${stats.totalAmperHours.toFixed(2)}Ah`, color: 'text-teal-600' },
    { label: 'Charging Cycles', value: stats.chargingCycles.toString(), color: 'text-green-700' },
    { label: 'Discharging Cycles', value: stats.dischargingCycles.toString(), color: 'text-red-700' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Battery Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;