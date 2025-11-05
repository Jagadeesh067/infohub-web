export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 p-2 bg-white rounded-2xl border border-gray-200 shadow-soft">
      {tabs.map(t => (
        <button
          key={t}
          className={`tab ${active === t ? "tab-active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
