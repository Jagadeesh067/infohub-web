import { useState, useEffect } from "react";
import Tabs from "./components/Tabs";
import WeatherCard from "./components/WeatherCard";
import ConverterCard from "./components/ConverterCard";
import QuoteCard from "./components/QuoteCard";
import { apiGET } from "./lib/fetcher";

const TABS = ["Weather", "Converter", "Quotes"];

export default function App() {
  const [tab, setTab] = useState("Weather");
  const [apiOk, setApiOk] = useState(true);

  useEffect(() => {
    apiGET("/health").then(()=>setApiOk(true)).catch(()=>setApiOk(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">InfoHub</h1>
        <p className="text-gray-600">Weather • Currency • Quotes</p>
      </header>

      {!apiOk && (
        <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
          Backend unreachable. Start the server or update proxy config.
        </div>
      )}

      <div className="mb-4"><Tabs tabs={TABS} active={tab} onChange={setTab} /></div>

      {tab === "Weather" && <WeatherCard />}
      {tab === "Converter" && <ConverterCard />}
      {tab === "Quotes" && <QuoteCard />}

      <footer className="text-xs text-gray-500 mt-8">
        Built with React + Express. No page reloads. Clean loading/error states.
      </footer>
    </div>
  );
}
