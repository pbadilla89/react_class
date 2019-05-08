import React from 'react';

const ActionComponent = ({isUsingRing, clickAction, usingRing, killMe, idActual}) => {
    return (
        <div className="controls" >
            { !usingRing?
                killMe? 
                    (<div style={{textDecoration: "none"}} onClick={(e) => { clickAction("revive", idActual) } }> To Revive </div>) 
                : (
                    <div onClick={(e) => { clickAction("kill", idActual) } }>☠ Kill</div>
                ) : ""
            }
            { !killMe?
                usingRing?
                    (<div >💍 Used Ring</div>)
                    : isUsingRing? "" : (<div onClick={(e) => { clickAction("ring",idActual) } }>💍 Use Ring</div>)
                : ""
            }
        </div>
    )
}
export default ActionComponent
