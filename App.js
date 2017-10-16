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
import Budget from './src/Budget';

module.exports = StackNavigator({
  Budget: { screen: Budget },
  Login: { screen: Login },
  Profile: { screen: Profile },
});
