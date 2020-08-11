import React from 'react';
import './html5reset.css';
import './style.css';
import blank from './img/blank.png';

class MapIcon extends React.Component {
  render() {
    return (
      <img
        id={this.props.business + "_map"}
        src={blank}
        className={"icons icons-map icons-" + this.props.business + " clickable"}
        alt={this.props.full_name + " icon"}
      />
    );
  }
}

export default MapIcon;