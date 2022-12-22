import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setResourceValue,
} from './redux/userInfoSlice.js';
import { 
    pushPopup,
    clearStack,
} from './redux/popupSlice.js';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { staticInfo } from './InfoContext';
import { TabProgressBar } from './TabProgressBar';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";

const mapStateToProps = (state, ownProps) => {
    let newProps = {
        owned: state.userInfo[ownProps.business].owned,
        upgrades: state.userInfo[ownProps.business].upgrades,
        boost: state.userInfo[ownProps.business].boost,
        boostResetTime: state.userInfo[ownProps.business].boostResetTime,
        disableSetup: state.session.banner[0] === "BannerSelectLocation" || state.session.banner[0] === "BannerCustomLocation",
        updateState: null,
    }
    if (newProps.owned && new Date().getTime() < newProps.boostResetTime) {
        // This forces an update every second
        newProps.updateState = state.session.updateState;
    }

    return newProps;
}

const TabMCBusiness = (props) => {

    const dispatch = useDispatch();

    function showSetupMCBusiness(e) {
        dispatch(clearStack());
        dispatch(pushPopup(["PopupSetupMCBusiness", { business: props.business }]));
    }

    function sellAllProduct() {
        let payload = {
            business: props.business,
            resource: "product",
            value: 0,
        };
        dispatch(setResourceValue(payload));
    }

    function buyFullSupplies() {
        let upgradeIndex = (props.upgrades.equipment ? 1 : 0) + (props.upgrades.staff ? 1 : 0);
        let maxSupplies = staticInfo[props.business].maxSupplies[upgradeIndex];
        let payload = {
            business: props.business,
            resource: "supplies",
            value: maxSupplies,
        };
        dispatch(setResourceValue(payload));
    }

    function startBoost() {
        let nextReset = new Date();
        
        if (nextReset.getUTCHours() >= 7) {
            nextReset.setUTCDate(nextReset.getUTCDate() + 1);
        }
        
        nextReset.setUTCHours(7, 0, 0, 0);
        
        let resetPayload = {
            business: props.business,
            resource: "boostResetTime",
            value: nextReset.getTime(),
        };
        dispatch(setResourceValue(resetPayload));
        
        let upgradeIndex = (props.upgrades.equipment ? 1 : 0) + (props.upgrades.staff ? 1 : 0);
        let maxBoost = staticInfo[props.business].maxBoost[upgradeIndex];
        let boostPayload = {
            business: props.business,
            resource: "boost",
            value: maxBoost,
        };
        dispatch(setResourceValue(boostPayload));
    }

    let content = null;
    
    if (props.owned) {
        let boostButton = null;
        
        // TODO: Probably better to have a "boostable" flag but I'm lazy right now.
        if (props.business === "acid") {
            let resetTime = props.boostResetTime;
            let nowTime = new Date().getTime();
            const disableBoost = nowTime < resetTime;
            let boostString;
            if (disableBoost) {
                let remainingMs = resetTime - nowTime;
                boostString = formatTimeString(remainingMs);
            }
            else {
                boostString = "Boost";
            }
            boostButton = <button onClick={startBoost} disabled={disableBoost} className="button purple">{boostString}</button>;
        }
        
        content = (
            <div className="content">
                <table>
                    <tbody>
                        <TabProgressBar business={props.business} type="product" label="Product" />
                        <TabProgressBar business={props.business} type="supplies" label="Supplies" />
                    </tbody>
                </table>
                <div className="fsz">
                    <button onClick={buyFullSupplies} className="button green">Resupply</button>
                    <button onClick={sellAllProduct} className="button blue">Sell</button>
                    { boostButton }
                </div>
            </div>
        );
    }

    return (
        <div id={props.business} className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img
                        src={blank}
                        className={"icons icons-info icons-" + props.business}
                        alt={staticInfo[props.business].fullName + " icon"}
                    />
                </div>
                <h1>{staticInfo[props.business].shortName}</h1>
                <button onClick={showSetupMCBusiness} disabled={props.disableSetup} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default connect(mapStateToProps)(TabMCBusiness);
