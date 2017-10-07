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

import Login from './src/Login';
import Profile from './src/Profile';

module.exports = StackNavigator({
  Login: { screen: Login },
  Profile: { screen: Profile },
});
