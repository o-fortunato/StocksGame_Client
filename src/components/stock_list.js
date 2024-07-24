import React from 'react';
import StockItem from './stockitem';

const StockList = ({ stocks, onTransaction }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stocks.map(stock => (
        <StockItem key={stock.id} stock={stock} onTransaction={onTransaction} />
      ))}
    </div>
  );
};

export default StockList;