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

    let product_objects = {
        cargo: <TabProgressBar business="nightclub" type="cargo" label="Cargo" />,
        sporting: <TabProgressBar business="nightclub" type="sporting" label="Sporting" />,
        imports: <TabProgressBar business="nightclub" type="imports" label="Imports" />,
        pharma: <TabProgressBar business="nightclub" type="pharma" label="Pharma" />,
        creation: <TabProgressBar business="nightclub" type="creation" label="Cash" />,
        organic: <TabProgressBar business="nightclub" type="organic" label="Organic" />,
        copying: <TabProgressBar business="nightclub" type="copying" label="Copying" />,
    }

    const owned = context.userInfo.nightclub.owned;
    let content = null;
    if (owned) {
        content = (
            <div className="content">
                <table>
                    <tbody>
                        {Object.keys(product_objects).map((key) => (
                            <React.Fragment key={key}>
                                {(!context.userInfo.nightclub.sidebar || context.userInfo.nightclub.producing[key]) && product_objects[key]}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <button onClick={showModifyNightclub} className="button purple">Modify</button>
            </div>
        );
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
            {content}
        </div>
    );
}

export default TabNightclub;