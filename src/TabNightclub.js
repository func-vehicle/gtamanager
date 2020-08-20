import React from 'react';
import { useDispatch, connect } from 'react-redux';
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
        owned: state.userInfo.nightclub.owned,
        showUnproduced: state.userInfo.nightclub.sidebar,
        producing: state.userInfo.nightclub.producing,
        disableSetup: state.session.banner[0] === "BannerSelectLocation" || state.session.banner[0] === "BannerCustomLocation",
    }
    return newProps;
}

export const TabNightclub = React.memo((props) => {
    
    const dispatch = useDispatch();

    function showSetupNightclub(e) {
        dispatch(clearStack());
        dispatch(pushPopup("PopupSetupNightclub"));
    }

    function showModifyNightclub(e) {
        dispatch(clearStack());
        dispatch(pushPopup("PopupModifyNightclub"));
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

    let content = null;
    if (props.owned) {
        content = (
            <div className="content">
                <table>
                    <tbody>
                        {Object.keys(product_objects).map((key) => (
                            <React.Fragment key={key}>
                                {(!props.showUnproduced || props.producing[key]) && product_objects[key]}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <button onClick={showModifyNightclub} disabled={props.disableSetup} className="button purple">Modify</button>
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
                <button onClick={showSetupNightclub} disabled={props.disableSetup} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
});

export default connect(mapStateToProps)(TabNightclub);