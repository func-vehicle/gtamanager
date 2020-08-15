import React, { useContext, useState, useEffect } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";

export const TabWheel = (props) => {
    const context = useContext(InfoContext);
    const [, setState] = useState(Date.now());

    // Set up timer
    useEffect(() => {
        let interval = setInterval(() => setState(Date.now()), 1000);
        return () => {
            clearInterval(interval);
         }
    }, []);

    function spinWheel() {
        let timestamp = new Date().getTime();
        context.setState((previousState) => update(previousState, {
            userInfo: {
                wheel: {
                    timestamp: {$set: timestamp}
                }
            }
        }));
    }

    const disableSpin = (new Date().getTime() - context.userInfo.wheel.timestamp <= 86400000);
    let spinString;
    if (disableSpin) {
        let remainingMs = 86400000 - (new Date().getTime() - context.userInfo.wheel.timestamp)
        spinString = formatTimeString(remainingMs);
    }
    else {
        spinString = "Spin";
    }

    const owned = context.userInfo.wheel.owned;
    let content = null;
    if (owned) {
        content = (
            <div className="content">
                <button onClick={spinWheel} disabled={disableSpin} className="button purple">{spinString}</button>
            </div>
        );
    }

    return (
        <div id="wheel" className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-wheel" alt={staticInfo.wheel.fullName + " icon"}/>
                </div>
                <h1>{staticInfo.wheel.shortName}</h1>
                <button className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default TabWheel;