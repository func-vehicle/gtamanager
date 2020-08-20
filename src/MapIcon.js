import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  toggleBusinessMuted,
} from './redux/userInfoSlice';

import blank from './img/blank.png';
import { staticInfo } from './InfoContext';
import { capitalize } from './Utility';

const mapStateToProps = (state, ownProps) => {
  let businessInfo = state.userInfo[ownProps.business];
  
  let newProps = {
    owned: businessInfo.owned,
    muted: businessInfo.muted,
    position: businessInfo.map_position,
    notify: false,
  }

  // TODO: doesn't work if wheel naturally comes off cooldown
  if (ownProps.business === "wheel" && (state.session.running || businessInfo.notify_while_paused )) {
    if (new Date().getTime() - businessInfo.timestamp > 5000) {
      newProps.notify = true;
      return newProps;
    }
  }

  if (!newProps.owned || !state.session.running) {
    return newProps;
  }

  else if (["bunker", "coke", "meth", "cash", "weed", "forgery"].includes(ownProps.business)) {
    let upgradeIndex = (businessInfo.upgrades.equipment ? 1 : 0) + (businessInfo.upgrades.staff ? 1 : 0);
    for (let resource of staticInfo[ownProps.business].resources) {
      if (resource === "supplies") {
        if (businessInfo[resource] <= 0) {
          newProps.notify = true;
          return newProps;
        }
      }
      else if (businessInfo[resource] >= staticInfo[ownProps.business]["max"+capitalize(resource)][upgradeIndex]) {
        newProps.notify = true;
        return newProps;
      }
    }
  }
  else if (ownProps.business === "nightclub") {
    let storageFloors = state.userInfo.nightclub.storage_floors;
    for (let product of staticInfo.nightclub.products) {
      if (businessInfo[product] > staticInfo[ownProps.business]["max"+capitalize(product)][storageFloors]) {
        newProps.notify = true;
        return newProps;
      }
    }
  }
  
  return newProps;
}

export const MapIcon = (props) => {

  const dispatch = useDispatch();
  
  function muteBusiness() {
    dispatch(toggleBusinessMuted(props.business));
  }
  
  let mapIcon = null;
  let muteIcon = null;
  if (props.owned) {
    mapIcon = (
      <img
        id={props.business + "_map"}
        src={blank}
        className={"icons icons-map icons-" + props.business + (props.muted != null ? " clickable" : "") + (props.notify ? " flash" : "")}
        alt={props.full_name + " icon"}
        style={{
          top: props.position.y + "%",
          left: props.position.x + "%",
        }}
        onClick={props.muted != null ? muteBusiness : undefined}
      />
    );

    if (props.muted) {
      muteIcon = (
        <img
          id={props.business + "_mute"}
          src={blank}
          className="icons icons-map icons-mute"
          alt={props.full_name + " mute icon"}
          style={{
            top: "calc(" + props.position.y + "% - 8px)",
            left: "calc(" + props.position.x + "% + 8px)",
          }}
        />
      )
    }
  }

  return (
    <React.Fragment>
      {mapIcon}
      {muteIcon}
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(MapIcon);