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

import Login from './src/Login';
import NewCategory from './src/NewCategory';
import NewTransaction from './src/NewTransaction';
import EditTransaction from './src/EditTransaction';
import EditCategory from './src/EditCategory';
import Profile from './src/Profile';
import Budget from './src/Budget';
import LandingPageUI from './src/LandingPageUI';
import BudgetsPage from './src/BudgetsPage';

import NotificationSettings from './src/NotificationSettings';
import AccountSetUp from './src/AccountSetUp';
import AccountSettings from './src/AccountSettings';
import ControlBanner from './src/components/ControlBanner';
import HamburgerNavigation from './src/HamburgerNavigation';

module.exports = StackNavigator({
  NewTransaction: { screen: NewTransaction },
  Budget: { screen: Budget },
  AccountSettings: { screen: AccountSettings },
  EditCategory: { screen: EditCategory },
  NewCategory: { screen: NewCategory },
  HamburgerNavigation: { screen: HamburgerNavigation },
  EditTransaction: { screen: EditTransaction },
  NotificationSettings: { screen: NotificationSettings },
  AccountSetUp: { screen: AccountSetUp },
  LandingPageUI: { screen: LandingPageUI },
  BudgetsPage: { screen: BudgetsPage},
  Login: { screen: Login },
  Profile: { screen: Profile },
});
