import React, { useContext, useState, useEffect } from 'react';
import update from 'immutability-helper';

import { InfoContext } from './InfoContext';
import { formatTimeString, mod } from './Utility';
import blank from "./img/blank.png";

export const TabFees = (props) => {
    const context = useContext(InfoContext);
    const [state, setState] = useState({
        finish: new Date().getTime(),
        current: new Date().getTime() + 2880000,
    });
    
    // Update timer
    const updateState = () => {
        setState((previousState) => update(previousState, {
            current: {$set: new Date().getTime()}
        }));
    }

    // Set up reference point, interval
    useEffect(() => {
        if (!context.running) return;
        setState((previousState) => update(previousState, {
            finish: {$set: new Date().getTime() + 2880000}
        }));
        let interval = setInterval(updateState, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [context.running]);

    let sessionString;
    if (context.running) {
        let remainingMs = mod(state.finish - state.current, 2881000);
        sessionString = formatTimeString(remainingMs);
    }
    else {
        sessionString = "Not in Session";
    }

    return (
        <div id="fees" className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-fees" alt="Daily Fees icon"/>
                </div>
                <h1>Daily Fees</h1>
            </div>
            <button className="button purple" disabled={true}>{sessionString}</button>
        </div>
    );
}

export default TabFees;