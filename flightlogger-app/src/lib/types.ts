export interface Equipment {
  id: string;
  name: string;
  type: 'drone' | 'controller' | 'battery' | 'other';
  userId: string;
  createdAt: Date;
}

export interface Flight {
  id: string;
  userId: string;
  equipmentId: string;
  batteryVoltage: number;
  satellitesCount: number;
  takeoffTime: Date;
  landingTime?: Date;
  weatherCondition: string;
  flightPlanUrl?: string;
  briefingPdfUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}