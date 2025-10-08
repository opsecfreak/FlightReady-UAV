export interface Equipment {
  id: string;
  name: string;
  type: 'drone' | 'controller' | 'battery' | 'other';
  model: string;
  manufacturer: string;
  serialNumber: string;
  purchaseDate: Date;
  lastMaintenance?: Date;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  notes?: string;
  specifications: {
    [key: string]: string | number;
  };
}