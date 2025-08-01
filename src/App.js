import { useEffect, useState } from 'react';

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(90deg, #3b82f6, #6366f1, #1e3a8a)', // blue gradient
    color: '#f3f4f6',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
    textShadow: '0 2px 6px rgba(0,0,0,0.7)',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
  },
  card: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)', // slate-800 with opacity
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
    transition: 'box-shadow 0.3s ease',
    cursor: 'default',
  },
  cardHover: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
  },
  stockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockSymbol: {
    fontSize: 22,
    fontWeight: '600',
  },
  sentimentBadge: {
    padding: '4px 12px',
    borderRadius: 9999,
    fontWeight: '700',
    fontSize: 12,
  },
  sentimentColors: {
    BULLISH: { backgroundColor: '#bbf7d0', color: '#166534' }, // green-200/dark green
    BEARISH: { backgroundColor: '#fecaca', color: '#991b1b' }, // red-200/dark red
    NEUTRAL: { backgroundColor: '#fde68a', color: '#92400e' }, // yellow-300/dark yellow
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#e5e7eb',
  },
  th: {
    textAlign: 'left',
    padding: '8px 4px',
    borderBottom: '1px solid #374151',
    fontSize: 14,
    fontWeight: '600',
  },
  td: {
    padding: '6px 4px',
    fontSize: 14,
  },
  tdRight: {
    padding: '6px 4px',
    fontSize: 14,
    textAlign: 'right',
  },
  footer: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
  },
};

export default function App() {
  const [data, setData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    fetch("https://options-flow-backend.onrender.com/api/options-flow") // replace your backend URL
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>Options Flow Monitor</h1>
        <p style={styles.subtitle}>
          Real-time bullish and bearish sentiment for your configured stocks
        </p>
      </header>

      <main style={styles.grid}>
        {data.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9ca3af' }}>
            Loading data...
          </p>
        )}

        {data.map((stock, idx) => (
          <div
            key={stock.symbol}
            style={{
              ...styles.card,
              ...(hoverIndex === idx ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={styles.stockHeader}>
              <h2 style={styles.stockSymbol}>{stock.symbol}</h2>
              <span
                style={{
                  ...styles.sentimentBadge,
                  ...(styles.sentimentColors[stock.sentiment] || {}),
                }}
              >
                {stock.sentiment}
              </span>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Strike</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Vol</th>
                  <th style={styles.th}>OI</th>
                </tr>
              </thead>
              <tbody>
                {stock.options.map((opt, i) => (
                  <tr key={i} style={{ cursor: 'default' }}>
                    <td style={styles.td}>{opt.strike}</td>
                    <td style={styles.td}>{opt.type}</td>
                    <td style={styles.tdRight}>{opt.volume.toLocaleString()}</td>
                    <td style={styles.tdRight}>{opt.oi.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>

      <footer style={styles.footer}>© 2025 Options Flow Monitor — View Only</footer>
    </div>
  );
}
