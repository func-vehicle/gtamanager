import React, { useContext, useState } from 'react';
import update from 'immutability-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { InfoContext, staticInfo } from './InfoContext';

export const BannerPaused = React.memo(() => {

    return (
        <div id="pausedMiniNotif">
            <p>The business manager is paused.</p>
        </div>
    );
});

export const BannerSelectLocation = (props) => {

    const context = useContext(InfoContext);
    const [state, setState] = useState(0);

    const numLocations = staticInfo[props.business].locations.length;
    let currentLocation = staticInfo[props.business].locations[state];

    function previousLocation() {
        setState((state - 1 + numLocations) % numLocations);
    }

    function nextLocation() {
        setState((state + 1) % numLocations);
    }

    function changeToManual() {
        let bannerElement = <BannerCustomLocation
            business={props.business}
        />
        context.setState((previousState) => update(previousState, {
            bannerNotification: {$set: bannerElement}
        }));
    }

    return (
        <div id="selectLocation" className="has-buttons">
            <div className="left">
                <button onClick={previousLocation} className="button red"><FontAwesomeIcon icon={faArrowLeft} /></button>
                <span>{currentLocation.name}</span>
                <button onClick={nextLocation} className="button red"><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            <div className="right">
                <button className="button red"><FontAwesomeIcon icon={faCheck} /></button>
                <button className="button red"><FontAwesomeIcon icon={faTimes} /></button>
                <button onClick={changeToManual} className="button red"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
        </div>
    );
};

export const BannerCustomLocation = (props) => {

    const context = useContext(InfoContext);

    function changeToSelect() {
        let bannerElement = <BannerSelectLocation
            business={props.business}
        />
        context.setState((previousState) => update(previousState, {
            bannerNotification: {$set: bannerElement}
        }));
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

const BannerNotification = () => {
    const context = useContext(InfoContext);

    return (
        <div id="mini_notif">
            {context.bannerNotification}
        </div>
    );
}

export default BannerNotification;