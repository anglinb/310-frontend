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

module.exports = StackNavigator({
  NewCategory: { screen: NewCategory },
  Login: { screen: Login },
  AccountSettings: { screen: AccountSettings },
  NewTransaction: { screen: NewTransaction },
  EditTransaction: { screen: EditTransaction },
  NotificationSettings: { screen: NotificationSettings },
  EditCategory: { screen: EditCategory },
  AccountSetUp: { screen: AccountSetUp },
  Budget: { screen: Budget },
  Profile: { screen: Profile },
});
