import React, { useContext } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { TabProgressBar } from './TabProgressBar';
import blank from "./img/blank.png";

export const TabBunker = (props) => {
    const context = useContext(InfoContext);

    function sellAllProduct() {
        context.setState((previousState) => update(previousState, {
            userInfo: { 
                bunker: {
                    product: {$set: 0},
                }
            }
        }));
    }

    function buyFullSupplies() {
        let upgradeIndex = (context.userInfo.bunker.upgrades.equipment ? 1 : 0) + (context.userInfo.bunker.upgrades.staff ? 1 : 0);
        let maxSupplies = staticInfo.bunker.maxSupplies[upgradeIndex];
        context.setState((previousState) => update(previousState, {
            userInfo: { 
                bunker: {
                    supplies: {$set: maxSupplies},
                }
            }
        }));
    }

    const owned = context.userInfo.bunker.owned;
    let content = null;
    if (owned) {
        content = (
            <div className="content">
                <table>
                    <tbody>
                        <TabProgressBar business="bunker" type="product" label="Product" />
                        <TabProgressBar business="bunker" type="research" label="Research" />
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
                <button className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default TabBunker;