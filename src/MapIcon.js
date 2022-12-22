import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    toggleBusinessMuted,
} from './redux/userInfoSlice';

import blank from './img/blank.png';
import { useNotifyBusiness } from './Notification';

const mapStateToProps = (state, ownProps) => {
    let businessInfo = state.userInfo[ownProps.business];
    
    let newProps = {
        owned: businessInfo.owned,
        muted: businessInfo.muted,
        audioEnabled: state.userInfo.settings.audio.enabled,
        position: businessInfo.map_position,
        updateState: state.session.updateState,
        boost: businessInfo.boost,
    }
    
    return newProps;
}

const MapIcon = (props) => {

    const dispatch = useDispatch();
    
    function muteBusiness() {
        dispatch(toggleBusinessMuted(props.business));
    }

    let boosted = props.boost > 0;
    let flashState = useNotifyBusiness(props.business) && props.updateState;
    let activeHighlight = " flashRed";
    let inactiveHighlight = (boosted ? " flashGreen" : "");
    let highlightState = (flashState ? activeHighlight : inactiveHighlight);
    
    let mapIcon = null;
    let muteIcon = null;
    if (props.owned) {
        mapIcon = (
            <img
                id={props.business + "_map"}
                src={blank}
                className={"icons icons-map icons-" + props.business + (props.muted != null ? " clickable" : "") + highlightState}
                alt={props.full_name + " icon"}
                style={{
                    top: props.position.y + "%",
                    left: props.position.x + "%",
                }}
                onClick={props.muted != null ? muteBusiness : undefined}
            />
        );

        if (props.muted) {
            muteIcon = (
                <img
                    id={props.business + "_mute"}
                    src={blank}
                    className="icons icons-map icons-mute"
                    alt={props.full_name + " mute icon"}
                    style={{
                        top: "calc(" + props.position.y + "% - 8px)",
                        left: "calc(" + props.position.x + "% + 8px)",
                    }}
                />
            )
        }
    }

    return (
        <React.Fragment>
            {mapIcon}
            {muteIcon}
        </React.Fragment>
    );
}

export default connect(mapStateToProps)(MapIcon);
