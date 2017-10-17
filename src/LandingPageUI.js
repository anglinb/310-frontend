import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import BudgetBanner from './components/BudgetBanner'
import BudgetStatusBar from './components/BudgetStatusBar'
import LandingPage from './components/LandingPage'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'

export default class LandingPageUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  

  render() {
    return (
      <Container style={{padding: 0}}>
        <View style={styles.leftRight}>
        </View>
        <LandingPage
          navigation={this.props.navigation}
          budgetRatio={``}
          resetDate={``}
          />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.veryDarkText,
    fontSize: 20,
    fontWeight: '600',
  },
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
