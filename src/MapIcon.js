import React from 'react';
import update from 'immutability-helper';

import { InfoContext } from './infoContext';
import './html5reset.css';
import './style.css';
import blank from './img/blank.png';

class MapIcon extends React.Component {
  static contextType = InfoContext;

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.muteBusiness = this.muteBusiness.bind(this);
}

  muteBusiness() {
    let userInfo = this.context.userInfo;
    let newValue = !userInfo[this.props.business].muted;
    this.context.setState((previousState) => update(previousState, {
      userInfo: { 
          [this.props.business]: {
              muted: {$set: newValue},
          }
      }
  }));
  }

  render() {
    let userInfo = this.context.userInfo;

    let muteIcon = null;
    if (userInfo[this.props.business].muted) {
      muteIcon = (
        <img
          id={this.props.business + "_mute"}
          src={blank}
          className="icons icons-map icons-mute"
          alt={this.props.full_name + " mute icon"}
          style={{
            top: "calc(" + userInfo[this.props.business].map_position.y + "% - 8px)",
            left: "calc(" + userInfo[this.props.business].map_position.x + "% + 8px)",
          }}
        />
      )
    }

    return (
      <React.Fragment>
        <img
          id={this.props.business + "_map"}
          src={blank}
          className={"icons icons-map icons-" + this.props.business + (userInfo[this.props.business].muted != null ? " clickable" : "")}
          alt={this.props.full_name + " icon"}
          style={{
            top: userInfo[this.props.business].map_position.y + "%",
            left: userInfo[this.props.business].map_position.x + "%",
          }}
          onClick={userInfo[this.props.business].muted != null ? this.muteBusiness : undefined}
        />
        {muteIcon}
      </React.Fragment>
    );
  }
}

export default MapIcon;