import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://options-flow-backend.onrender.com")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Options Flow Monitor</h1>
      <div className="grid grid-cols-3 gap-6">
        {data.map(stock => (
          <div key={stock.symbol} className="bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{stock.symbol}</h2>
            <div className={`mb-4 font-bold ${
              stock.sentiment === 'BULLISH' ? 'text-green-400' 
              : stock.sentiment === 'BEARISH' ? 'text-red-400' 
              : 'text-yellow-400'
            }`}>
              {stock.sentiment}
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Strike</th>
                  <th>Type</th>
                  <th>Vol</th>
                  <th>OI</th>
                </tr>
              </thead>
              <tbody>
                {stock.options.map((opt, i) => (
                  <tr key={i}>
                    <td>{opt.strike}</td>
                    <td>{opt.type}</td>
                    <td>{opt.volume}</td>
                    <td>{opt.oi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
