import React from 'react';
import { InfoContext, defaultUserInfo } from './infoContext';
import Map from './Map';
import InfoTabContainer from './InfoTabContainer';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Gigantic brain giga-hack
    this.setNewState = (func) => {
      this.setState(func);
    }

    // State also contains the updater function so it will be passed down into the context provider
    this.state = {
      userInfo: defaultUserInfo,
      setState: this.setNewState,
    };
  }

  render() {
    return (
      <InfoContext.Provider value={this.state}>
        <Map />
        <InfoTabContainer />
      </InfoContext.Provider>
    );
  }
}

export default App;