import React, { useState } from 'react';

const StockItem = ({ stock, onTransaction }) => {
  const [shares, setShares] = useState(0);

  const handleBuy = () => {
    onTransaction(stock.id, shares, 'buy');
    setShares(0); // reset input
  };

  const handleSell = () => {
    onTransaction(stock.id, shares, 'sell');
    setShares(0); // reset input
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h2 className="text-lg font-bold">{stock.name}</h2>
      <p>Price: ${stock.price}</p>
      <p>High: ${stock.high}</p>
      <p>Low: ${stock.low}</p>
      <p>Change: {stock.change}%</p>
      <p>Quantity Owned: {stock.quantity}</p>
      <div className="flex mt-4">
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          min="0"
          className="border rounded p-2 flex-grow mr-2"
        />
        <button
          className="bg-green-500 text-white p-2 rounded mr-2"
          onClick={handleBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleSell}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockItem;