import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    setSelectedIndex
} from './redux/locationSlice';

import { staticInfo } from './InfoContext';
import blank from './img/blank.png';

export const MapPlaceableIcon = (props) => {
    let style;
    if (props.x == null) {
        style = {
            display: "none",
        }
    }
    else {
        style = {
            top: props.y + "%",
            left: props.x + "%",
        }
    }

    return (
        <img
            src={blank}
            id="icon-placing"
            className={"icons icons-map icons-" + props.business + (props.clickable ? " clickable" : " icons-placing")}
            alt={props.business + " icon"}
            style={style}
        />
    );
}

const mapStateToProps = (state, ownProps) => {
    let newProps = {
        selected: state.location.index === ownProps.index,
    }
    return newProps;
}

export const MapGhostIcon = (props) => {

    const dispatch = useDispatch();
    
    function setSelected() {
        dispatch(setSelectedIndex(props.index));
    }

    let location = staticInfo[props.business].locations[props.index];

    return (
        <img
            src={blank}
            className={"icons icons-map icons-" + props.business + (props.selected ? "" : " clickable faded")}
            alt={location.name + " " + props.business + " icon"}
            style={{
                    top: location.y + "%",
                    left: location.x + "%",
            }}
            onClick={props.selected ? undefined : setSelected}
        />
    );
}

export default connect(mapStateToProps)(MapGhostIcon);
