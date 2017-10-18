import React from 'react';
import {
  Navigator,
  StyleSheet,
  Button,
  Text,
  View,
  Image
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import UnautherWrapper from './src/UnauthedNavigator'
import AuthenticatedWrapper from './src/AuthenticatedNavigator'
import Splash from './src/Splash'
import Analytics from './src/Analytics'

module.exports = StackNavigator({
    // Analytics: { screen: Analytics }
    Splash: { screen: Splash },
    AuthenticatedWrapper: { screen: AuthenticatedWrapper},
    UnautherWrapper: { screen: UnautherWrapper}
  },
  {
    navigationOptions: {
      gesturesEnabled: false
    },
    mode: 'modal'
      }
);
