import React from 'react';
import { Battery, Activity, Zap } from 'lucide-react';

interface HeaderProps {
  dataCount: number;
  lastUpdated: Date | null;
}

const Header: React.FC<HeaderProps> = ({ dataCount, lastUpdated }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Battery className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Battery Analytics Dashboard</h1>
            <p className="text-blue-100 mt-1">Real-time battery monitoring and analysis</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span className="text-sm">Data Points: {dataCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm">
                Last Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Loading...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;