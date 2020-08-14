import React, { useContext } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import blank from "./img/blank.png";

export const TabImportExport = (props) => {
    const context = useContext(InfoContext);

    function sellCars(e) {

    }

    return (
        <div id="importExport" class="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-importExport" alt={staticInfo.importExport.fullName + " icon"}/>
                </div>
                <h1>{staticInfo.importExport.shortName}</h1>
                <button className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            <div class="content">
                <div class="fsz">
                    <button class="button green">Source ({context.userInfo.importExport.highend_cars})</button>
                    {/* <button class="button modify purple">View</button> */}
                </div>
                <div>
                    <select name="toSell">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                    <button onClick={sellCars} class="button blue">Sell</button>
                </div>
            </div>
        </div>
    );
}

export default TabImportExport;