import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import StockList from './components/stock_list';
import ChatWindow from './components/chat';
import SummaryCard from "./components/summarycard";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Ensure this includes Tailwind CSS imports if using PostCSS

const socket = io('http://localhost:4000'); // Replace with your server URL

const StockGame = ({ player }) => {
  const [stocks, setStocks] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(10000); // Starting balance
  const [previousTotalValue, setPreviousTotalValue] = useState(0);
  const [currentTotalValue, setCurrentTotalValue] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // New state to track game start

  useEffect(() => {
    socket.on('round-started', (stockDTOs) => {
      setStocks(stockDTOs);
      setGameStarted(true); // Update game started state
    });

    fetchWalletInfo(player.id);

    return () => {
      socket.off('round-started');
    };
  }, [player.id]);

  const fetchWalletInfo = async (playerId) => {
    try {
      const response = await fetch(`http://localhost:4000/game/player/${playerId}/wallet`);
      const data = await response.json();
      setCurrentBalance(data.currentBalance);
      setStocks(data.stocks);
      const totalValue = data.stocks.reduce((acc, stock) => acc + stock.price * stock.quantity, 0);
      setPreviousTotalValue(currentTotalValue);
      setCurrentTotalValue(totalValue);
    } catch (error) {
      console.error('Error fetching wallet info:', error);
    }
  };

  const handleTransaction = async (id, shares, type) => {
    try {
      const response = await fetch(`http://localhost:4000/game/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playerId: player.id,
          stockId: id,
          shares: shares,
          type: type
        })
      });
      console.log('Transaction sent');
      const data = await response.json();
      setCurrentBalance(data.currentBalance);
      setStocks(data.stocks);
      const totalValue = data.stocks.reduce((acc, stock) => acc + stock.price * stock.quantity, 0);
      setPreviousTotalValue(currentTotalValue);
      setCurrentTotalValue(totalValue);
    } catch (error) {
      console.error('Error making transaction:', error);
    }
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

  if (!gameStarted) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <h1>Waiting for the game to start...</h1>
      </div>
    );
  }

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
};

export default StockGame;
