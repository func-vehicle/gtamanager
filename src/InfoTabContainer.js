import React from 'react';

import TabBunker from './TabBunker';
import TabMCBusiness from './TabMCBusiness';
import TabNightclub from './TabNightclub';
import TabImportExport from './TabImportExport';

class InfoTabContainer extends React.Component {
  render() {
    return (
      <div id="infotab" className="col">
        <TabBunker />
        <TabMCBusiness business="coke" />
        <TabMCBusiness business="meth" />
        <TabMCBusiness business="cash" />
        <TabMCBusiness business="weed" />
        <TabMCBusiness business="forgery" />
        <TabNightclub />
        <TabImportExport />
      </div>
    );
  }
}

export default InfoTabContainer;