import React from 'react';
import { InfoContext, defaultUserInfo } from './infoContext';
import Map from './Map';
import MCBusiness from './MCBusiness';

class App extends React.Component {
  constructor(props) {
    super(props);

    /*this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };*/

    // State also contains the updater function so it will be passed down into the context provider
    this.state = {
      userInfo: defaultUserInfo,
    };
  }

  render() {
    return (
      <InfoContext.Provider value={this.state}>
        <Map />
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
      </InfoContext.Provider>
    );
  }
}

export default App;