import { useState, useEffect, lazy, Suspense } from 'react';
import { fetchBatteryData, processData, calculateStats } from './services/batteryService';
import type { ProcessedData, BatteryStats } from './types/battery';
import Header from './components/Header';
// import BatteryChart from './components/BatteryChart';
const BatteryChart = lazy(() => import('./components/BatteryChart'));
import StatsCard from './components/StatsCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Skeleton from './components/Skeleton';

function App() {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [stats, setStats] = useState<BatteryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const rawData = await fetchBatteryData();
      const processedData = processData(rawData);
      const calculatedStats = calculateStats(processedData);
      
      setData(processedData);
      setStats(calculatedStats);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load battery data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Set up auto-refresh every 30 seconds
    // const interval = setInterval(loadData, 30000);
    
    // return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen text-slate-400 p-4 bg-gray-100">
      <div className="max-w-7xl w-screen">
        <Header dataCount={data.length} lastUpdated={lastUpdated} />
        
        {stats && (
          <div className="mb-6">
            <StatsCard stats={stats} />
          </div>
        )}
        
        <Suspense fallback={<Skeleton height={300} /> }>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BatteryChart 
            data={data} 
            title="SOC and Voltage vs Time" 
            type="soc-voltage" 
          />
          <BatteryChart 
            data={data} 
            title="Current vs Time" 
            type="current" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BatteryChart 
            data={data} 
            title="Power vs Time" 
            type="power" 
          />
          <BatteryChart 
            data={data} 
            title="Energy and Ampere-hours vs Time" 
            type="energy" 
          />
        </div>
        </Suspense>
      </div>
    </div>
  );
}

export default App;