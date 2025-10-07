import { useState } from "react";

export default function NewFlightPage() {
  const [battery, setBattery] = useState("");
  const [sats, setSats] = useState("");
  const [takeoff, setTakeoff] = useState("");
  const [landing, setLanding] = useState("");
  const [weather, setWeather] = useState("Clear");
  const [warning, setWarning] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleWeatherChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setWeather(value);
    if (["Storm", "High Wind", "Rain"].includes(value)) {
      setWarning("Warning: Unsafe weather conditions!");
    } else {
      setWarning("");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: Save flight log, upload file, etc.
    alert("Flight log submitted! PDF briefing will be generated.");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Start New Flight</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Battery Voltage</label>
          <input type="text" value={battery} onChange={e => setBattery(e.target.value)} className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium">Satellites Connected</label>
          <input type="text" value={sats} onChange={e => setSats(e.target.value)} className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium">Time for Takeoff</label>
          <input type="time" value={takeoff} onChange={e => setTakeoff(e.target.value)} className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium">Time for Landing</label>
          <input type="time" value={landing} onChange={e => setLanding(e.target.value)} className="border px-4 py-2 rounded w-full" />
        </div>
        <div>
          <label className="block font-medium">Weather</label>
          <select value={weather} onChange={handleWeatherChange} className="border px-4 py-2 rounded w-full">
            <option value="Clear">Clear</option>
            <option value="Cloudy">Cloudy</option>
            <option value="High Wind">High Wind</option>
            <option value="Rain">Rain</option>
            <option value="Storm">Storm</option>
          </select>
          {warning && <p className="text-red-600 mt-2">{warning}</p>}
        </div>
        <div>
          <label className="block font-medium">Upload Flight Plan/KML</label>
          <input type="file" accept=".pdf,.kml" onChange={handleFileChange} className="border px-4 py-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Flight Log</button>
      </form>
    </div>
  );
}
