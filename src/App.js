import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("https://options-flow-backend.onrender.com/api/options-flow")
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw new Error(err.error); });
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Options Flow Monitor</h1>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: 4 }}>
          {error}
        </div>
      )}

      {!error && data.length === 0 && <p>No data available</p>}

      {!error && data.map(stock => (
        <div key={stock.symbol} style={{ marginTop: 20, padding: 15, background: '#fff', borderRadius: 6 }}>
          <h2>{stock.symbol} <span style={{ color: stock.sentiment === 'BULLISH' ? 'green' : 'red' }}>{stock.sentiment}</span></h2>

          {stock.calls.length > 0 && (
            <>
              <h4>Calls</h4>
              <table width="100%">
                <thead>
                  <tr><th>Strike</th><th>Volume</th><th>OI</th></tr>
                </thead>
                <tbody>
                  {stock.calls.map((c, i) => (
                    <tr key={i}>
                      <td>{c.strike}</td>
                      <td>{c.volume}</td>
                      <td>{c.openInterest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {stock.puts.length > 0 && (
            <>
              <h4>Puts</h4>
              <table width="100%">
                <thead>
                  <tr><th>Strike</th><th>Volume</th><th>OI</th></tr>
                </thead>
                <tbody>
                  {stock.puts.map((p, i) => (
                    <tr key={i}>
                      <td>{p.strike}</td>
                      <td>{p.volume}</td>
                      <td>{p.openInterest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
