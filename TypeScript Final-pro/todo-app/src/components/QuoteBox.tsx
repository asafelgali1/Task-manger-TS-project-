import { useEffect, useState } from "react";
import axios from "axios";
import { Quote } from "../types";

const QuoteBox = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://api.quotable.io/random");
      setQuote({ content: response.data.content, author: response.data.author });
      setError("");
    } catch (err) {
      setError("לא ניתן לטעון ציטוט, נסה שוב מאוחר יותר.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white text-center">
      {loading ? (
        <p className="text-gray-500">🔄 טוען ציטוט...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <blockquote className="text-lg italic text-gray-700">
          "{quote?.content}" <br />
          <span className="font-bold text-gray-900">- {quote?.author}</span>
        </blockquote>
      )}
      <button
        onClick={fetchQuote}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        🔄 רענן ציטוט
      </button>
    </div>
  );
};

export default QuoteBox;
