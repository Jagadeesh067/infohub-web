import { useState } from "react";
import { apiGET } from "../lib/fetcher";

export default function QuoteCard() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getQuote() {
    setLoading(true); setError("");
    try {
      const res = await apiGET("/api/quote");
      setQuote(res.quote);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card text-center">
      <button className="btn mb-4" onClick={getQuote} disabled={loading}>
        {loading ? "Thinking…" : "New Quote"}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {quote ? (
        <figure>
          <blockquote className="text-xl">“{quote.text}”</blockquote>
          <figcaption className="text-sm text-gray-500 mt-1">— {quote.author}</figcaption>
        </figure>
      ) : (
        <p className="text-gray-500 text-sm">Tap the button to get motivated ✨</p>
      )}
    </div>
  );
}
