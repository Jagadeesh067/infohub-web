import { useState } from "react";
import { apiGET } from "../lib/fetcher";

export default function ConverterCard() {
  const [amount, setAmount] = useState("1000");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function convert() {
    setLoading(true); setError(""); setData(null);
    try {
      const val = parseFloat(amount);
      if (Number.isNaN(val) || val < 0) throw new Error("Enter valid number");
      const res = await apiGET(`/api/convert?amount=${val}`);
      setData(res);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card">
      <div className="flex items-end gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Amount (INR)</label>
          <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} />
        </div>
        <button className="btn" onClick={convert} disabled={loading}>
          {loading ? "Converting…" : "Convert"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {data && (
        <div className="grid sm:grid-cols-3 gap-3">
          <Rate label="USD" value={data.converted.USD} />
          <Rate label="EUR" value={data.converted.EUR} />
        </div>
      )}
    </div>
  );
}

function Rate({ label, value }) {
  return (
    <div className="p-3 rounded-xl border border-gray-200">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
