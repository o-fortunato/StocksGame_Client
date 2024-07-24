import React from 'react';
import StockItem from './stockitem';

const StockList = ({ stocks, onTransaction }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-4 px-8 text-left">Symbol/Company</th>
            <th className="py-4 px-8 text-left">Rank</th>
            <th className="py-4 px-8 text-left">Price</th>
            <th className="py-4 px-8 text-left">Price % Chg</th>
            <th className="py-4 px-8 text-left">High</th>
            <th className="py-4 px-8 text-left">Low</th>
            <th className="py-4 px-8 text-left">Quantity Owned</th>
            <th className="py-4 px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <StockItem key={stock.id} stock={stock} onTransaction={onTransaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;