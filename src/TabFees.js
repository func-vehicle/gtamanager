import React, { useContext, useState, useEffect } from 'react';
import update from 'immutability-helper';

import { InfoContext } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";

export const TabFees = (props) => {
    const context = useContext(InfoContext);
    const [, setState] = useState(Date.now());

    // Set up timer
    useEffect(() => {
        let interval = setInterval(() => setState(Date.now()), 1000);
        return () => {
            clearInterval(interval);
         }
    }, []);

    let sessionString;
    if (context.running) {
        let remainingMs = 86400000 - (new Date().getTime() - context.userInfo.wheel.timestamp)
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