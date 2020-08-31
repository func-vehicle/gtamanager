import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { formatTimeString, mod } from './Utility';
import blank from "./img/blank.png";

const mapStateToProps = (state) => {
    let newProps = {
        running: state.session.running,
        updateState: state.session.running && state.session.updateState,
    }
    return newProps;
}

const TabFees = (props) => {
    
    const [finish, setFinish] = useState(null);

    // Set up reference point, interval
    useEffect(() => {
        if (!props.running) return;
        setFinish(new Date().getTime() + 2880000);
        return () => {
            setFinish(null);
        }
    }, [props.running]);

    let sessionString;
    if (props.running) {
        let current = new Date().getTime();
        let realFinish = finish;
        if (finish == null) {
            // Workaround for first render after running change
            realFinish = new Date().getTime() + 2880000;
        }
        let remainingMs = mod(realFinish - current, 2881000);
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
            <div className="content">
                <button className="button purple" disabled={true}>{sessionString}</button>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(TabFees);