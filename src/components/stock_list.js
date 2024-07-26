import React from 'react';
import StockItem from './stockitem';

const StockList = ({ stocks = [], onTransaction, onSort }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                <tr className="table-light">
                    <th className="text-center" onClick={() => onSort('name')}>Symbol/Company</th>
                    <th className="text-center" onClick={() => onSort('id')}>Rank</th>
                    <th className="text-center" onClick={() => onSort('price')}>Price</th>
                    <th className="text-center" onClick={() => onSort('change')}>Price % Chg</th>
                    <th className="text-center" onClick={() => onSort('high')}>High</th>
                    <th className="text-center" onClick={() => onSort('low')}>Low</th>
                    <th className="text-center" onClick={() => onSort('quantity')}>Quantity Owned</th>
                    <th className="text-center">Actions</th>
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

