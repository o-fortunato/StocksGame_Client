import React, { useState } from 'react';
import StockList from './components/stock_list';
import './index.css'; // Import Tailwind CSS

const initialStocks = [
  { id: 1, name: 'AAPL', price: 150, high: 155, low: 145, change: 1.5, quantity: 10 },
  { id: 2, name: 'GOOGL', price: 2800, high: 2825, low: 2780, change: -0.5, quantity: 5 },
  { id: 3, name: 'AMZN', price: 3400, high: 3450, low: 3350, change: 2.3, quantity: 0 },
  { id: 4, name: 'MSFT', price: 299, high: 305, low: 290, change: 1.0, quantity: 20 },
  { id: 5, name: 'TSLA', price: 750, high: 765, low: 740, change: 0.7, quantity: 2 },
  { id: 6, name: 'FB', price: 360, high: 370, low: 350, change: -1.2, quantity: 7 },
  { id: 7, name: 'NFLX', price: 590, high: 600, low: 580, change: 1.8, quantity: 4 },
  { id: 8, name: 'NVDA', price: 220, high: 230, low: 210, change: 3.0, quantity: 15 },
  { id: 9, name: 'DIS', price: 180, high: 185, low: 175, change: 0.4, quantity: 9 },
  { id: 10, name: 'PYPL', price: 270, high: 275, low: 265, change: -0.9, quantity: 12 }
];

const headers = [
  'Symbol/Company',
  'Rank',
  'Price',
  'Price % Chg',
  'High',
  'Low',
  'Quantity Owned',
  'Actions'
];

function App() {
  const [stocks, setStocks] = useState(initialStocks);

  const handleTransaction = (id, shares, type) => {
    setStocks(prevStocks =>
      prevStocks.map(stock =>
        stock.id === id
        ? { ...stock, quantity: type === 'buy' ? stock.quantity + shares : stock.quantity - shares }
        : stock
      )
    );
  };

  const handleSort = (criteria) => {
    const sortedStocks = [...stocks].sort((a, b) => {
      if (criteria === 'price') return b.price - a.price;
      if (criteria === 'quantity') return b.quantity - a.quantity;
      if (criteria === 'change') return Math.abs(b.change) - Math.abs(a.change);
      return 0;
    });
    setStocks(sortedStocks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Trader</h1>
      <div className="mb-4 flex justify-center space-x-6">
        <button className="bg-green-300 text-black p-2 rounded" onClick={() => handleSort('price')}>Sort by Price</button>
        <button className="bg-green-300 text-black p-2 rounded" onClick={() => handleSort('quantity')}>Sort by Quantity</button>
        <button className="bg-green-300 text-black p-2 rounded" onClick={() => handleSort('change')}>Sort by Change</button>
      </div>
      <StockList stocks={stocks} onTransaction={handleTransaction} headers={headers} />
    </div>
  );
}

export default App;