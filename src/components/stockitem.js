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
        <tr>
            <td className="text-primary fw-bold">{stock.name}</td>
            <td className="text-center">{stock.id}</td>
            <td className="text-center">${stock.price}</td>
            <td className={`text-center ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>{stock.change}%</td>
            <td className="text-center">${stock.high}</td>
            <td className="text-center">${stock.low}</td>
            <td className="text-center">{stock.quantity}</td>
            <td className="d-flex justify-content-center gap-2">
                <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(Number(e.target.value))}
                    min="0"
                    className="form-control w-25"
                />
                <button className="btn btn-dark" onClick={handleBuy}>
                    Buy
                </button>
                <button className="btn btn-dark" onClick={handleSell}>
                    Sell
                </button>
            </td>
        </tr>
    );
};

export default StockItem;
