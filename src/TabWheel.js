import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setWheelTimestamp,
} from './redux/userInfoSlice';
import {
    pushPopup,
    clearStack,
} from './redux/popupSlice';
import {
    setWheelOnCooldown,
} from './redux/sessionSlice';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";

const mapStateToProps = (state) => {
    let newProps = {
        owned: state.userInfo.wheel.owned,
        timestamp: state.userInfo.wheel.timestamp,
        disableSetup: state.session.banner[0] === "BannerSelectLocation" || state.session.banner[0] === "BannerCustomLocation",
        updateState: false,
    }
    if (newProps.owned && new Date().getTime() - newProps.timestamp <= 86400000) {
        // This forces an update every second
        newProps.updateState = state.session.updateState;
    }
    else if (state.session.wheel.onCooldown) {
        // Force one last update to change button to 'Spin'
        newProps.updateState = state.session.updateState;
    }
    return newProps;
}

const TabWheel = (props) => {

    const dispatch = useDispatch();

    function showSetupWheel(e) {
        dispatch(clearStack());
        dispatch(pushPopup("PopupSetupWheel"));
    }

    function spinWheel() {
        let timestamp = new Date().getTime();
        dispatch(setWheelTimestamp(timestamp));
    }

    let content = null;
    if (props.owned) {
        const disableSpin = (new Date().getTime() - props.timestamp <= 86400000);
        let spinString;
        if (disableSpin) {
            let remainingMs = 86400000 - (new Date().getTime() - props.timestamp);
            spinString = formatTimeString(remainingMs);
            dispatch(setWheelOnCooldown(true));
        }
        else {
            spinString = "Spin";
            dispatch(setWheelOnCooldown(false));
        }

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
                <button onClick={showSetupWheel} disabled={props.disableSetup} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
};

export default connect(mapStateToProps)(TabWheel);