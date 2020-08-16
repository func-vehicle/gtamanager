import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setResourceValue,
} from './redux/userInfoSlice.js';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { TabProgressBar } from './TabProgressBar';
import blank from "./img/blank.png";
import { PopupSetupMCBusiness } from './Popup';

const mapStateToProps = (state, ownProps) => {
    let newProps = {
        owned: state.userInfo[ownProps.business].owned,
        upgrades: state.userInfo[ownProps.business].upgrades,
    }
    return newProps;
}

const TabMCBusiness = (props) => {
    //const context = useContext(InfoContext);
    const dispatch = useDispatch();

    function showSetupMCBusiness(e) {
        //let popupStack = [<PopupSetupMCBusiness business={props.business} />];
        // context.setState((previousState) => update(previousState, {
        //     popupStack: {$set: popupStack}
        // }));
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

    let content = null;
    if (props.owned) {
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
                <button onClick={showSetupMCBusiness} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default connect(mapStateToProps)(TabMCBusiness);
