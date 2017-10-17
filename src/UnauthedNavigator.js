
import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import LandingPageUI from './LandingPageUI';
import Login from './Login';

const UnauthedNavigator = StackNavigator({
    LandingPageUI: { screen: LandingPageUI },
    Login: { screen: Login }
  },{
    headerMode: "none",
  })

export default class UnautherWrapper extends React.Component {

  static navigationOptions = {
    headerLeft: null
  } 

  render() {
    return (
      <UnauthedNavigator
        screenProps={{rootNavigator: this.props.navigation}} />
    )
  }
}