import type { BatteryData, ProcessedData, BatteryStats } from '../types/battery';

const API_URL = 
'https://batterydemoapi-521905205220.asia-south1.run.app/battery-data';

export const fetchBatteryData = async (): Promise<BatteryData[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    // console.log('Full API Response:', JSON.stringify(rawData, null, 2));

    if (
      !rawData ||
      rawData.status !== 'success' ||
      typeof rawData.data !== 'object'
    ) {
      throw new Error('Invalid data format: Unexpected API structure');
    }

    const { timestamp, voltage, current, soc } = rawData.data;

    if (
      !Array.isArray(timestamp) ||
      !Array.isArray(voltage) ||
      !Array.isArray(current) ||
      !Array.isArray(soc)
    ) {
      throw new Error('Invalid data format: Expected arrays for each field');
    }

    // Convert column-based data into row-based objects
    const batteryData: BatteryData[] = timestamp.map((time, i) => ({
      timestamp: time,
      voltage: voltage[i],
      current: current[i],
      soc: soc[i]
    }));

    return batteryData;
  } catch (error) {
    console.error('Error fetching battery data:', error);
    throw error;
  }
};


export const processData = (data: BatteryData[]): ProcessedData[] => {
  return data.map((item, index) => {
    const datetime = new Date(item.timestamp);
    const power = item.voltage * item.current;
    
    // Calculate time difference in hours for energy and Ah calculations
    const prevTime = index > 0 ? new Date(data[index - 1].timestamp) : datetime;
    const timeDiffHours = (datetime.getTime() - prevTime.getTime()) / (1000 * 60 * 60);
    
    const energy = power * timeDiffHours;
    const amperHours = item.current * timeDiffHours;
    
    return {
      ...item,
      datetime,
      power,
      energy,
      amperHours
    };
  });
};

export const calculateStats = (data: ProcessedData[]): BatteryStats => {
  if (data.length === 0) {
    return {
      maxSOC: 0, minSOC: 0, avgSOC: 0,
      maxVoltage: 0, minVoltage: 0, avgVoltage: 0,
      maxCurrent: 0, minCurrent: 0, avgCurrent: 0,
      totalEnergy: 0, totalAmperHours: 0,
      chargingCycles: 0, dischargingCycles: 0
    };
  }

  const socs = data.map(d => d.soc);
  const voltages = data.map(d => d.voltage);
  const currents = data.map(d => d.current);

  // Detect charging/discharging cycles
  let chargingCycles = 0;
  let dischargingCycles = 0;
  let isCharging = false;
  let isDischarging = false;

  for (let i = 1; i < data.length; i++) {
    const prevSOC = data[i - 1].soc;
    const currentSOC = data[i].soc;
    
    if (currentSOC > prevSOC) {
      if (!isCharging) {
        chargingCycles++;
        isCharging = true;
        isDischarging = false;
      }
    } else if (currentSOC < prevSOC) {
      if (!isDischarging) {
        dischargingCycles++;
        isDischarging = true;
        isCharging = false;
      }
    }
  }

  return {
    maxSOC: Math.max(...socs),
    minSOC: Math.min(...socs),
    avgSOC: socs.reduce((a, b) => a + b, 0) / socs.length,
    maxVoltage: Math.max(...voltages),
    minVoltage: Math.min(...voltages),
    avgVoltage: voltages.reduce((a, b) => a + b, 0) / voltages.length,
    maxCurrent: Math.max(...currents),
    minCurrent: Math.min(...currents),
    avgCurrent: currents.reduce((a, b) => a + b, 0) / currents.length,
    totalEnergy: data.reduce((sum, d) => sum + d.energy, 0),
    totalAmperHours: data.reduce((sum, d) => sum + d.amperHours, 0),
    chargingCycles,
    dischargingCycles
  };
};