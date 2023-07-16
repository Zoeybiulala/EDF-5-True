import React from 'react';
import '../styles/ProgressBar.scss';

const ProgressBar = ({ percentage }) => {
    const progress = percentage

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">{progress}%</span>
        </div>
    );
};

export default ProgressBar;
