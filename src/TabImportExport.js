import React, { useContext } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";
import { PopupSetupImportExport } from './Popup';

export const TabImportExport = (props) => {
    const context = useContext(InfoContext);

    function showSetupImportExport(e) {
        let popupStack = [<PopupSetupImportExport />];
        context.setState((previousState) => update(previousState, {
            popupStack: {$set: popupStack}
        }));
    }

    function sourceCar(e) {
        let newValue = Math.min(context.userInfo.importExport.highend_cars + 1, 20);
        context.setState((previousState) => update(previousState, {
            userInfo: {
                importExport: {
                    highend_cars: {$set: newValue}
                }
            }
        }));
    }

    function sellCars(e) {
        let element = e.target.previousSibling;
        let toSell = parseInt(element.options[element.selectedIndex].text, 10);
        let newCars = Math.max(context.userInfo.importExport.highend_cars - toSell, 0);
        let newTime = (toSell + 1) * 10 * (60 * 1000);
        context.setState((previousState) => update(previousState, {
            userInfo: {
                importExport: {
                    highend_cars: {$set: newCars},
                    cooldown: {$set: newTime},
                }
            }
        }));
    }

    const disableSell = context.userInfo.importExport.cooldown > 0;
    let sellString;
    if (disableSell) {
        sellString = formatTimeString(context.userInfo.importExport.cooldown);
    }
    else {
        sellString = "Sell";
    }

    const owned = context.userInfo.importExport.owned;
    let content = null;
    if (owned) {
        content = (
            <div className="content">
                <div className="fsz">
                    <button onClick={sourceCar} className="button green">Source ({context.userInfo.importExport.highend_cars})</button>
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

export default TabImportExport;