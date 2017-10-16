import React from 'react';
import {
  Navigator,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Login from './src/Login';
import NewCategory from './src/NewCategory';
import NewTransaction from './src/NewTransaction';
import EditTransaction from './src/EditTransaction';
import EditCategory from './src/EditCategory';
import Profile from './src/Profile';
import Budget from './src/Budget';
import NotificationSettings from './src/NotificationSettings';
import AccountSetUp from './src/AccountSetUp';
import AccountSettings from './src/AccountSettings';
import ControlBanner from './src/components/ControlBanner';
import HamburgerNavigation from './src/HamburgerNavigation';

module.exports = StackNavigator({
  Budget: { screen: Budget },
  AccountSettings: { screen: AccountSettings },
  NewTransaction: { screen: NewTransaction },
  EditCategory: { screen: EditCategory },
  NewCategory: { screen: NewCategory },
  HamburgerNavigation: { screen: HamburgerNavigation },
  Login: { screen: Login },
  EditTransaction: { screen: EditTransaction },
  NotificationSettings: { screen: NotificationSettings },
  AccountSetUp: { screen: AccountSetUp },
  Profile: { screen: Profile },
});
