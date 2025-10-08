'use client';

import { useState } from 'react';
import { Flight } from '@/lib/types';
import { Equipment } from '@/types/equipment';

export default function LogsPage() {
  const [logs] = useState<Flight[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterEquipment, setFilterEquipment] = useState('');

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Equipment',
      'Battery Voltage',
      'Satellites',
      'Weather',
      'Duration',
      'Notes',
    ].join(',');

    const csvData = logs.map(log => [
      new Date(log.takeoffTime).toLocaleDateString(),
      log.equipmentId,
      log.batteryVoltage,
      log.satellitesCount,
      log.weatherCondition,
      log.landingTime ? 
        Math.round((new Date(log.landingTime).getTime() - new Date(log.takeoffTime).getTime()) / 60000) + ' min' 
        : 'N/A',
      log.notes?.replace(/,/g, ';') || '',
    ].join(','));

    const csv = [headers, ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flight-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flight Logs</h1>
        <div className="flex space-x-2">
          <button
            onClick={exportToCSV}
            className="btn-secondary flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export CSV</span>
          </button>
          <button className="btn-primary">
            Start New Flight
          </button>
        </div>
      </div>

      <div className="card">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Filter by Date</label>
            <input
              type="date"
              className="input-field"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Filter by Equipment</label>
            <select
              className="input-field"
              value={filterEquipment}
              onChange={(e) => setFilterEquipment(e.target.value)}
            >
              <option value="">All Equipment</option>
              {/* Equipment options would be populated here */}
            </select>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No flight logs yet. Start a new flight to create one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weather</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(log.takeoffTime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {log.equipmentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {log.batteryVoltage}V
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        log.weatherCondition === 'Clear' ? 'bg-green-100 text-green-800' :
                        log.weatherCondition === 'Storm' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.weatherCondition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {log.landingTime ? 
                        `${Math.round((new Date(log.landingTime).getTime() - new Date(log.takeoffTime).getTime()) / 60000)} min` 
                        : 'In Progress'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        {log.flightPlanUrl && (
                          <a
                            href={log.flightPlanUrl}
                            className="text-blue-600 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            KML
                          </a>
                        )}
                        {log.briefingPdfUrl && (
                          <a
                            href={log.briefingPdfUrl}
                            className="text-blue-600 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            PDF
                          </a>
                        )}
                        <button className="text-blue-600 hover:text-blue-800">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
