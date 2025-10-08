'use client';

import { useState } from "react";
import { Equipment } from "@/types/equipment";

const DEFAULT_SPECS: Record<Equipment['type'], Record<string, string>> = {
  other: {
    description: "Custom specification",
  },
  drone: {
    flightTime: "Minutes",
    range: "Kilometers",
    maxAltitude: "Meters",
    maxSpeed: "km/h",
    weight: "Grams",
  },
  controller: {
    range: "Kilometers",
    batteryLife: "Hours",
    channels: "Count",
  },
  battery: {
    capacity: "mAh",
    voltage: "V",
    cycles: "Count",
  },
};

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "drone" as Equipment["type"],
    model: "",
    manufacturer: "",
    serialNumber: "",
    purchaseDate: "",
    specifications: {} as Equipment["specifications"],
    notes: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newEquipment: Equipment = {
      id: Date.now().toString(),
      ...formData,
      purchaseDate: new Date(formData.purchaseDate),
      status: "available",
    };
    setEquipment([...equipment, newEquipment]);
    setShowForm(false);
    setFormData({
      name: "",
      type: "drone",
      model: "",
      manufacturer: "",
      serialNumber: "",
      purchaseDate: "",
      specifications: {},
      notes: "",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Equipment</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Equipment
        </button>
      </div>

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="form-label">Type</label>
                <select
                  className="input-field"
                  value={formData.type}
                  onChange={(e) => {
                    const type = e.target.value as Equipment["type"];
                    setFormData({
                      ...formData,
                      type,
                      specifications: DEFAULT_SPECS[type] || {},
                    });
                  }}
                >
                  <option value="drone">Drone</option>
                  <option value="controller">Controller</option>
                  <option value="battery">Battery</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Model</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="form-label">Manufacturer</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="form-label">Serial Number</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Purchase Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Notes</label>
              <textarea
                className="input-field"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Equipment
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((item) => (
          <div key={item.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.manufacturer} {item.model}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {item.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Type:</span> {item.type}
              </p>
              <p className="text-sm">
                <span className="font-medium">Serial:</span> {item.serialNumber}
              </p>
              <p className="text-sm">
                <span className="font-medium">Purchased:</span>{" "}
                {item.purchaseDate.toLocaleDateString()}
              </p>
              {item.notes && (
                <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="btn-secondary text-sm">Edit</button>
              <button className="btn-primary text-sm">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {equipment.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No equipment added yet. Click "Add New Equipment" to get started.</p>
        </div>
      )}
    </div>
  );
}
