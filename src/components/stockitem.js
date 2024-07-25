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
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6">{stock.name}</td>
      <td className="py-4 px-6">{stock.id}</td>
      <td className="py-4 px-6">${stock.price}</td>
      <td className={`py-4 px-6 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change}%</td>
      <td className="py-4 px-6">${stock.high}</td>
      <td className="py-4 px-6">${stock.low}</td>
      <td className="py-4 px-6">{stock.quantity}</td>
      <td className="py-4 px-6 flex space-x-2">
        <input
          type="number"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          min="0"
          className="border rounded p-2 w-24"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleSell}
        >
          Sell
        </button>
      </td>
    </tr>
  );
};

export default StockItem;