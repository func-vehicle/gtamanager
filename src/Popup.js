import React, { useContext, useState } from 'react';
import update from 'immutability-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { InfoContext } from './infoContext';

const PopupPushDenied = (props) => {
  return (
    <div id="pushDeniedNotice">
      <div className="heading">
        <h1>Notice</h1>
      </div>
      <div className="main">
        <p>The request to allow push notifications has been denied. You may need to refresh the page for the
        request to appear again when you press this button.</p>
      </div>
      <div className="buttons fsz">
        <button className="button ok red">OK</button>
      </div>
    </div>
  );
}

const PopupNewUser = (props) => {
  return (
    <div id="newUserNotice">
      <div className="heading">
        <h1>Welcome</h1>
      </div>
      <div className="main desktop-only">
        <p>The GTA V Business Manager can keep track of your businesses while you play the game and alert you when one needs
        your attention. It can also remind you when to spin the wheel, and when your daily fees will occur.</p>
        <p>To begin, click the cog of a business on the right to set it up. Product and supply bars can be set by dragging
        the bars to their in game values.</p>
        <p>Whenever you are in a session where businesses run (such as free roam and contact missions), start the manager
        with the button in the bottom right corner of the map. Pause it when you are no longer in session.</p>
        <p>Your information will persist between browsing sessions. We recommend you bookmark this page if you are
        considering using this manager long term.</p>
      </div>
      <div className="main mobile-only">
        <p>The GTA V Business Manager can keep track of your businesses while you play the game and alert you when one needs
        your attention. It can also remind you when to spin the wheel, and when your daily fees will occur.</p>
        <p>To begin, tap the cog of a business (below the map) to set it up. Product and supply bars can be set by dragging
        the bars to their in game values.</p>
        <p>Whenever you are in a session where businesses run (such as free roam and contact missions), start the manager
        with the button below the map. Pause it when you are no longer in session.</p>
        <p>Your information will persist between browsing sessions. We recommend you bookmark this page if you are
        considering using this manager long term.</p>
      </div>
      <div className="buttons fsz">
        <button className="button ok red">OK</button>
      </div>
  </div>
  );
}

const PopupPatchnotes = (props) => {
  return (
    <div id="updateNotice">
      <div className="heading clearfix">
        <h1>Patch Notes</h1>
        <div className="pageSwap">
          <button className="button red" data-value="0"><FontAwesomeIcon icon={faArrowLeft} /></button>
          <button className="button red" data-value="1"><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      </div>
      <div className="main">
        <h1>Version 1.10.2</h1>
        <div className="indent">
          <h2>Fixes</h2>
          <ul>
            <li>Fixed push notifications on Chrome mobile.</li>
          </ul>
        </div>
      </div>
      <div className="buttons">
        <button className="button ok red">OK</button>
      </div>
    </div>
  );
}

const PopupNewWeek = (props) => {
  return (
    <div id="newWeekNotice">
      <div className="heading">
        <h1>New Weekly Bonuses</h1>
      </div>
      <div className="main">
        <p>The weekly bonuses for GTA Online have changed.
        <br/><a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/gtaonline/search?q=%22weekly+gta+online+bonuses%22&restrict_sr=on&sort=new&t=week">Click here</a> to see what's new.</p>
      </div>
      <div className="buttons fsz">
        <button className="button ok red">OK</button>
      </div>
    </div>
  );
}

const PopupPaused = (props) => {
  return (
    <div id="pauseNotice">
      <div className="heading">
        <h1>Notice</h1>
      </div>
      <div className="main">
        <p>The business manager is currently paused. It should be unpaused at all times
        when you are in free roam / contact missions in order to be accurate.</p>
      </div>
      <div className="buttons fsz">
        <button className="button ok red">OK</button>
      </div>
    </div>
  );
}

const PopupSetupMain = (props) => {

  const context = useContext(InfoContext);
  let workingInfo = JSON.parse(JSON.stringify(context.userInfo.settings));
  const [state, setState] = useState(workingInfo);

  function setAudioInterval(e) {
    // e.persist();
    // const re = /^[0-9\b]+$/;
    
    // if (e.target.value === '' || re.test(e.target.value)) {
    //   console.log("Passed first check...");
    //   let value = parseInt(e.target.value);
    //   let min = parseInt(e.target.min);
    //   let max = parseInt(e.target.max);
    //   if (min <= value && value <= max) {
    //     console.log("Passed second check!");
    //     context.setState((previousState) => update(previousState, {
    //       userInfo: { 
    //         settings: {
    //           audio: {
    //             interval: {$set: e.target.value}
    //           }
    //         }
    //       }
    //     }));
    //   }
    // }
  }

  function setAudioVolume(e) {
    e.persist();
    setState((previousState) => update(previousState, {
      audio: {
        volume: {$set: e.target.value/100}
      }
    }));
  }

  return (
    <div id="mainSetup" className="setupGUI">
			<div className="heading">
				<h1>Setup</h1>
			</div>
			<div className="main">
        <table>
          <tbody>
            <tr className="hideUnowned">
              <td>Hide unowned:</td>
              <td className="onechoice fsz">
                <button className="button green" data-value="1">Yes</button>
                <button className="button red" data-value="0">No</button>
              </td>
            </tr>
            <tr className="notificationSettings">
              <td>Notifications:</td>
              <td className="fsz">
                  <button className="button blue off" data-value="push">Push notifications</button>
              </td>
            </tr>
            <tr className="audioFreq">
              <td>Audio interval:</td>
              <td className="incDecButtons">
                <button className="button minus"><FontAwesomeIcon icon={faMinus} /></button>
                <input type="number" onChange={setAudioInterval} className="range_enforced integer_only" name="quantity" value={state.audio.interval} min="1" max="60" />
                <button className="button plus"><FontAwesomeIcon icon={faPlus} /></button>
                <span>minutes</span>
              </td>
            </tr>
            <tr className="audioVolume">
              <td>Audio volume:</td>
              <td className="onechoice">
                  <input type="range" onChange={setAudioVolume} min="0" max="100" value={Math.round(state.audio.volume*100)} />
                  <span>{Math.round(state.audio.volume*100)}%</span>
              </td>
            </tr>
            <tr className="progressBarStyle">
              <td>Progress style:</td>
              <td className="onechoice fsz">
                  <button className="button blue" data-value="0">Plain</button>
                  <button className="button blue" data-value="1">5-tick</button>
                  <button className="button blue" data-value="2">Percentage</button>
                  <button className="button blue" data-value="3">Time Remaining</button>
              </td>
            </tr>
            <tr className="appStyle">
              <td>Theme:</td>
              <td className="onechoice fsz">
                  <button className="button white" data-value="0">Light</button>
                  <button className="button grey" data-value="1">Dark</button>
              </td>
            </tr>
            <tr className="dataDownload">
              <td>Data:</td>
              <td className="fsz">
                <button className="button orange" data-value="0">Download</button>
                <button className="button orange" data-value="1">Load from file</button>
                <button className="button orange" data-value="reset">Reset everything</button>
                <a id="dataDownloadLink" title="Download business manager data" style={{display: "none"}}></a>
                <input id="fileInput" type="file" accept=".json, application/json" style={{display: "none"}} />
              </td>
            </tr>
            <tr className="about">
              <td>About:</td>
              <td className="fsz">
                <button className="button orange" data-value="0">Patch notes</button>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/func-vehicle/gtamanager"><button className="button orange">GitHub</button></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button className="button cancel red">Cancel</button>
        <button className="button apply red">Apply</button>
      </div>
    </div>
  );
}

const Popup = (props) => {
  let styles = {
    width: props.width,
    height: props.height,
  }
  console.log(styles);

  // Workaround for setting max height of notification main
  let notificationMainElement = document.querySelector("#notification .main");
  if (notificationMainElement != null) {
    notificationMainElement.style.maxHeight = styles.height - 100 + "px";
  }

  return (
    <React.Fragment>
      <div id="overlay" style={styles}></div>
      <div id="notification">
        <PopupSetupMain />
      </div>
    </React.Fragment>
  );
}

export default Popup;