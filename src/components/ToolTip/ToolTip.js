import React from 'react';

function ToolTip ({ id, show }) {
    return (
        <div className={`tool-tip ${id === show ? 'show' : ''}`}>
            <div className="tool-tip--triangle"> </div>
            <div className="tool-tip--message">
                <div className="tool-tip--message-box black" /> Right color | Right space
            </div>
            <div className="tool-tip--message">
                <div className="tool-tip--message-box white" /> Right color | Wrong space
            </div>
        </div>
    );
}

export default ToolTip;
