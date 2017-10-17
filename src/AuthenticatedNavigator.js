import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import NewCategory from './NewCategory';
import NewTransaction from './NewTransaction';
import EditTransaction from './EditTransaction';
import EditCategory from './EditCategory';
import Profile from './Profile';
import Budget from './Budget';
import BudgetsPage from './BudgetsPage';


import NotificationSettings from './NotificationSettings';
import AccountSetUp from './AccountSetUp';
import AccountSettings from './AccountSettings';
import ControlBanner from './components/ControlBanner';
import HamburgerNavigation from './HamburgerNavigation';


const AuthenticatedNavigator = StackNavigator({
    BudgetsPage: { screen: BudgetsPage},
    NewTransaction: { screen: NewTransaction },
    Budget: { screen: Budget },
    AccountSettings: { screen: AccountSettings },
    EditCategory: { screen: EditCategory },
    NewCategory: { screen: NewCategory },
    HamburgerNavigation: { screen: HamburgerNavigation },
    EditTransaction: { screen: EditTransaction },
    NotificationSettings: { screen: NotificationSettings },
    AccountSetUp: { screen: AccountSetUp },
    Profile: { screen: Profile },
  },{
    headerMode: "none",
  })

module.exports = AuthenticatedNavigator
