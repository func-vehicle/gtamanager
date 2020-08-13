import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { capitalize } from './Utility'
import { InfoContext, staticInfo } from './infoContext';
import './html5reset.css';
import './style.css';
import blank from "./img/blank.png";

class MCBusiness extends React.Component {
    static contextType = InfoContext;

    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.sellAllProduct = this.sellAllProduct.bind(this);
        this.buyFullSupplies = this.buyFullSupplies.bind(this);
        this.setTypeValue = this.setTypeValue.bind(this);
    }

    computePortion(type) {
        let userInfo = this.context.userInfo;
        let currentOfType = userInfo[this.props.business][type];
        let upgradeIndex = (userInfo[this.props.business].upgrades.equipment ? 1 : 0) + (userInfo[this.props.business].upgrades.staff ? 1 : 0);
        let maxOfType = staticInfo[this.props.business]["max"+capitalize(type)][upgradeIndex];
        return currentOfType/maxOfType;
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

    setTypeValue(e) {
        let userInfo = this.context.userInfo;
        let upgradeIndex = (userInfo[this.props.business].upgrades.equipment ? 1 : 0) + (userInfo[this.props.business].upgrades.staff ? 1 : 0);
        let type = e.target.name;
        let maxType = staticInfo[this.props.business]["max"+capitalize(type)][upgradeIndex];
        let newValue = Math.round(maxType * e.target.value/100);
        this.context.setState((previousState) => update(previousState, {
            userInfo: { 
                [this.props.business]: {
                    [type]: {$set: newValue},
                }
            }
        }));
    }

    // TODO: make this a proper object!!!
    BarOverlay(type) {
        let userInfo = this.context.userInfo;
        let progressBarOverlay;
        switch (userInfo.settings.progress_bar_style) {
            case 1:
                progressBarOverlay = (
                    <div className="fivetick">
                        <div></div><div></div><div></div><div></div><div></div>
                    </div>
                );
                break;
            case 2:
                let percentage;
                if (type === "supplies")
                    percentage = Math.round(this.computePortion("supplies") * 100);
                else
                    percentage = Math.round(this.computePortion("product") * 100);
                progressBarOverlay = <span>{percentage}%</span>;
                break;
            case 3:
                progressBarOverlay = <span>TODO</span>;
                break;
            default:
                progressBarOverlay = null;
                break;
        }
        return progressBarOverlay;
    }

    render() {
        let userInfo = this.context.userInfo;
        return (
            <div id={this.props.business} className="information mcbusiness">
                <div className="business_heading clearfix">
                    <div className="icon_wrap">
                        <img
                        src={blank}
                        className={"icons icons-info icons-" + this.props.business}
                        alt={this.props.full_name + " icon"}
                        />
                    </div>
                    <h1>{this.props.short_name}</h1>
                    <button className="button setup">
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
                <div className="content">
                    <table>
                        <tbody>
                            <tr className={"product" + (userInfo.settings.progress_bar_style > 1 ? " big" : "")}>
                                <td><span>Product</span></td>
                                <td><div className="progress_bar">
                                    {this.BarOverlay("product")}
                                    <input name="product" onChange={this.setTypeValue} type="range" className="slider" min="0" max="100" value={Math.round(this.computePortion("product")*100)} />
                                    <div className="bar" style={{width: this.computePortion("product")*100 + "%"}}></div>
                                </div></td>
                            </tr>
                            <tr className={"supplies" + (userInfo.settings.progress_bar_style > 1 ? " big" : "")}>
                                <td><span>Supplies</span></td>
                                <td><div className="progress_bar">
                                    {this.BarOverlay("supplies")}
                                    <input name="supplies" onChange={this.setTypeValue} type="range" className="slider" min="0" max="100" value={Math.round(this.computePortion("supplies")*100)} />
                                    <div className="bar" style={{width: this.computePortion("supplies")*100 + "%"}}></div>
                                </div></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="fsz">
                        <button onClick={this.buyFullSupplies} className="button supplies green">Resupply</button>
                        <button onClick={this.sellAllProduct} className="button sell blue">Sell</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MCBusiness;
