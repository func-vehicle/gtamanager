import React from 'react';
import { connect } from 'react-redux';

import TabBunker from './TabBunker';
import TabMCBusiness from './TabMCBusiness';
import TabNightclub from './TabNightclub';
import TabImportExport from './TabImportExport';
import TabWheel from './TabWheel';
import TabFees from './TabFees';
import { useWindowDimensions, calculateScrollbarWidth, useWidthDetector } from './Utility';

const business_objects = {
  bunker: <TabBunker />,
  coke: <TabMCBusiness business="coke" />,
  meth: <TabMCBusiness business="meth" />,
  cash: <TabMCBusiness business="cash" />,
  weed: <TabMCBusiness business="weed" />,
  forgery: <TabMCBusiness business="forgery" />,
  nightclub: <TabNightclub />,
  importExport: <TabImportExport />,
  wheel: <TabWheel />,
}

const mapStateToProps = (state) => {
  let newProps = {
    hideUnowned: state.userInfo.settings.hide_unowned,
  }
  for (let business of Object.keys(business_objects)) {
    newProps[business] = state.userInfo[business].owned;
  }
  return newProps;
}

const InfoTabContainer = (props) => {
 
  let inactiveDiv = (
    <div id="inactiveBusinesses" className="business-section">
      {Object.keys(business_objects).map((key) => (
        <React.Fragment key={key}>
          {!props[key] && business_objects[key]}
        </React.Fragment>
      ))}
    </div>
  )

  const ref = React.createRef();
  const {width} = useWindowDimensions();

  const accomodateScrollbar = () => {
    if (ref.current == null) {
      return;
    }
    if (width <= 600) {
      ref.current.style.width = null;
      return;
    }
    let scrollWidth = calculateScrollbarWidth(ref.current);
    ref.current.style.width = 220 + scrollWidth + "px";
  }

  useWidthDetector(ref, () => {
    accomodateScrollbar();
  });

  return (
    <div id="infotab" ref={ref}>
      <div id="activeBusinesses" className="business-section">
        {Object.keys(business_objects).map((key) => (
          <React.Fragment key={key}>
            {props[key] && business_objects[key]}
          </React.Fragment>
        ))}
        <TabFees />
      </div>
      {!props.hideUnowned && inactiveDiv}
    </div>
  );
}

export default connect(mapStateToProps)(InfoTabContainer);