
import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import LandingPageUI from './LandingPageUI';
import Login from './Login';
import ChangePassword from './ChangePassword'
import PasswordToken from './PasswordToken'

const UnauthedNavigator = StackNavigator({
    LandingPageUI: { screen: LandingPageUI },
    ChangePassword: { screen: ChangePassword },
    PasswordToken: { screen: PasswordToken },
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
