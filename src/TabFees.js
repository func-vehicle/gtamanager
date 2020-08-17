import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import { formatTimeString, mod } from './Utility';
import blank from "./img/blank.png";

const mapStateToProps = (state) => {
    let newProps = {
        running: state.session.running,
    }
    return newProps;
}

const TabFees = (props) => {
    
    const [state, setState] = useState({
        current: null,
        finish: null,
    });
    
    // Update timer
    const updateState = () => {
        setState((previousState) => update(previousState, {
            current: {$set: new Date().getTime()}
        }));
    }

    // Set up reference point, interval
    useEffect(() => {
        if (!props.running) return;
        setState((previousState) => update(previousState, {
            finish: {$set: new Date().getTime() + 2880000}
        }));
        let interval = setInterval(updateState, 1000);
        return () => {
            clearInterval(interval);
            setState((previousState) => update(previousState, {
                current: {$set: null},
                finish: {$set: null},
            }));
        }
    }, [props.running]);

    let sessionString;
    if (props.running) {
        // Workaround for first render after running change
        let current = state.current;
        if (current == null) {
            current = new Date().getTime();
        }
        let finish = state.finish;
        if (finish == null) {
            finish = new Date().getTime() + 2880000;
        }
        let remainingMs = mod(finish - current, 2881000);
        sessionString = formatTimeString(remainingMs);
    }
    else {
        sessionString = "Not in Session";
    }

    return (
        <div id="fees" className="information">
            <div className="business_heading clearfix">
                <div className="icon_wrap">
                    <img src={blank} className="icons icons-info icons-fees" alt="Daily Fees icon"/>
                </div>
                <h1>Daily Fees</h1>
            </div>
            <button className="button purple" disabled={true}>{sessionString}</button>
        </div>
    );
}

export default connect(mapStateToProps)(TabFees);