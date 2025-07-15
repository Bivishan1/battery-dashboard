export interface BatteryData {
  timestamp: string;
  soc: number;
  voltage: number;
  current: number;
}

export interface ProcessedData extends BatteryData {
  datetime: Date;
  power: number;
  energy: number;
  amperHours: number;
}

export interface BatteryStats {
  maxSOC: number;
  minSOC: number;
  avgSOC: number;
  maxVoltage: number;
  minVoltage: number;
  avgVoltage: number;
  maxCurrent: number;
  minCurrent: number;
  avgCurrent: number;
  totalEnergy: number;
  totalAmperHours: number;
  chargingCycles: number;
  dischargingCycles: number;
}