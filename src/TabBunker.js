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
        hideResearch: state.userInfo.bunker.hide_research,
        upgrades: state.userInfo.bunker.upgrades,
    }
    return newProps;
}

export const TabBunker = React.memo((props) => {

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
        let researchBar = null;
        if (!props.hideResearch) {
            researchBar = <TabProgressBar business="bunker" type="research" label="Research" />;
        }

        content = (
            <div className="content">
                <table>
                    <tbody>
                        <TabProgressBar business="bunker" type="product" label="Product" />
                        {researchBar}
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
                <button onClick={showSetupBunker} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
});

export default connect(mapStateToProps)(TabBunker);