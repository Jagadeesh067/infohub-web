import { useState } from "react";
import { apiGET } from "../lib/fetcher";

export default function WeatherCard() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather() {
    setLoading(true); setError(""); setData(null);
    try {
      const res = await apiGET(`/api/weather?city=${encodeURIComponent(city)}`);
      setData(res);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card">
      <div className="flex items-end gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">City</label>
          <input className="input" value={city} onChange={e=>setCity(e.target.value)} />
        </div>
        <button className="btn" onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading…" : "Get Weather"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {data && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-4xl font-semibold">{Math.round(data.tempC)}°C</div>
            <div className="text-gray-600">{data.description}</div>
            <div className="text-gray-500 text-sm mt-1">{data.city}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Wind" value={`${data.windKph || '—'} kph`} />
            <Stat label="Humidity" value={`${data.humidity || '—'}%`} />
          </div>
        </div>
      )}
      {!data && !error && !loading && <p className="text-gray-500 text-sm">Search a city.</p>}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 rounded-xl border border-gray-200">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg">{value}</div>
    </div>
  );
}
