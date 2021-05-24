import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setResourceValue,
    setImportExportCooldown,
} from './redux/userInfoSlice.js';
import { 
    pushPopup,
    clearStack,
} from './redux/popupSlice.js';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";


const mapStateToProps = (state) => {
    let newProps = {
        owned: state.userInfo.importExport.owned,
        highendCars: state.userInfo.importExport.highend_cars,
        cooldown: state.userInfo.importExport.cooldown,
        disableSetup: state.session.banner[0] === "BannerSelectLocation" || state.session.banner[0] === "BannerCustomLocation",
    }
    return newProps;
}

export const TabImportExport = (props) => {

    const dispatch = useDispatch();

    function showSetupImportExport(e) {
        dispatch(clearStack());
        dispatch(pushPopup("PopupSetupImportExport"));
    }

    function sourceCar(e) {
        let newCars = Math.min(props.highendCars + 1, 20);
        let payload = {
            business: "importExport",
            resource: "highend_cars",
            value: newCars,
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
                    {/* <button disabled={props.disableSetup} className="button purple">View</button> */}
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
                <button onClick={showSetupImportExport} disabled={props.disableSetup} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default connect(mapStateToProps)(TabImportExport);
