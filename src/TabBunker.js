import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setResourceValue,
} from './redux/userInfoSlice.js';
import {
    pushPopup,
    clearStack,
} from './redux/popupSlice';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { staticInfo } from './InfoContext';
import { TabProgressBar } from './TabProgressBar';
import blank from "./img/blank.png";

const mapStateToProps = (state) => {
    let newProps = {
        owned: state.userInfo.bunker.owned,
        mode: state.userInfo.bunker.mode,
        showAll: state.userInfo.bunker.show_all,
        upgrades: state.userInfo.bunker.upgrades,
        disableSetup: state.session.banner[0] === "BannerSelectLocation" || state.session.banner[0] === "BannerCustomLocation",
    }
    return newProps;
}

export const TabBunker = (props) => {

    const dispatch = useDispatch();

    const upgradeIndex = (props.upgrades.equipment ? 1 : 0) + (props.upgrades.staff ? 1 : 0);

    function showSetupBunker(e) {
        dispatch(clearStack());
        dispatch(pushPopup("PopupSetupBunker"));
    }

    function sellAllProduct() {
        let payload = {
            business: "bunker",
            resource: "product",
            value: 0,
        };
        dispatch(setResourceValue(payload));
    }

    function buyFullSupplies() {
        let maxSupplies = staticInfo.bunker.maxSupplies[upgradeIndex];
        let payload = {
            business: "bunker",
            resource: "supplies",
            value: maxSupplies,
        };
        dispatch(setResourceValue(payload));
    }
    
    let content = null;
    if (props.owned) {
        let bars = null;
        if (props.showAll) {
            bars = (
                <React.Fragment>
                    <TabProgressBar business="bunker" type="product" label="Product" />
                    <TabProgressBar business="bunker" type="research" label="Research" />
                </React.Fragment>
            );
        }
        else if (props.mode === 0) {
            bars = <TabProgressBar business="bunker" type="product" label="Product" />;
        }
        else {
            bars = <TabProgressBar business="bunker" type="research" label="Research" />;
        }

        content = (
            <div className="content">
                <table>
                    <tbody>
                        {bars}
                        <TabProgressBar business="bunker" type="supplies" label="Supplies" />
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
        <div id="bunker" className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-bunker" alt="Bunker icon"/>
                </div>
                <h1>{staticInfo.bunker.shortName}</h1>
                <button onClick={showSetupBunker} disabled={props.disableSetup} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default connect(mapStateToProps)(TabBunker);