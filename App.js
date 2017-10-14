import React from 'react';
import {
  Navigator,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import HamburgerMenuUI from './src/HamburgerMenuUI';
import Login from './src/Login';
import Profile from './src/Profile';
import ControlUI from './src/ControlUI';

module.exports = StackNavigator({
  HamburgerMenuUI: { screen: HamburgerMenuUI },
  Login: { screen: Login },
  ControlUI: { screen: ControlUI },
  Profile: { screen: Profile },
});
