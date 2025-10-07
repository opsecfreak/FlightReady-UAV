import { useState } from "react";

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  function addEquipment(e: React.FormEvent) {
    e.preventDefault();
    if (newItem.trim()) {
      setEquipment([...equipment, newItem.trim()]);
      setNewItem("");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Equipment</h1>
      <form onSubmit={addEquipment} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Add drone or equipment"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul className="list-disc pl-6">
        {equipment.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
