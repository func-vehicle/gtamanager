import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { TabProgressBar } from './TabProgressBar';
import blank from "./img/blank.png";

class TabMCBusiness extends React.Component {
    static contextType = InfoContext;

    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.sellAllProduct = this.sellAllProduct.bind(this);
        this.buyFullSupplies = this.buyFullSupplies.bind(this);
    }

    sellAllProduct() {
        this.context.setState((previousState) => update(previousState, {
            userInfo: { 
                [this.props.business]: {
                    product: {$set: 0},
                }
            }
        }));
    }

    buyFullSupplies() {
        let userInfo = this.context.userInfo;
        let upgradeIndex = (userInfo[this.props.business].upgrades.equipment ? 1 : 0) + (userInfo[this.props.business].upgrades.staff ? 1 : 0);
        let maxSupplies = staticInfo[this.props.business].maxSupplies[upgradeIndex];
        this.context.setState((previousState) => update(previousState, {
            userInfo: { 
                [this.props.business]: {
                    supplies: {$set: maxSupplies},
                }
            }
        }));
    }

    render() {
        const owned = this.context.userInfo[this.props.business].owned;
        let content = null;
        if (owned) {
            content = (
                <div className="content">
                    <table>
                        <tbody>
                            <TabProgressBar business={this.props.business} type="product" label="Product" />
                            <TabProgressBar business={this.props.business} type="supplies" label="Supplies" />
                        </tbody>
                    </table>
                    <div className="fsz">
                        <button onClick={this.buyFullSupplies} className="button green">Resupply</button>
                        <button onClick={this.sellAllProduct} className="button blue">Sell</button>
                    </div>
                </div>
            );
        }

        return (
            <div id={this.props.business} className="information">
                <div className="business_heading clearfix">
                    <div className="icon_wrap">
                        <img
                            src={blank}
                            className={"icons icons-info icons-" + this.props.business}
                            alt={staticInfo[this.props.business].fullName + " icon"}
                        />
                    </div>
                    <h1>{staticInfo[this.props.business].shortName}</h1>
                    <button className="button setup">
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
                {content}
            </div>
        );
    }
}

export default TabMCBusiness;
