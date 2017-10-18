import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import NewCategory from './NewCategory';
import NewBudget from './NewBudget';

import NewTransaction from './NewTransaction';
import EditTransaction from './EditTransaction';
import EditCategory from './EditCategory';
import Profile from './Profile';
import EditBudget from './EditBudget';
import Budget from './Budget';
import BudgetsPage from './BudgetsPage';

import NotificationSettings from './NotificationSettings';
import AccountSetUp from './AccountSetUp';
import AccountSettings from './AccountSettings';
import ControlBanner from './components/ControlBanner';
import HamburgerNavigation from './HamburgerNavigation';

import Analytics from './Analytics';

const StackModalNavigator = (routeConfigs, navigatorConfig) => {
  const CardStackNavigator = StackNavigator(routeConfigs, navigatorConfig);
  const modalRouteConfig = {};
  const routeNames = Object.keys(routeConfigs);

  for (let i = 0; i < routeNames.length; i++) {
    modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
  }

  const ModalStackNavigator = StackNavigator({
    CardStackNavigator: { screen: CardStackNavigator },
    ...modalRouteConfig
  }, {
    mode: 'modal',
    headerMode: 'none'
  });

  return ModalStackNavigator;
};
const AuthenticatedNavigator = StackModalNavigator({
    BudgetsPage: { screen: BudgetsPage},
    NewTransaction: { screen: NewTransaction },
    Budget: { screen: Budget },
    AccountSettings: { screen: AccountSettings },
    NewBudget: {screen: NewBudget},
    EditCategory: { screen: EditCategory },
    NewCategory: { screen: NewCategory },
    HamburgerNavigation: { screen: HamburgerNavigation },
    EditTransaction: { screen: EditTransaction },
    NotificationSettings: { screen: NotificationSettings },
    AccountSetUp: { screen: AccountSetUp },
    EditBudget: { screen: EditBudget },
    Profile: { screen: Profile },
    Analytics: { screen: Analytics },
  },{
    headerMode: "none",
  })

module.exports = AuthenticatedNavigator
