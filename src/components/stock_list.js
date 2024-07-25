import React from 'react';
import StockItem from './stockitem';

const StockList = ({ stocks = [], onTransaction, onSort }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
                <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('name')}>Symbol/Company</th>
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('id')}>Rank</th>
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('price')}>Price</th>
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('change')}>Price % Chg</th>
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('high')}>High</th>
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('low')}>Low</th>
                    <th className="py-4 px-8 text-left border" onClick={() => onSort('quantity')}>Quantity Owned</th>
                    <th className="py-4 px-8 text-left border">Actions</th>
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

