import React, { useContext, useState } from 'react';
import update from 'immutability-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { InfoContext } from './infoContext';
import { inRange, isInteger } from './Utility';

export const PopupPushDenied = (props) => {
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

export const PopupNewUser = (props) => {
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

export const PopupPatchnotes = (props) => {
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

export const PopupNewWeek = (props) => {
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

export const PopupPaused = (props) => {
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

export const PopupSetupMain = (props) => {

  const context = useContext(InfoContext);
  let workingInfo = JSON.parse(JSON.stringify(context.userInfo.settings));
  const [state, setState] = useState(workingInfo);

  function validateIndividual(e) {
    e.persist();
    let element = e.target;
    if (element.value === "") {
      element.parentElement.classList.add("invalid-value");
    }
    else if (element.classList.contains("range_enforced") && !inRange(element)) {
      element.parentElement.classList.add("invalid-value");
    }
    else {
      element.parentElement.classList.remove("invalid-value");
    }
    setState((previousState) => update(previousState, {
      audio: {
        [element.name]: {$set: element.value}
      }
    }));
  }

  function decrementor(e) {
    let element = e.target.nextSibling;
    let value = parseFloat(element.value);
    let min = parseFloat(element.min);
    let newValue = Math.max(value - 1, min);
    setState((previousState) => update(previousState, {
      audio: {
        [element.name]: {$set: newValue}
      }
    }));
  }

  function incrementor(e) {
    let element = e.target.previousSibling;
    let value = parseFloat(element.value);
    let max = parseFloat(element.max);
    let newValue = Math.min(value + 1, max);
    setState((previousState) => update(previousState, {
      audio: {
        [element.name]: {$set: newValue}
      }
    }));
  }

  function hideUnowned(e) {
    let newValue = !state.hide_unowned;
    setState((previousState) => update(previousState, {
      hide_unowned: {$set: newValue}
    }));
  }

  function setProgressStyle(e) {
    let newValue = parseInt(e.target.dataset.value);
    setState((previousState) => update(previousState, {
      progress_bar_style: {$set: newValue}
    }));
  }

  function setAppStyle(e) {
    let newValue = parseInt(e.target.dataset.value);
    setState((previousState) => update(previousState, {
      app_style: {$set: newValue}
    }));
  }

  // TODO:
  function validateVolume(e) {
    validateIndividual(e);

  }

  function downloadData(e) {
    // https://stackoverflow.com/questions/19721439/
		var name = "manager_data.json";
		var file = new Blob([JSON.stringify(context.userInfo)], {type: "text/json"});
      var isIE = false || !!document.documentMode;
      if (isIE) {
        window.navigator.msSaveOrOpenBlob(file, name);
      }
      else {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
		}
  }

  function selectFile(e) {
    let element = document.getElementById("fileInput");
    if (element != null) {
      element.click();
    }
  }

  function uploadData(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
		if (file.name.split('.').pop() !== "json") {
			console.log("Invalid file type!");
			return;
		}
		reader.onload = function(e) {
      // Can't use context.setState because data may need to be updated, could crash application if not updated
      let newInfo = JSON.parse(reader.result);
      localStorage.setItem("userInfo", JSON.stringify(newInfo));
      window.onbeforeunload = null;
			window.location.reload(false);
      // context.setState((previousState) => update(previousState, {
      //   userInfo: {$set: newInfo}
      // }));
		};
		reader.readAsText(file);
  }

  // TODO: Don't mutate popupStack directly!!!
  function applyChanges(e) {
    let popupStack = [context.popupStack];
    popupStack.pop();
    context.setState((previousState) => update(previousState, {
      userInfo: {
        settings: {$set: state}
      },
      popupStack: {$set: popupStack}
    }));
  }

  function cancelChanges(e) {
    let popupStack = [context.popupStack];
    popupStack.pop();
    context.setState((previousState) => update(previousState, {
      popupStack: {$set: popupStack}
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
                <button onClick={hideUnowned} className="button green" disabled={state.hide_unowned} data-value="true">Yes</button>
                <button onClick={hideUnowned} className="button red" disabled={!state.hide_unowned} data-value="false">No</button>
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
                <button onClick={decrementor} className="button minus"><FontAwesomeIcon icon={faMinus} /></button>
                <input type="number" name="interval" onKeyDown={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.audio.interval} min="1" max="60" />
                <button onClick={incrementor} className="button plus"><FontAwesomeIcon icon={faPlus} /></button>
                <span>minutes</span>
              </td>
            </tr>
            <tr className="audioVolume">
              <td>Audio volume:</td>
              <td className="onechoice">
                  <input type="range" name="volume" onChange={validateIndividual} value={state.audio.volume} min="0" max="1" step="0.01" />
                  <span>{Math.round(state.audio.volume*100)}%</span>
              </td>
            </tr>
            <tr className="progressBarStyle">
              <td>Progress style:</td>
              <td className="onechoice fsz">
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 0} data-value="0">Plain</button>
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 1} data-value="1">5-tick</button>
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 2} data-value="2">Percentage</button>
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 3} data-value="3">Time Remaining</button>
              </td>
            </tr>
            <tr className="appStyle">
              <td>Theme:</td>
              <td className="onechoice fsz">
                  <button onClick={setAppStyle} className="button white" disabled={state.app_style === 0} data-value="0">Light</button>
                  <button onClick={setAppStyle} className="button grey" disabled={state.app_style === 1} data-value="1">Dark</button>
              </td>
            </tr>
            <tr className="dataDownload">
              <td>Data:</td>
              <td className="fsz">
                <button onClick={downloadData} className="button orange" data-value="0">Download</button>
                <button onClick={selectFile} className="button orange" data-value="1">Load from file</button>
                <button className="button orange" data-value="reset">Reset everything</button>
                <input onChange={uploadData} id="fileInput" type="file" accept=".json, application/json" style={{display: "none"}} />
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
        <button onClick={cancelChanges} className="button cancel red">Cancel</button>
        <button onClick={applyChanges} className="button apply red">Apply</button>
      </div>
    </div>
  );
}

const Popup = (props) => {
  const context = useContext(InfoContext);
  let styles = {
    width: props.width,
    height: props.height,
  }

  // Workaround for setting max height of notification main
  let notificationMainElement = document.querySelector("#notification .main");
  if (notificationMainElement != null) {
    notificationMainElement.style.maxHeight = styles.height - 100 + "px";
  }

  let fragment = null;
  if (context.popupStack.length > 0) {
    fragment = (
      <React.Fragment>
        <div id="overlay" style={styles}></div>
        <div id="notification">
          {context.popupStack[context.popupStack.length - 1]}
        </div>
      </React.Fragment>
    )
  }

  return fragment;
}

export default Popup;