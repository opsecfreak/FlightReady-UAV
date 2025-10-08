'use client';

import { useState } from 'react';
import { Flight } from '@/lib/types';

export default function LogsPage() {
  const [logs] = useState<Flight[]>([]); // In a real app, this would fetch from an API

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Flight Logs</h1>
      <div className="mt-6">
        {logs.length === 0 ? (
          <p className="text-gray-500">No flight logs yet. Start a new flight to create one!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {logs.map((log) => (
              <li key={log.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-medium">
                      Flight on {new Date(log.takeoffTime).toLocaleDateString()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Weather: {log.weatherCondition} • Battery: {log.batteryVoltage}V •
                      Satellites: {log.satellitesCount}
                    </p>
                    {log.notes && <p className="text-sm text-gray-500">{log.notes}</p>}
                  </div>
                  <div className="flex-shrink-0 space-x-2">
                    {log.flightPlanUrl && (
                      <a
                        href={log.flightPlanUrl}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        KML
                      </a>
                    )}
                    {log.briefingPdfUrl && (
                      <a
                        href={log.briefingPdfUrl}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
