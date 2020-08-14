import React, { useContext } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import { PopupModifyNightclub } from './Popup';
import { InfoContext, staticInfo } from './InfoContext';
import { TabProgressBar } from './TabProgressBar';
import blank from "./img/blank.png";

export const TabNightclub = (props) => {
    const context = useContext(InfoContext);

    function showModifyNightclub(e) {
        let popupStack = [...context.popupStack];
        popupStack.push(<PopupModifyNightclub />);
        context.setState((previousState) => update(previousState, {
            popupStack: {$set: popupStack}
        }));
    }

    return (
        <div id="nightclub" className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-nightclub" alt={staticInfo.nightclub.fullName + " icon"}/>
                </div>
                <h1>{staticInfo.nightclub.shortName}</h1>
                <button className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            <div className="content">
                <table>
                    <tbody>
                        <TabProgressBar business="nightclub" type="cargo" label="Cargo" />
                        <TabProgressBar business="nightclub" type="sporting" label="Sporting" />
                        <TabProgressBar business="nightclub" type="imports" label="Imports" />
                        <TabProgressBar business="nightclub" type="pharma" label="Pharma" />
                        <TabProgressBar business="nightclub" type="creation" label="Cash" />
                        <TabProgressBar business="nightclub" type="organic" label="Organic" />
                        <TabProgressBar business="nightclub" type="copying" label="Copying" />
                    </tbody>
                </table>
                <button onClick={showModifyNightclub} className="button purple">Modify</button>
            </div>
        </div>
    );
}

export default TabNightclub;