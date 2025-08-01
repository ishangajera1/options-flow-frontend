import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://options-flow-backend.onrender.com/api/options-flow") // Replace with your backend URL
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);
  }, []);

  const sentimentColors = {
    BULLISH: 'bg-green-100 text-green-800',
    BEARISH: 'bg-red-100 text-red-800',
    NEUTRAL: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-black p-8 font-sans text-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
          Options Flow Monitor
        </h1>
        <p className="text-lg text-gray-300">
          Real-time bullish and bearish sentiment for your configured stocks
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.length === 0 && (
          <p className="col-span-full text-center text-gray-400">Loading data...</p>
        )}

        {data.map(stock => (
          <div
            key={stock.symbol}
            className="bg-gray-800 bg-opacity-70 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-wide">{stock.symbol}</h2>
              <span
                className={`px-3 py-1 rounded-full font-semibold text-sm ${
                  sentimentColors[stock.sentiment] || 'bg-gray-300 text-gray-800'
                }`}
              >
                {stock.sentiment}
              </span>
            </div>

            <table className="w-full text-sm text-gray-200 border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 text-left">Strike</th>
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-right">Vol</th>
                  <th className="py-2 text-right">OI</th>
                </tr>
              </thead>
              <tbody>
                {stock.options.map((opt, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <td className="py-2">{opt.strike}</td>
                    <td className="py-2">{opt.type}</td>
                    <td className="py-2 text-right">{opt.volume.toLocaleString()}</td>
                    <td className="py-2 text-right">{opt.oi.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © 2025 Options Flow Monitor — View Only
      </footer>
    </div>
  );
}

export default App;
