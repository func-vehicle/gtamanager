import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    setBanner,
} from './redux/sessionSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { staticInfo } from './InfoContext';

export const BannerPaused = () => {
    return (
        <div id="pausedMiniNotif">
            <p>The business manager is paused.</p>
        </div>
    );
}

export const BannerSelectLocation = (props) => {

    const dispatch = useDispatch();
    const [state, setState] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const numLocations = staticInfo[props.business].locations.length;
    let currentLocation = staticInfo[props.business].locations[state];

    function previousLocation() {
        setState((state - 1 + numLocations) % numLocations);
    }

    function nextLocation() {
        setState((state + 1) % numLocations);
    }

    function cancel() {
        dispatch(setBanner("BannerPaused"));
    }

    function confirmLocation() {
        dispatch(setBanner("BannerPaused"));
    }

    function changeToManual() {
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
                <button onClick={cancel} className="button red"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={confirmLocation} className="button red"><FontAwesomeIcon icon={faTimes} /></button>
                <button onClick={changeToManual} className="button red"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
        </div>
    );
};

export const BannerCustomLocation = (props) => {

    const dispatch = useDispatch();

    function changeToSelect() {
        dispatch(setBanner(["BannerSelectLocation", { business: props.business }]));
    }

    return (
        <div id="customLocation" className="has-buttons">
            <div className="left">
                <p className="desktop-only">Click map to choose custom location.</p>
                <p className="mobile-only">Tap map to choose custom location.</p>
            </div>
            <div className="right">
                <button className="button red"><FontAwesomeIcon icon={faCheck} /></button>
                <button className="button red"><FontAwesomeIcon icon={faTimes} /></button>
                <button onClick={changeToSelect} className="button red"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
        </div>
    );
};

const stringElementMap = {
    BannerPaused,
    BannerSelectLocation,
    BannerCustomLocation,
}

function createBanner(object) {
    // Value is either an array with string name and object properties
    if (Array.isArray(object)) {
        return React.createElement(stringElementMap[object[0]], object[1]);
    }
    // Or just the string name
    return React.createElement(stringElementMap[object]);
}

const mapStateToProps = (state) => {
    let newProps = {
        banner: state.session.banner,
    }
    return newProps;
}

const BannerNotification = (props) => {
    let bannerContainer = null;
    if (props.banner != null) {
        bannerContainer = (
            <div id="mini_notif">
                {createBanner(props.banner)}
            </div>
        );
    }

    return bannerContainer;
}

export default connect(mapStateToProps)(BannerNotification);