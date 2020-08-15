import React, { useContext } from 'react';

import TabBunker from './TabBunker';
import TabMCBusiness from './TabMCBusiness';
import TabNightclub from './TabNightclub';
import TabImportExport from './TabImportExport';
import TabWheel from './TabWheel';
import TabFees from './TabFees';
import { InfoContext } from './InfoContext';

export const InfoTabContainer = React.forwardRef((props, ref) => {
  const context = useContext(InfoContext);

  let business_objects = {
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

  let inactiveDiv = (
    <div id="inactiveBusinesses" className="business-section">
      {Object.keys(business_objects).map((key) => (
        <React.Fragment key={key}>
          {!context.userInfo[key].owned && business_objects[key]}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div id="infotab" className="col" ref={ref}>
      <div id="activeBusinesses" className="business-section">
        {Object.keys(business_objects).map((key) => (
          <React.Fragment key={key}>
            {context.userInfo[key].owned && business_objects[key]}
          </React.Fragment>
        ))}
        <TabFees />
      </div>
      {!context.userInfo.settings.hide_unowned && inactiveDiv}
    </div>
  );
});

export default InfoTabContainer;