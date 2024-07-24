import React, { useState } from 'react';

const StockItem = ({ stock, onTransaction }) => {
  const [shares, setShares] = useState(0);

  const handleBuy = () => {
    onTransaction(stock.id, shares, 'buy');
  };

  const handleSell = () => {
    onTransaction(stock.id, shares, 'sell');
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{stock.name}</h2>
      <p>Price: ${stock.price}</p>
      <div className="flex items-center mt-4">
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          className="border p-2 mr-2 w-20"
          min="0"
        />
        <button
          onClick={handleBuy}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockItem;