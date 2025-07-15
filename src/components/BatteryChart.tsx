import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
 type ChartOptions,
type  TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import type { ProcessedData } from '../types/battery';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface BatteryChartProps {
  data: ProcessedData[];
  title: string;
  type: 'soc-voltage' | 'current' | 'power' | 'energy';
}

const BatteryChart: React.FC<BatteryChartProps> = ({ data, title, type }) => {
  const getChartData = () => {
    const labels = data.map(d => d.datetime);
    
    switch (type) {
      case 'soc-voltage':
        return {
          labels,
          datasets: [
            {
              label: 'SOC (%)',
              data: data.map(d => d.soc),
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.1,
              yAxisID: 'y',
            },
            {
              label: 'Voltage (V)',
              data: data.map(d => d.voltage),
              borderColor: 'rgb(249, 115, 22)',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              tension: 0.1,
              yAxisID: 'y1',
            }
          ]
        };
      case 'current':
        return {
          labels,
          datasets: [
            {
              label: 'Current (A)',
              data: data.map(d => d.current),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.1,
            }
          ]
        };
      case 'power':
        return {
          labels,
          datasets: [
            {
              label: 'Power (W)',
              data: data.map(d => d.power),
              borderColor: 'rgb(147, 51, 234)',
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              tension: 0.1,
            }
          ]
        };
      case 'energy':
        return {
          labels,
          datasets: [
            {
              label: 'Energy (Wh)',
              data: data.map(d => d.energy),
              borderColor: 'rgb(236, 72, 153)',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              tension: 0.1,
            },
            {
              label: 'Ampere-hours (Ah)',
              data: data.map(d => d.amperHours),
              borderColor: 'rgb(6, 182, 212)',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              tension: 0.1,
              yAxisID: 'y1',
            }
          ]
        };
      default:
        return { labels: [], datasets: [] };
    }
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const date = new Date(context[0].parsed.x);
            return date.toLocaleString();
          },
          label: (context: TooltipItem<'line'>) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            hour: 'MMM dd HH:mm',
            day: 'MMM dd'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: type === 'soc-voltage' ? 'SOC (%)' : 
                type === 'current' ? 'Current (A)' : 
                type === 'power' ? 'Power (W)' : 'Energy (Wh)'
        }
      },
      ...(type === 'soc-voltage' || type === 'energy' ? {
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: type === 'soc-voltage' ? 'Voltage (V)' : 'Ampere-hours (Ah)'
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      } : {})
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 4
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-96">
      <Line data={getChartData()} options={options} />
    </div>
  );
};

export default BatteryChart;