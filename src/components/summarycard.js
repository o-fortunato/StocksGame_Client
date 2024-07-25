import React from 'react';

const SummaryCard = ({ currentBalance, currentTotalValue, growth }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">Summary</h5>
                <p className="card-text"><strong>Current Balance:</strong> ${currentBalance.toFixed(2)}</p>
                <p className="card-text"><strong>Stock Total Value:</strong> ${currentTotalValue.toFixed(2)}</p>
                <p className="card-text"><strong>Growth:</strong> <span className={growth >= 0 ? 'text-success' : 'text-danger'}>{growth.toFixed(2)}%</span></p>
            </div>
        </div>
    );
};

export default SummaryCard;