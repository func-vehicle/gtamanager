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
        index: state.location.index,
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
        dispatch(setBanner("BannerPaused"));
    }

    function confirmLocation() {
        dispatch(setCoordinates([currentLocation.x, currentLocation.y]));
        dispatch(setBanner("BannerPaused"));
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

export const BannerCustomLocation = (props) => {

    const dispatch = useDispatch();

    function changeToSelect() {
        dispatch(toggleMode());
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
    // Value is an array with string name and object properties
    return React.createElement(stringElementMap[object[0]], object[1]);
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