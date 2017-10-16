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
import BudgetsPage from './src/BudgetsPage';
module.exports = StackNavigator({
  BudgetsPage: { screen: BudgetsPage},
  Login: { screen: Login },
  Profile: { screen: Profile },
});
