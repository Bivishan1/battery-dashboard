import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="max-w-7xl flex items-center justify-center w-screen min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <div className="text-lg font-semibold text-gray-700">Loading Battery Data...</div>
        <div className="text-sm text-gray-500">Fetching real-time battery metrics</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;