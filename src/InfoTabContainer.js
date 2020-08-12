import React from 'react';

import MCBusiness from './MCBusiness';

class InfoTabContainer extends React.Component {
  render() {
    return (
      <div id="infotab" className="col">
        <MCBusiness 
          business="coke"
          full_name="Cocaine"
          short_name="Cocaine"
        />
        <MCBusiness 
          business="meth"
          full_name="Methamphetamine"
          short_name="Meth"
        />
        <MCBusiness 
          business="cash"
          full_name="Counterfeit Cash"
          short_name="Counterfeit Cash"
        />
        <MCBusiness 
          business="weed"
          full_name="Weed"
          short_name="Weed"
        />
        <MCBusiness 
          business="forgery"
          full_name="Document Forgery"
          short_name="Doc. Forgery"
        />
      </div>
    );
  }
}

export default InfoTabContainer;