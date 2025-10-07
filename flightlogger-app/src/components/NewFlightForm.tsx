'use client';

import { Equipment, Flight } from '@/lib/types';
import { useState, useEffect } from 'react';

interface WeatherCondition {
  condition: string;
  safe: boolean;
  warning?: string;
}

const weatherConditions: WeatherCondition[] = [
  { condition: 'Clear', safe: true },
  { condition: 'Partly Cloudy', safe: true },
  { condition: 'Overcast', safe: true },
  { condition: 'Light Rain', safe: false, warning: 'Flying in rain may damage equipment' },
  { condition: 'Heavy Rain', safe: false, warning: 'Do not fly in heavy rain' },
  { condition: 'High Winds', safe: false, warning: 'Wind speeds exceed safe flying conditions' },
  { condition: 'Storm', safe: false, warning: 'Dangerous flying conditions. Do not proceed.' },
];

export default function NewFlightForm({
  equipment,
  onSubmit,
}: {
  equipment: Equipment[];
  onSubmit: (data: Partial<Flight>) => void;
}) {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [batteryVoltage, setBatteryVoltage] = useState('');
  const [satellitesCount, setSatellitesCount] = useState('');
  const [weather, setWeather] = useState<WeatherCondition>(weatherConditions[0]);
  const [flightPlan, setFlightPlan] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    setWarning(weather.warning || '');
  }, [weather]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!weather.safe) {
      const proceed = window.confirm(
        'Weather conditions are not ideal for flying. Are you sure you want to proceed?'
      );
      if (!proceed) return;
    }

    // In a real app, we'd upload the flight plan file first
    const flightData: Partial<Flight> = {
      equipmentId: selectedEquipment,
      batteryVoltage: parseFloat(batteryVoltage),
      satellitesCount: parseInt(satellitesCount, 10),
      takeoffTime: new Date(),
      weatherCondition: weather.condition,
      notes,
    };

    onSubmit(flightData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Equipment</label>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select a drone</option>
          {equipment
            .filter((eq) => eq.type === 'drone')
            .map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Battery Voltage</label>
          <input
            type="number"
            step="0.1"
            value={batteryVoltage}
            onChange={(e) => setBatteryVoltage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Satellites Connected</label>
          <input
            type="number"
            value={satellitesCount}
            onChange={(e) => setSatellitesCount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Weather Conditions</label>
        <select
          value={weather.condition}
          onChange={(e) => {
            const selected = weatherConditions.find((w) => w.condition === e.target.value);
            if (selected) setWeather(selected);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          {weatherConditions.map((w) => (
            <option key={w.condition} value={w.condition}>
              {w.condition}
            </option>
          ))}
        </select>
        {warning && (
          <p className="mt-2 text-sm text-red-600">
            ⚠️ {warning}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Flight Plan (KML)</label>
        <input
          type="file"
          accept=".kml,.kmz"
          onChange={(e) => setFlightPlan(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Flight
        </button>
      </div>
    </form>
  );
}