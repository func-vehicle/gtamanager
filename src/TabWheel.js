import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setWheelTimestamp,
} from './redux/userInfoSlice.js';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { PopupSetupWheel } from './Popup';
import { InfoContext, staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";

const mapStateToProps = (state) => {
    let newProps = {
        owned: state.userInfo.wheel.owned,
        timestamp: state.userInfo.wheel.timestamp,
        upgrades: state.userInfo.bunker.upgrades,
    }
    return newProps;
}

export const TabWheel = React.memo((props) => {
    //const context = useContext(InfoContext);
    const dispatch = useDispatch();
    const [, setState] = useState(Date.now());

    console.log("RERENDERING!");

    // Set up timer
    useEffect(() => {
        if (!props.owned || new Date().getTime() - props.timestamp > 86400000) return;
        let interval = setInterval(() => setState(Date.now()), 1000);
        return () => {
            clearInterval(interval);
         }
    }, [props.timestamp, props.owned]);

    function showSetupWheel(e) {
        let popupStack = [<PopupSetupWheel />];
        // context.setState((previousState) => update(previousState, {
        //     popupStack: {$set: popupStack}
        // }));
    }

    function spinWheel() {
        let timestamp = new Date().getTime();
        dispatch(setWheelTimestamp(timestamp));
    }

    const disableSpin = (new Date().getTime() - props.timestamp <= 86400000);
    let spinString;
    if (disableSpin) {
        let remainingMs = 86400000 - (new Date().getTime() - props.timestamp)
        spinString = formatTimeString(remainingMs);
    }
    else {
        spinString = "Spin";
    }

    let content = null;
    if (props.owned) {
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
                <button onClick={showSetupWheel} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
});

export default connect(mapStateToProps)(TabWheel);