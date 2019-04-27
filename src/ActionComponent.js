import React, { Component } from 'react';

const ActionComponent = ({useRing, clickAction, ringMe}) => {
    return (
        <div className="controls" >
            <div onClick={(e) => { clickAction("kill") } }>☠ Kill</div>
            { ringMe?
                (<div>💍 Used Ring</div>)
                : useRing? "" : (<div onClick={(e) => { clickAction("ring") } }>💍 Use Ring</div>)
            }
        </div>
    )
}
export default ActionComponent
