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
    <tr className="border-b">
      <td className="py-4 px-6 text-blue-500 font-semibold">{stock.name}</td>
      <td className="py-4 px-6">{stock.id}</td>
      <td className="py-4 px-6">${stock.price}</td>
      <td className={`py-4 px-6 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.change}%</td>
      <td className="py-4 px-6">${stock.high}</td>
      <td className="py-4 px-6">${stock.low}</td>
      <td className="py-4 px-6">{stock.quantity}</td>
      <td className="py-4 px-6 flex space-x-4">
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          min="0"
          className="border rounded p-2 w-16"
        />
        <button
          className="bg-black text-white p-2 rounded"
          onClick={handleBuy}
        >
          Buy
        </button>
        <button
          className="bg-black text-white p-2 rounded"
          onClick={handleSell}
        >
          Sell
        </button>
      </td>
    </tr>
  );
};

export default StockItem;