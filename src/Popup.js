import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  popPopup,
  pushPopup,
  unshiftPopup,
  clearStack,
} from './redux/popupSlice';
import {
  setRootObject,
  setUserInfo,
  setResourceValue,
} from './redux/userInfoSlice';
import {
  toggleRunning,
  setBanner,
} from './redux/sessionSlice';
import {
  configureLocationSetter, resetLocationSetter,
} from './redux/locationSlice';
import update from 'immutability-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import Patchnotes, { patchArray } from './Patchnotes';
import { defaultUserInfo, shouldUpdate, updateUserInfo, staticInfo } from './InfoContext';
import { inRange, isInteger, capitalize } from './Utility';
import { notify } from './Notification';

export const PopupPushDenied = (props) => {

  const dispatch = useDispatch();

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
        <button onClick={() => dispatch(popPopup())} className="button red">OK</button>
      </div>
    </div>
  );
}

export const PopupMultipleTabs = (props) => {

  const dispatch = useDispatch();

  return (
    <div id="pushDeniedNotice">
      <div className="heading">
        <h1>Warning</h1>
      </div>
      <div className="main">
        <p>You have multiple tabs of the business manager open. Ensure you only have one open at a time.</p>
        <p>If you are receiving this message after installing the Business Manager as a PWA, close the tab
        in your browser.</p>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button red">OK</button>
      </div>
    </div>
  );
}

export const PopupNewUser = (props) => {

  const dispatch = useDispatch();

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
        <p>Your information will persist between browsing sessions. You can download this web application for easier use by
        opening your browser's drop-down menu and pressing 'Add to Home Screen' or 'Install'.</p>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button red">OK</button>
      </div>
  </div>
  );
}

export const PopupUpdateAvailable = (props) => {

  const dispatch = useDispatch();

  function applyUpdate() {
    window.location.reload();
  }

  return (
    <div id="updateAvailable">
      <div className="heading">
        <h1>Update</h1>
      </div>
      <div className="main">
        <p>An update is available to the business manager. Click 'Yes' to apply to update now, or 'No' to apply the update
        the next time you load the manager.</p>
      </div>
      <div className="buttons fsz">
        <button onClick={applyUpdate} className="button red">Yes</button>
        <button onClick={() => dispatch(popPopup())} className="button red">No</button>
      </div>
  </div>
  );
}

export const PopupPatchnotes = (props) => {

  const dispatch = useDispatch();

  const [state, setState] = useState(patchArray.length - 1);

  function decrementPage(e) {
    let newPage = (state - 1 + patchArray.length) % patchArray.length;
    setState(newPage);
  }

  function incrementPage(e) {
    let newPage = (state + 1) % patchArray.length;
    setState(newPage);
  }

  return (
    <div id="updateNotice">
      <div className="heading clearfix">
        <h1>Patch Notes</h1>
        <div className="pageSwap">
          <button onClick={decrementPage} disabled={state === 0} className="button red" data-value="0"><FontAwesomeIcon icon={faArrowLeft} /></button>
          <button onClick={incrementPage} disabled={state === patchArray.length - 1} className="button red" data-value="1"><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      </div>
      <Patchnotes page={state}/>
      <div className="buttons">
        <button onClick={() => dispatch(popPopup())} className="button red">OK</button>
      </div>
    </div>
  );
}

export const PopupNewWeek = (props) => {

  const dispatch = useDispatch();

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
        <button onClick={() => dispatch(popPopup())} className="button red">OK</button>
      </div>
    </div>
  );
}

export const PopupPaused = (props) => {

  const dispatch = useDispatch();

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
        <button onClick={() => dispatch(popPopup())} className="button red">OK</button>
      </div>
    </div>
  );
}

export const PopupSetupMain = connect((state) => {
  let newProps = {
    userInfo: state.userInfo,
    running: state.session.running,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = props.userInfo.settings;
  const [state, setState] = useState(workingInfo);
  const [lastPlayed, setLastPlayed] = useState(0);

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
  
  function validateAll() {
    let valid = true;
    for (let input of document.querySelectorAll("#notification input[type=number]")) {
      if (input.value === "") {
        valid = false;
      }
      else {
        if (input.classList.contains("range_enforced") && !inRange(input)) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
        if (input.classList.contains("integer_only") && isNaN(parseInt(input.value))) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
      }
    }
    return valid;
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

  async function togglePushNotifications(e) {
    let permission = await notify.authorize();
    if (permission === "granted") {
      let pushAllowed = !state.push_notifications;
      setState((previousState) => update(previousState, {
        push_notifications: {$set: pushAllowed}
      }));
      if (pushAllowed) {
        notify.show("Testing Push Notifications", "If you can see this, you're good to go.", "forgery");
      }
    }
    else if (permission === "denied" || permission === "default") {
      setState((previousState) => update(previousState, {
        push_notifications: {$set: false}
      }));
      dispatch(pushPopup("PopupPushDenied"));
    }
  }

  function setAudioVolume(e) {
    validateIndividual(e);
    let now = new Date().getTime();
    if (now - lastPlayed > 1000) {
      setLastPlayed(now);
      const audio = new Audio(process.env.PUBLIC_URL + "/sfx/chime.mp3");
      let volume = parseFloat(e.target.value);
      audio.volume = volume;
      audio.play();
    }
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

  function downloadData(e) {
    // https://stackoverflow.com/questions/19721439/
		var name = "manager_data.json";
		var file = new Blob([JSON.stringify(props.userInfo)], {type: "text/json"});
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
      let userInfo = JSON.parse(reader.result);
      dispatch(clearStack());
      if (props.running) {
        dispatch(toggleRunning());
      }
      if (userInfo == null) {
        userInfo = {...defaultUserInfo};
        dispatch(pushPopup("PopupNewUser"));
      }
      else {
        if (shouldUpdate(userInfo)) {
          userInfo = updateUserInfo(userInfo);
          dispatch(unshiftPopup("PopupPatchnotes"));
        }
        dispatch(unshiftPopup("PopupPaused"));
      }
      dispatch(setUserInfo(userInfo));
		};
		reader.readAsText(file);
  }

  function showResetEverything(e) {
    dispatch(pushPopup("PopupResetEverything"));
  }

  function showPatchnotes(e) {
    dispatch(pushPopup("PopupPatchnotes"));
  }

  function applyChanges(e) {
    dispatch(setRootObject({ key: "settings", value: state }));
    dispatch(popPopup());
  }

  return (
    <div id="mainSetup" className="setupGUI">
			<div className="heading">
				<h1>Setup</h1>
			</div>
			<div className="main">
        <table>
          <tbody>
            <tr>
              <td>Hide unowned:</td>
              <td className="onechoice fsz">
                <button onClick={hideUnowned} className="button green" disabled={state.hide_unowned} data-value="true">Yes</button>
                <button onClick={hideUnowned} className="button red" disabled={!state.hide_unowned} data-value="false">No</button>
              </td>
            </tr>
            <tr>
              <td>Notifications:</td>
              <td className="fsz">
                  <button onClick={togglePushNotifications} className={"button blue" + (state.push_notifications ? "" : " off")} data-value="push">Push notifications</button>
              </td>
            </tr>
            <tr>
              <td>Audio interval:</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input type="number" name="interval" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.audio.interval} min="1" max="60" />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
                <span>minutes</span>
              </td>
            </tr>
            <tr>
              <td>Audio volume:</td>
              <td className="onechoice">
                  <input type="range" name="volume" onChange={setAudioVolume} value={state.audio.volume} min="0" max="1" step="0.01" />
                  <span>{Math.round(state.audio.volume*100)}%</span>
              </td>
            </tr>
            <tr>
              <td>Progress style:</td>
              <td className="onechoice fsz">
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 0} data-value="0">Plain</button>
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 1} data-value="1">5-tick</button>
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 2} data-value="2">Percentage</button>
                  <button onClick={setProgressStyle} className="button blue" disabled={state.progress_bar_style === 3} data-value="3">Time Remaining</button>
              </td>
            </tr>
            <tr>
              <td>Theme:</td>
              <td className="onechoice fsz">
                  <button onClick={setAppStyle} className="button white" disabled={state.app_style === 0} data-value="0">Light</button>
                  <button onClick={setAppStyle} className="button grey" disabled={state.app_style === 1} data-value="1">Dark</button>
              </td>
            </tr>
            <tr>
              <td>Data:</td>
              <td className="fsz">
                <button onClick={downloadData} className="button orange" data-value="0">Download</button>
                <button onClick={selectFile} className="button orange" data-value="1">Load from file</button>
                <button onClick={showResetEverything} className="button orange" data-value="reset">Reset everything</button>
                <input onChange={uploadData} id="fileInput" type="file" accept=".json, application/json" style={{display: "none"}} />
              </td>
            </tr>
            <tr>
              <td>About:</td>
              <td className="fsz">
                <button onClick={showPatchnotes} className="button orange" data-value="0">Patch notes</button>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/func-vehicle/gtamanager" style={{marginRight: "5px"}}><button className="button orange">GitHub</button></a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/gtaonline/search?q=%22weekly+gta+online+bonuses%22&restrict_sr=on&sort=new&t=week"><button className="button orange">Weekly Bonuses</button></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button cancel red">Cancel</button>
        <button onClick={applyChanges} disabled={!validateAll()} className="button apply red">Apply</button>
      </div>
    </div>
  );
});

export const PopupResetEverything = (props) => {

  const dispatch = useDispatch();

  function confirmReset(e) {
    dispatch(setUserInfo(defaultUserInfo));
    dispatch(clearStack());
  }

  return (
    <div id="resetWarning">
      <div className="heading">
        <h1>Warning</h1>
      </div>
      <div className="main">
        <p>This will reset everything! Are you sure you want to continue?</p>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button red">Cancel</button>
        <button onClick={confirmReset} className="button red">Reset</button>
      </div>
    </div>
  );
}

export const PopupModifyNightclub = connect((state) => {
  let newProps = {
    nightclub: state.userInfo.nightclub,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = {
    cargo: 0,
    sporting: 0,
    imports: 0,
    pharma: 0,
    creation: 0,
    organic: 0,
    copying: 0,
  }
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
      [element.name]: {$set: element.value}
    }));
  }

  function validateAll() {
    let valid = true;
    for (let input of document.querySelectorAll("#notification input[type=number]")) {
      if (input.value === "") {
        valid = false;
      }
      else {
        if (input.classList.contains("range_enforced") && !inRange(input)) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
        if (input.classList.contains("integer_only") && isNaN(parseInt(input.value))) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
      }
    }
    return valid;
  }

  function decrementor(e) {
    let element = e.target.nextSibling;
    let value = parseFloat(element.value);
    let min = parseFloat(element.min);
    let newValue = Math.max(value - 1, min);
    setState((previousState) => update(previousState, {
      [element.name]: {$set: newValue}
    }));
  }

  function incrementor(e) {
    let element = e.target.previousSibling;
    let value = parseFloat(element.value);
    let max = parseFloat(element.max);
    let newValue = Math.min(value + 1, max);
    setState((previousState) => update(previousState, {
      [element.name]: {$set: newValue}
    }));
  }

  function sellSelected(e) {
    for (let product of staticInfo.nightclub.products) {
      if (state[product] === 0)
        continue;
      let payload = {
        business: "nightclub",
        resource: product,
        value: Math.max(props.nightclub[product] - state[product], 0),
      }
      dispatch(setResourceValue(payload));
    }
    setState((previousState) => update(previousState, {
      cargo: {$set: 0},
      sporting: {$set: 0},
      imports: {$set: 0},
      pharma: {$set: 0},
      creation: {$set: 0},
      organic: {$set: 0},
      copying: {$set: 0},
    }));
  }

  function sellAll(e) {
    for (let product of staticInfo.nightclub.products) {
      let payload = {
        business: "nightclub",
        resource: product,
        value: 0,
      }
      dispatch(setResourceValue(payload));
    }
    setState((previousState) => update(previousState, {
      cargo: {$set: 0},
      sporting: {$set: 0},
      imports: {$set: 0},
      pharma: {$set: 0},
      creation: {$set: 0},
      organic: {$set: 0},
      copying: {$set: 0},
    }));
  }

  const storageFloors = props.nightclub.storage_floors;

  let totalProduct = 0;
  for (let product of staticInfo.nightclub.products) {
    totalProduct += Math.round(props.nightclub[product]);
  }

  let vehicleRequired;
  if (totalProduct > 180) {
    vehicleRequired = "Pounder";
  }
  else if (totalProduct > 90) {
    vehicleRequired = "Mule";
  }
  else {
    vehicleRequired = "Speedo";
  }

  return (
    <div id="nightclubGUI">
      <div className="heading">
        <h1>Nightclub Manager</h1>
      </div>
      <div className="main">
        <table>
          <tbody>
            <tr>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Sell</th>
            </tr>
            <tr>
              <td>Cargo and Shipments</td>
              <td>{Math.round(props.nightclub.cargo)}/{staticInfo.nightclub.maxCargo[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="cargo" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.cargo} min="0" max={staticInfo.nightclub.maxCargo[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Sporting Goods</td>
              <td>{Math.round(props.nightclub.sporting)}/{staticInfo.nightclub.maxSporting[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="sporting" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.sporting} min="0" max={staticInfo.nightclub.maxSporting[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>South American Imports</td>
              <td>{Math.round(props.nightclub.imports)}/{staticInfo.nightclub.maxImports[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="imports" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.imports} min="0" max={staticInfo.nightclub.maxImports[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Pharmaceutical Research</td>
              <td>{Math.round(props.nightclub.pharma)}/{staticInfo.nightclub.maxPharma[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="pharma" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.pharma} min="0" max={staticInfo.nightclub.maxPharma[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Cash Creation</td>
              <td>{Math.round(props.nightclub.creation)}/{staticInfo.nightclub.maxCreation[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="creation" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.creation} min="0" max={staticInfo.nightclub.maxCreation[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Organic Produce</td>
              <td>{Math.round(props.nightclub.organic)}/{staticInfo.nightclub.maxOrganic[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="organic" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.organic} min="0" max={staticInfo.nightclub.maxOrganic[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Printing and Copying</td>
              <td>{Math.round(props.nightclub.copying)}/{staticInfo.nightclub.maxCopying[storageFloors - 1]}</td>
              <td className="incDecButtons">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input name="copying" type="number" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.copying} min="0" max={staticInfo.nightclub.maxCopying[storageFloors - 1]} />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{totalProduct}<br/>({vehicleRequired})</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button onClick={sellSelected} disabled={!validateAll()} className="button red">Sell Selected</button>
        <button onClick={sellAll} className="button red">Sell All</button>
        <button onClick={() => dispatch(popPopup())} className="button red">Close</button>
      </div>
    </div>
  );
});

export const PopupSetupBunker = connect((state) => {
  let newProps = {
    bunker: state.userInfo.bunker,
    xPosition: state.location.x,
    yPosition: state.location.y,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = props.bunker;
  const [state, setState] = useState(workingInfo);

  function toggleOwned(e) {
    let newValue = !state.owned;
    setState((previousState) => update(previousState, {
      owned: {$set: newValue}
    }));
  }

  function setLocation(e) {
    dispatch(configureLocationSetter("bunker"));
    dispatch(setBanner("BannerSelectLocation"));
  }

  function toggleUpgrade(e) {
    let upgrade = e.target.dataset.value
    let newValue = !state.upgrades[upgrade];
    setState((previousState) => update(previousState, {
      upgrades: {
        [upgrade]: {$set: newValue}
      }
    }));
  }

  function setMode(e) {
    let newValue = parseInt(e.target.dataset.value, 10);
    setState((previousState) => update(previousState, {
      mode: {$set: newValue}
    }));
  }

  function toggleShowing(e) {
    let newValue = !state.show_all;
    setState((previousState) => update(previousState, {
      show_all: {$set: newValue},
    }));
  }

  function cancelChanges(e) {
    dispatch(popPopup());
  }

  function applyChanges(e) {
    let newState = {...state};
    // Use selected position
    if (props.xPosition != null) {
      newState.map_position = {
        x: props.xPosition,
        y: props.yPosition,
      }
    }
    // Do not override resource changes since opening popup
    // However, need to change value so ratio is maintained
    let oldUpgradeIndex = (props.bunker.upgrades.equipment ? 1 : 0) + (props.bunker.upgrades.staff ? 1 : 0);
    let newUpgradeIndex = (state.upgrades.equipment ? 1 : 0) + (state.upgrades.staff ? 1 : 0);
    for (let resource of ["product", "research", "supplies"]) {
      let oldMax = staticInfo.bunker["max"+capitalize(resource)][oldUpgradeIndex];
      let newMax = staticInfo.bunker["max"+capitalize(resource)][newUpgradeIndex];
      newState[resource] = props.bunker[resource] * (newMax / oldMax);
    }
    dispatch(setRootObject({ key: "bunker", value: newState }));
    dispatch(popPopup());
  }

  return (
    <div id="bunkerSetupGUI" className="setupGUI bunker">
      <div className="heading">
        <h1>Bunker Setup</h1>
      </div>
      <div className="main">
        <table>
          <tbody>
            <tr>
              <td>Owned:</td>
              <td className="onechoice fsz">
                <button onClick={toggleOwned} disabled={state.owned} className="button green" data-value="1">Yes</button>
                <button onClick={toggleOwned} disabled={!state.owned} className="button red" data-value="0">No</button>
              </td>
            </tr>
            <tr>
              <td>Map location:</td>
              <td className="fsz">
                <button onClick={setLocation} disabled={!state.owned} className="button blue">Set Location</button>
              </td>
            </tr>
            <tr>
              <td>Upgrades:</td>
              <td className="indivchoice fsz">
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.equipment ? "" : " off")} data-value="equipment">Equipment</button>
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.staff ? "" : " off")} data-value="staff">Staff</button>
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.security ? "" : " off")} data-value="security">Security</button>
              </td>
            </tr>
            <tr>
              <td>Bunker mode:</td>
              <td className="onechoice fsz">
                <button onClick={setMode} disabled={state.mode === 0} className="button blue" data-value="0">Manufacturing</button>
                <button onClick={setMode} disabled={state.mode === 1} className="button green" data-value="1">Researching</button><br/>
              </td>
            </tr>
            <tr>
              <td>Display:</td>
              <td className="onechoice fsz">
                <button onClick={toggleShowing} disabled={state.show_all} className="button green">Show both</button>
                <button onClick={toggleShowing} disabled={!state.show_all} className="button orange">Show produced</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button onClick={cancelChanges} className="button red">Cancel</button>
        <button onClick={applyChanges} className="button red">Apply</button>
      </div>
    </div>
  );
});

export const PopupSetupMCBusiness = connect((state, ownProps) => {
  let newProps = {
    [ownProps.business]: state.userInfo[ownProps.business],
    xPosition: state.location.x,
    yPosition: state.location.y,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = props[props.business];
  const [state, setState] = useState(workingInfo);

  // Workaround for not updating when clicking setup of another MC business
  const [business, setBusiness] = useState(props.business);
  if (props.business !== business) {
    setBusiness(props.business);
    setState(props[props.business]);
  }

  function toggleOwned(e) {
    let newValue = !state.owned;
    setState((previousState) => update(previousState, {
      owned: {$set: newValue}
    }));
  }

  function setLocation(e) {
    dispatch(configureLocationSetter(props.business));
    dispatch(setBanner("BannerSelectLocation"));
  }

  function toggleUpgrade(e) {
    let upgrade = e.target.dataset.value
    let newValue = !state.upgrades[upgrade];
    setState((previousState) => update(previousState, {
      upgrades: {
        [upgrade]: {$set: newValue}
      }
    }));
  }

  function applyChanges(e) {
    let newState = {...state};
    // Use selected position
    if (props.xPosition != null) {
      newState.map_position = {
        x: props.xPosition,
        y: props.yPosition,
      }
    }
    // Do not override resource changes since opening popup
    // However, need to change value so ratio is maintained
    let oldUpgradeIndex = (props[props.business].upgrades.equipment ? 1 : 0) + (props[props.business].upgrades.staff ? 1 : 0);
    let newUpgradeIndex = (state.upgrades.equipment ? 1 : 0) + (state.upgrades.staff ? 1 : 0);
    for (let resource of ["product", "supplies"]) {
      let oldMax = staticInfo[props.business]["max"+capitalize(resource)][oldUpgradeIndex];
      let newMax = staticInfo[props.business]["max"+capitalize(resource)][newUpgradeIndex];
      newState[resource] = props[props.business][resource] * (newMax / oldMax);
    }
    dispatch(setRootObject({ key: [props.business], value: newState }));
    dispatch(popPopup());
  }

  return (
    <div id="mcbusinessSetupGUI" className="setupGUI">
      <div className="heading">
        <h1>{staticInfo[props.business].fullName} Setup</h1>
      </div>
      <div className="main">
        <table>
          <tbody>
            <tr>
              <td>Owned:</td>
              <td className="onechoice fsz">
                <button onClick={toggleOwned} disabled={state.owned} className="button green" data-value="1">Yes</button>
                <button onClick={toggleOwned} disabled={!state.owned} className="button red" data-value="0">No</button>
              </td>
            </tr>
            <tr>
              <td>Map location:</td>
              <td className="fsz">
                <button onClick={setLocation} disabled={!state.owned} className="button blue">Set Location</button>
              </td>
            </tr>
            <tr>
              <td>Upgrades:</td>
              <td className="indivchoice fsz">
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.equipment ? "" : " off")} data-value="equipment">Equipment</button>
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.staff ? "" : " off")} data-value="staff">Staff</button>
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.security ? "" : " off")} data-value="security">Security</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button red">Cancel</button>
        <button onClick={applyChanges} className="button red">Apply</button>
      </div>
    </div>
  );
});


export const PopupSetupNightclub = connect((state, ownProps) => {
  let newProps = {
    nightclub: state.userInfo.nightclub,
    xPosition: state.location.x,
    yPosition: state.location.y,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = props.nightclub;
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
      [element.name]: {$set: element.value}
    }));
  }
  
  function validateAll() {
    let valid = true;
    for (let input of document.querySelectorAll("#notification input[type=number]")) {
      if (input.value === "") {
        valid = false;
      }
      else {
        if (input.classList.contains("range_enforced") && !inRange(input)) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
        if (input.classList.contains("integer_only") && isNaN(parseInt(input.value))) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
      }
    }
    return valid;
  }

  function decrementor(e) {
    let element = e.target.nextSibling;
    let value = parseFloat(element.value);
    let min = parseFloat(element.min);
    let newValue = Math.max(value - 1, min);
    setState((previousState) => update(previousState, {
      [element.name]: {$set: newValue}
    }));
  }

  function incrementor(e) {
    let element = e.target.previousSibling;
    let value = parseFloat(element.value);
    let max = parseFloat(element.max);
    let newValue = Math.min(value + 1, max);
    setState((previousState) => update(previousState, {
      [element.name]: {$set: newValue}
    }));
  }

  function toggleOwned(e) {
    let newValue = !state.owned;
    setState((previousState) => update(previousState, {
      owned: {$set: newValue}
    }));
  }

  function setLocation(e) {
    dispatch(configureLocationSetter("nightclub"));
    dispatch(setBanner("BannerSelectLocation"));
  }

  function toggleUpgrade(e) {
    let upgrade = e.target.dataset.value;
    let newValue = !state.upgrades[upgrade];
    setState((previousState) => update(previousState, {
      upgrades: {
        [upgrade]: {$set: newValue}
      }
    }));
  }

  function toggleShowing(e) {
    let newValue = !state.show_all;
    setState((previousState) => update(previousState, {
      show_all: {$set: newValue}
    }));
  }

  function toggleProducing(e) {
    let product = e.target.dataset.value;
    let newValue = !state.producing[product];
    setState((previousState) => update(previousState, {
      producing: {
        [product]: {$set: newValue}
      }
    }));
  }

  function applyChanges(e) {
    let newState = {...state};
    // Use selected position
    if (props.xPosition != null) {
      newState.map_position = {
        x: props.xPosition,
        y: props.yPosition,
      }
    }
    // If lowering no. of storage floors, make sure product doesn't exceed new maximum
    for (let product of staticInfo.nightclub.products) {
      newState[product] = Math.min(props.nightclub[product], staticInfo.nightclub["max"+capitalize(product)][state.storage_floors - 1]);
    }
    dispatch(setRootObject({ key: "nightclub", value: newState }));
    dispatch(popPopup());
  }

  return (
    <div id="nightclubSetupGUI" className="setupGUI nightclub">
      <div className="heading">
        <h1>Nightclub Setup</h1>
      </div>
      <div className="main">
        <table>
          <tbody>
            <tr>
              <td>Owned:</td>
              <td className="onechoice fsz">
                <button onClick={toggleOwned} disabled={state.owned} className="button green" data-value="1">Yes</button>
                <button onClick={toggleOwned} disabled={!state.owned} className="button red" data-value="0">No</button>
              </td>
            </tr>
            <tr>
              <td>Map location:</td>
              <td className="fsz">
                <button onClick={setLocation} disabled={!state.owned} className="button blue">Set Location</button>
              </td>
            </tr>
            <tr>
              <td>Upgrades:</td>
              <td className="indivchoice fsz">
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.equipment ? "" : " off")} data-value="equipment">Equipment</button>
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.staff ? "" : " off")} data-value="staff">Staff</button>
                <button onClick={toggleUpgrade} className={"button blue" + (state.upgrades.security ? "" : " off")} data-value="security">Security</button>
              </td>
            </tr>
            <tr>
              <td>Display:</td>
              <td className="onechoice fsz">
                <button onClick={toggleShowing} disabled={!state.show_all} className="button green" data-value="1">Show all</button>
                <button onClick={toggleShowing} disabled={state.show_all} className="button orange" data-value="0">Show produced</button>
              </td>
            </tr>
            <tr>
              <td>Storage floors:</td>
              <td className="incDecButtons fsz">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input type="number" name="storage_floors" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.storage_floors} min="1" max="5" />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Producing:</td>
              <td className="indivchoice fsz">
                <button onClick={toggleProducing} className={"button blue" + (state.producing.cargo ? "" : " off")} data-value="cargo">Cargo and Shipments</button>
                <button onClick={toggleProducing} className={"button blue" + (state.producing.sporting ? "" : " off")} data-value="sporting">Sporting Goods</button>
                <button onClick={toggleProducing} className={"button blue" + (state.producing.imports ? "" : " off")} data-value="imports">South American Imports</button>
                <button onClick={toggleProducing} className={"button blue" + (state.producing.pharma ? "" : " off")} data-value="pharma">Pharmaceutical Research</button>
                <button onClick={toggleProducing} className={"button blue" + (state.producing.creation ? "" : " off")} data-value="creation">Cash Creation</button>
                <button onClick={toggleProducing} className={"button blue" + (state.producing.organic ? "" : " off")} data-value="organic">Organic Produce</button>
                <button onClick={toggleProducing} className={"button blue" + (state.producing.copying ? "" : " off")} data-value="copying">Printing and Copying</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button red">Cancel</button>
        <button onClick={applyChanges} disabled={!validateAll()} className="button red">Apply</button>
      </div>
    </div>
  );
});

export const PopupSetupImportExport = connect((state) => {
  let newProps = {
    importExport: state.userInfo.importExport,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = props.importExport;
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
      [element.name]: {$set: element.value}
    }));
  }
  
  function validateAll() {
    let valid = true;
    for (let input of document.querySelectorAll("#notification input[type=number]")) {
      if (input.value === "") {
        valid = false;
      }
      else {
        if (input.classList.contains("range_enforced") && !inRange(input)) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
        if (input.classList.contains("integer_only") && isNaN(parseInt(input.value))) {
          input.parentElement.classList.add("invalid-value");
          valid = false;
        }
      }
    }
    return valid;
  }

  function decrementor(e) {
    let element = e.target.nextSibling;
    let value = parseFloat(element.value);
    let min = parseFloat(element.min);
    let newValue = Math.max(value - 1, min);
    setState((previousState) => update(previousState, {
      [element.name]: {$set: newValue}
    }));
  }

  function incrementor(e) {
    let element = e.target.previousSibling;
    let value = parseFloat(element.value);
    let max = parseFloat(element.max);
    let newValue = Math.min(value + 1, max);
    setState((previousState) => update(previousState, {
      [element.name]: {$set: newValue}
    }));
  }

  function toggleOwned(e) {
    let newValue = !state.owned;
    setState((previousState) => update(previousState, {
      owned: {$set: newValue}
    }));
  }

  function setLocation(e) {
    dispatch(configureLocationSetter("importExport"));
    dispatch(setBanner("BannerSelectLocation"));
  }

  function resetCooldown(e) {
    setState((previousState) => update(previousState, {
      cooldown: {$set: 0}
    }));
  }

  function applyChanges(e) {
    dispatch(setRootObject({ key: "importExport", value: state }));
    dispatch(popPopup());
  }

  return (
    <div id="importExportSetupGUI" className="setupGUI importExport">
      <div className="heading">
        <h1>Import / Export Setup</h1>
      </div>
      <div className="main">
        <table>
          <tbody>
            <tr>
              <td>Owned:</td>
              <td className="onechoice fsz">
                <button onClick={toggleOwned} disabled={state.owned} className="button green" data-value="1">Yes</button>
                <button onClick={toggleOwned} disabled={!state.owned} className="button red" data-value="0">No</button>
              </td>
            </tr>
            <tr>
              <td>Map location:</td>
              <td className="fsz">
                <button  onClick={setLocation} disabled={!state.owned} className="button blue">Set Location</button>
              </td>
            </tr>
            <tr>
              <td>High-end cars:</td>
              <td className="incDecButtons fsz">
                <button onClick={decrementor} className="button"><FontAwesomeIcon icon={faMinus} /></button>
                <input type="number" name="highend_cars" onKeyPress={isInteger} onChange={validateIndividual} className="range_enforced integer_only" value={state.highend_cars} min="0" max="20" />
                <button onClick={incrementor} className="button"><FontAwesomeIcon icon={faPlus} /></button>
              </td>
            </tr>
            <tr>
              <td>Cooldown:</td>
              <td className="fsz">
                <button onClick={resetCooldown} disabled={state.cooldown === 0} className="button blue">Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons fsz">
        <button onClick={() => dispatch(popPopup())} className="button red">Cancel</button>
        <button onClick={applyChanges} disabled={!validateAll()} className="button red">Apply</button>
      </div>
    </div>
  );
});

export const PopupSetupWheel = connect((state) => {
  let newProps = {
    wheel: state.userInfo.wheel,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  let workingInfo = props.wheel;
  const [state, setState] = useState(workingInfo);

  function toggleOwned(e) {
    let newValue = !state.owned;
    setState((previousState) => update(previousState, {
      owned: {$set: newValue}
    }));
  }

  function toggleNotify(e) {
    let newValue = !state.notify_while_paused;
    setState((previousState) => update(previousState, {
      notify_while_paused: {$set: newValue}
    }));
  }

  function resetCooldown(e) {
    setState((previousState) => update(previousState, {
      timestamp: {$set: 0}
    }));
  }

  function applyChanges(e) {
    dispatch(setRootObject({ key: "wheel", value: state }));
    dispatch(popPopup());
  }

  return (
    <div id="wheelSetupGUI" className="setupGUI wheel">
    <div className="heading">
      <h1>Lucky Wheel Setup</h1>
    </div>
    <div className="main">
      <table>
        <tbody>
          <tr>
            <td>Display:</td>
            <td className="onechoice fsz">
              <button onClick={toggleOwned} disabled={state.owned} className="button green">Yes</button>
              <button onClick={toggleOwned} disabled={!state.owned} className="button red">No</button>
            </td>
          </tr>
          <tr>
            <td>Notify:</td>
            <td className="onechoice fsz">
              <button onClick={toggleNotify} disabled={state.notify_while_paused} className="button green">Always</button>
              <button onClick={toggleNotify} disabled={!state.notify_while_paused} className="button orange">Only while running</button>
            </td>
          </tr>
          <tr>
            <td>Cooldown:</td>
            <td className="fsz">
              <button onClick={resetCooldown} disabled={state.timestamp === 0} className="button blue">Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="buttons fsz">
      <button onClick={() => dispatch(popPopup())} className="button red">Cancel</button>
      <button onClick={applyChanges} className="button red">Apply</button>
    </div>
  </div>
  );
});

const stringElementMap = {
  PopupPushDenied,
  PopupMultipleTabs,
  PopupNewUser,
  PopupUpdateAvailable,
  PopupPatchnotes,
  PopupNewWeek,
  PopupPaused,
  PopupSetupMain,
  PopupResetEverything,
  PopupModifyNightclub,
  PopupSetupBunker,
  PopupSetupMCBusiness,
  PopupSetupNightclub,
  PopupSetupImportExport,
  PopupSetupWheel,
}

function createPopup(arr) {
  // Array has string name and object properties
  return React.createElement(stringElementMap[arr[0]], arr[1]);
}

const mapStateToProps = (state) => {
  let banner = state.session.banner[0];
  let newProps = {
    popupStack: state.popupStack,
    banner: banner,
  }
  return newProps;
}

const Popup = (props) => {

  const dispatch = useDispatch();

  let fragment = null;
  let style = null;

  // Hide setup dialog when setting location to preserve state
  if (props.banner === "BannerSelectLocation" || props.banner === "BannerCustomLocation") {
    style = { display: "none" };
  }

  // Reset location setter if popup changes
  const previousPopup = props.popupStack.length > 0 ? props.popupStack[props.popupStack.length - 1] : null;
  const previousRef = useRef(previousPopup);
  useEffect(() => {
    if (props.popupStack.length === 0 || previousRef.current !== props.popupStack[props.popupStack.length - 1]) {
      dispatch(resetLocationSetter());
    }
  }, [dispatch, props.popupStack]);

  if (props.popupStack.length > 0) {
    fragment = (
      <React.Fragment>
        <div id="overlay" style={style}></div>
        <div id="notification" style={style}>
          {createPopup(props.popupStack[props.popupStack.length - 1])}
        </div>
      </React.Fragment>
    )
  }

  return fragment;
}

export default connect(mapStateToProps)(Popup);