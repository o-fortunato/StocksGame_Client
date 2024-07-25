import React from 'react';
import StockItem from './stockitem';

const StockList = ({ stocks, onTransaction, headers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            {headers.map((header, index) => (
              <th key={index} className="py-4 px-80 text-left">{header}</th>
            ))}
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