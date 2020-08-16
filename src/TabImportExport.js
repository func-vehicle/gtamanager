import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setResourceValue,
    setImportExportCooldown,
} from './redux/userInfoSlice.js';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";
import { PopupSetupImportExport } from './Popup';

const mapStateToProps = (state) => {
    let newProps = {
        owned: state.userInfo.importExport.owned,
        highendCars: state.userInfo.importExport.highend_cars,
        cooldown: state.userInfo.importExport.cooldown,
    }
    return newProps;
}

export const TabImportExport = (props) => {
    //const context = useContext(InfoContext);
    const dispatch = useDispatch();

    function showSetupImportExport(e) {
        // let popupStack = [<PopupSetupImportExport />];
        // context.setState((previousState) => update(previousState, {
        //     popupStack: {$set: popupStack}
        // }));
    }

    function sourceCar(e) {
        let newValue = Math.min(props.highendCars + 1, 20);
        let payload = {
            business: "importExport",
            resource: "highend_cars",
            value: newValue,
        };
        dispatch(setResourceValue(payload));
    }

    function sellCars(e) {
        let element = e.target.previousSibling;
        let toSell = parseInt(element.options[element.selectedIndex].text, 10);
        let newCars = Math.max(props.highendCars - toSell, 0);
        let newTime = (toSell + 1) * 10 * (60 * 1000);
        let payload = {
            business: "importExport",
            resource: "highend_cars",
            value: newCars,
        };
        dispatch(setResourceValue(payload));
        payload = newTime;
        dispatch(setImportExportCooldown(payload));
    }

    const disableSell = props.cooldown > 0;
    let sellString;
    if (disableSell) {
        sellString = formatTimeString(props.cooldown);
    }
    else {
        sellString = "Sell";
    }

    let content = null;
    if (props.owned) {
        content = (
            <div className="content">
                <div className="fsz">
                    <button onClick={sourceCar} className="button green">Source ({props.highendCars})</button>
                    {/* <button className="button purple">View</button> */}
                </div>
                <div>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    <button onClick={sellCars} disabled={disableSell} className="button blue">{sellString}</button>
                </div>
            </div>
        );
    }

    return (
        <div id="importExport" className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-importExport" alt={staticInfo.importExport.fullName + " icon"}/>
                </div>
                <h1>{staticInfo.importExport.shortName}</h1>
                <button onClick={showSetupImportExport} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default connect(mapStateToProps)(TabImportExport);