import React, { useState, useEffect } from 'react';
import StockList from './components/stock_list';
import ChatWindow from './components/chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Ensure this includes Tailwind CSS imports if using PostCSS
import SummaryCard from "./components/summarycard"; // Import Tailwind CSS for additional custom styles

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

function StockGame({ player }) {
  const [stocks, setStocks] = useState(initialStocks);
  const [currentBalance, setCurrentBalance] = useState(10000); // Starting balance
  const [previousTotalValue, setPreviousTotalValue] = useState(0);
  const [currentTotalValue, setCurrentTotalValue] = useState(0);

  useEffect(() => {
    const totalValue = stocks.reduce((acc, stock) => acc + stock.price * stock.quantity, 0);
    setPreviousTotalValue(currentTotalValue);
    setCurrentTotalValue(totalValue);
  }, [stocks]);

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
      if (criteria === 'name') return a.name.localeCompare(b.name);
      if (criteria === 'price') return b.price - a.price;
      if (criteria === 'quantity') return b.quantity - a.quantity;
      if (criteria === 'change') return Math.abs(b.change) - Math.abs(a.change);
      if (criteria === 'high') return b.high - a.high;
      if (criteria === 'low') return b.low - a.low;
      if (criteria === 'id') return a.id - b.id;
      return 0;
    });
    setStocks(sortedStocks);
  };

  const growth = ((currentTotalValue - previousTotalValue) / (previousTotalValue || 1)) * 100;

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        <div className="col-md-9 p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Stock Trader</h1>
          <StockList stocks={stocks} onTransaction={handleTransaction} onSort={handleSort} />
        </div>
        <div className="col-md-3 d-flex flex-column">
          <div className="flex-grow-1 overflow-hidden border rounded-lg shadow-lg mb-3" style={{ height: '50vh' }}>
            <ChatWindow />
          </div>
          <div className="position-relative">
            <SummaryCard
              currentBalance={currentBalance}
              currentTotalValue={currentTotalValue}
              growth={growth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockGame;
