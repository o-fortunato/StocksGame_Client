import React, { useState } from 'react';
import StockList from './components/stock_list';

const initialStocks = [
  { id: 1, name: 'AAPL', price: 150 },
  { id: 2, name: 'GOOGL', price: 2800 },
  { id: 3, name: 'AMZN', price: 3400 },
  { id: 4, name: 'MSFT', price: 299 },
  { id: 5, name: 'TSLA', price: 750 },
  { id: 6, name: 'FB', price: 360 },
  { id: 7, name: 'NFLX', price: 590 },
  { id: 8, name: 'NVDA', price: 220 },
  { id: 9, name: 'DIS', price: 180 },
  { id: 10, name: 'PYPL', price: 270 }
];

function App() {
  const [stocks, setStocks] = useState(initialStocks);

  const handleTransaction = (id, shares, type) => {
    console.log(`${type} ${shares} shares of stock with id ${id}`);
    // Implement actual buy/sell logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Trader</h1>
      <StockList stocks={stocks} onTransaction={handleTransaction} />
    </div>
  );
}

export default App;
