import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    setBanner,
} from './redux/sessionSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { staticInfo } from './InfoContext';
import {
    toggleMode,
    setSelectedIndex,
    setCoordinates,
} from './redux/locationSlice';
import { mod } from './Utility';

export const BannerPaused = () => {
    return (
        <div id="pausedMiniNotif">
            <p>The business manager is paused.</p>
        </div>
    );
}

export const BannerSelectLocation = connect((state) => {
    let newProps = {
        business: state.location.business,
        index: state.location.index,
        running: state.session.running,
    }
    return newProps;
})((props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const numLocations = staticInfo[props.business].locations.length;
    const currentLocation = staticInfo[props.business].locations[props.index];

    function previousLocation() {
        let newIndex = mod(props.index - 1, numLocations);
        dispatch(setSelectedIndex(newIndex));
    }

    function nextLocation() {
        let newIndex = mod(props.index + 1, numLocations);
        dispatch(setSelectedIndex(newIndex));
    }

    function cancel() {
        dispatch(setCoordinates([null, null]));
        if (props.running) {
            dispatch(setBanner(null));
        }
        else {
            dispatch(setBanner("BannerPaused"));
        }
    }

    function confirmLocation() {
        dispatch(setCoordinates([currentLocation.x, currentLocation.y]));
        if (props.running) {
            dispatch(setBanner(null));
        }
        else {
            dispatch(setBanner("BannerPaused"));
        }
    }

    function changeToManual() {
        dispatch(toggleMode());
        dispatch(setBanner(["BannerCustomLocation", { business: props.business }]));
    }

    return (
        <div id="selectLocation" className="has-buttons">
            <div className="left">
                <button onClick={previousLocation} className="button red"><FontAwesomeIcon icon={faArrowLeft} /></button>
                <span>{currentLocation.name}</span>
                <button onClick={nextLocation} className="button red"><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            <div className="right">
                <button onClick={confirmLocation} className="button red"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={cancel} className="button red"><FontAwesomeIcon icon={faTimes} /></button>
                <button onClick={changeToManual} className="button red"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
        </div>
    );
});

export const BannerCustomLocation = connect((state) => {
    let newProps = {
        xPos: state.location.x,
        yPos: state.location.y,
        running: state.session.running,
    }
    return newProps;
})((props) => {

    const dispatch = useDispatch();

    function cancel() {
        dispatch(setCoordinates([null, null]));
        if (props.running) {
            dispatch(setBanner(null));
        }
        else {
            dispatch(setBanner("BannerPaused"));
        }
    }

    function confirmLocation() {
        if (props.running) {
            dispatch(setBanner(null));
        }
        else {
            dispatch(setBanner("BannerPaused"));
        }
    }

    function changeToSelect() {
        dispatch(toggleMode());
        dispatch(setBanner(["BannerSelectLocation", { business: props.business }]));
    }

    let hint;
    if (props.xPos == null) {
        hint = (
            <React.Fragment>
                <p className="desktop-only">Click map to choose custom location.</p>
                <p className="mobile-only">Tap map to choose custom location.</p>
            </React.Fragment>
        );
    }
    else {
        hint = (
            <React.Fragment>
                <p className="desktop-only">Click icon to relocate.</p>
                <p className="mobile-only">Tap icon to relocate.</p>
            </React.Fragment>
        );
    }

    return (
        <div id="customLocation" className="has-buttons">
            <div className="left">
                {hint}
            </div>
            <div className="right">
                <button onClick={confirmLocation} disabled={props.xPos == null} className="button red"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={cancel} className="button red"><FontAwesomeIcon icon={faTimes} /></button>
                <button onClick={changeToSelect} className="button red"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
        </div>
    );
});

const stringElementMap = {
    BannerPaused,
    BannerSelectLocation,
    BannerCustomLocation,
}

function createBanner(arr) {
    // Array has string name and object properties
    return React.createElement(stringElementMap[arr[0]], arr[1]);
}

const mapStateToProps = (state) => {
    let newProps = {
        banner: state.session.banner,
    }
    return newProps;
}

const BannerNotification = (props) => {
    let bannerContainer = null;
    if (props.banner[0] != null) {
        bannerContainer = (
            <div id="mini_notif">
                {createBanner(props.banner)}
            </div>
        );
    }

    return bannerContainer;
}

export default connect(mapStateToProps)(BannerNotification);
