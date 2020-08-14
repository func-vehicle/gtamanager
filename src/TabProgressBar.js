import React, { useContext } from 'react';
import update from 'immutability-helper';

import { InfoContext, staticInfo } from './InfoContext';
import { capitalize, formatTimeString } from './Utility';

export const TabProgressBar = (props) => {
    const context = useContext(InfoContext);

    function computePortion() {
        let currentOfType = context.userInfo[props.business][props.type];
        let upgradeIndex = (context.userInfo[props.business].upgrades.equipment ? 1 : 0) + (context.userInfo[props.business].upgrades.staff ? 1 : 0);
        let maxOfType = staticInfo[props.business]["max"+capitalize(props.type)][upgradeIndex];
        return currentOfType/maxOfType;
    }

    function calculateMsRemaining() {
        let upgradeIndex = (context.userInfo[props.business].upgrades.equipment ? 1 : 0) + (context.userInfo[props.business].upgrades.staff ? 1 : 0);
        let portion = computePortion();
        if (props.type !== "supplies") {
            portion = 1 - portion;
        }
        else if (props.business === "nightclub") {

        }
        return portion * staticInfo[props.business]["max"+capitalize(props.type)][upgradeIndex] * (60*1000);
    }

    function setTypeValue(e) {
        let upgradeIndex = (context.userInfo[props.business].upgrades.equipment ? 1 : 0) + (context.userInfo[props.business].upgrades.staff ? 1 : 0);
        let maxOfType = staticInfo[props.business]["max"+capitalize(props.type)][upgradeIndex];
        let newValue = maxOfType * e.target.value/100;
        context.setState((previousState) => update(previousState, {
            userInfo: { 
                [props.business]: {
                    [props.type]: {$set: newValue},
                }
            }
        }));
    }

    let progressBarOverlay;
    switch (context.userInfo.settings.progress_bar_style) {
        case 1:
            progressBarOverlay = (
                <div className="fivetick">
                    <div></div><div></div><div></div><div></div><div></div>
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
                s = formatTimeString(remainingMilliseconds);
            }
            progressBarOverlay = <span>{s}</span>;
            break;
        default:
            progressBarOverlay = null;
            break;
    }
    
    return (
        <tr className={props.type + (context.userInfo.settings.progress_bar_style > 1 ? " big" : "")}>
            <td><span>{props.label}</span></td>
            <td><div className="progress_bar">
                {progressBarOverlay}
                <input onChange={setTypeValue} type="range" className="slider" min="0" max="100" value={Math.round(computePortion()*100)} />
                <div className="bar" style={{width: computePortion()*100 + "%"}}></div>
            </div></td>
        </tr>
    );
}