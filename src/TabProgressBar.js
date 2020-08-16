import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setResourceValue,
} from './redux/userInfoSlice.js';

import { staticInfo } from './InfoContext';
import { capitalize, formatTimeString } from './Utility';

const mapStateToProps = (state, ownProps) => {
    let newProps = {
        currentResource: state.userInfo[ownProps.business][ownProps.type],
        upgrades: state.userInfo[ownProps.business].upgrades,
        barStyle: state.userInfo.settings.progress_bar_style,
    }
    if (ownProps.business === "nightclub") {
        newProps.storageFloors = state.userInfo.nightclub.storage_floors;
    }
    return newProps;
}

const TabProgressBarElement = React.memo((props) => {

    const dispatch = useDispatch();

    // Nightclub product works differently to other businesses, so different calculations are used

    function computePortion() {
        let maxOfType;
        if (props.business === "nightclub") {
            maxOfType = staticInfo.nightclub["max"+capitalize(props.type)][props.storageFloors - 1];
        }
        else {
            const upgradeIndex = (props.upgrades.equipment ? 1 : 0) + (props.upgrades.staff ? 1 : 0);
            maxOfType = staticInfo[props.business]["max"+capitalize(props.type)][upgradeIndex];
        }
        return props.currentResource/maxOfType;
    }

    function calculateMsRemaining() {
        let portion = computePortion();
        if (props.type !== "supplies") {
            portion = 1 - portion;
        }
        if (props.business === "nightclub") {
            const upgradeIndex = (props.upgrades.equipment ? 1 : 0);
            return portion * staticInfo.nightclub["max"+capitalize(props.type)][props.storageFloors - 1] * staticInfo.nightclub["accrue"+capitalize(props.type)][upgradeIndex] * (60*1000);
        }
        else {
            const upgradeIndex = (props.upgrades.equipment ? 1 : 0) + (props.upgrades.staff ? 1 : 0);
            return portion * staticInfo[props.business]["max"+capitalize(props.type)][upgradeIndex] * (60*1000);
        }
    }

    function setTypeValue(e) {
        let maxOfType;
        if (props.business === "nightclub") {
            maxOfType = staticInfo.nightclub["max"+capitalize(props.type)][props.storageFloors - 1];
        }
        else {
            const upgradeIndex = (props.upgrades.equipment ? 1 : 0) + (props.upgrades.staff ? 1 : 0);
            maxOfType = staticInfo[props.business]["max"+capitalize(props.type)][upgradeIndex];
        }
        let newValue = maxOfType * e.target.value/100;
        let payload = {
            business: [props.business],
            resource: [props.type],
            value: newValue,
        };
        dispatch(setResourceValue(payload));
    }

    let progressBarOverlay;
    switch (props.barStyle) {
        case 1:
            progressBarOverlay = (
                <div className="fivetick">
                    <div></div><div></div><div></div><div></div>
                </div>
            );
            break;
        case 2:
            let percentage = Math.round(computePortion() * 100);
            progressBarOverlay = <span>{percentage}%</span>;
            break;
        case 3:
            let s;
            let remainingMilliseconds = calculateMsRemaining();
            if (remainingMilliseconds < 1000) {
                if (props.type === "supplies") {
                    s = "None";
                }
                else {
                    s = "Full";
                }
            }
            else {
                s = formatTimeString(remainingMilliseconds, 2);
            }
            progressBarOverlay = <span>{s}</span>;
            break;
        default:
            progressBarOverlay = null;
            break;
    }
    
    return (
        <tr className={props.type + (props.barStyle > 1 ? " big" : "")}>
            <td><span>{props.label}</span></td>
            <td><div className="progress_bar">
                {progressBarOverlay}
                <input onChange={setTypeValue} type="range" className="slider" min="0" max="100" value={Math.round(computePortion()*100)} />
                <div className="bar" style={{width: computePortion()*100 + "%"}}></div>
            </div></td>
        </tr>
    );
});

export const TabProgressBar = connect(mapStateToProps)(TabProgressBarElement);