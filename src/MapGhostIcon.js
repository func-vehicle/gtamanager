import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedIndex
} from './redux/locationSlice';

import { staticInfo } from './InfoContext';
import blank from './img/blank.png';

export const MapGhostIcon = React.memo((props) => {

  const dispatch = useDispatch();
  
  function setSelected() {
    dispatch(setSelectedIndex(props.index));
  }

  let location = staticInfo[props.business].locations[props.index];

  return (
    <img
      src={blank}
      className={"icons icons-map icons-" + props.business + (props.selected ? "" : " clickable faded")}
      alt={location.name + " " + props.business + " icon"}
      style={{
          top: location.y + "%",
          left: location.x + "%",
      }}
      onClick={props.selected ? undefined : setSelected}
    />
  );
});

export default MapGhostIcon;