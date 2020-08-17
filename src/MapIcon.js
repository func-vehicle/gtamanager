import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  toggleBusinessMuted,
} from './redux/userInfoSlice';

import blank from './img/blank.png';

const mapStateToProps = (state, ownProps) => {
  let newProps = {
    owned: state.userInfo[ownProps.business].owned,
    muted: state.userInfo[ownProps.business].muted,
    position: state.userInfo[ownProps.business].map_position,
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
        className={"icons icons-map icons-" + props.business + (props.muted != null ? " clickable" : "")}
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