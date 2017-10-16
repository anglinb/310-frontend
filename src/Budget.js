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
import API from './lib/API'
import Store from './lib/Store'
import config from './config'

export default class Budget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    // This would happen in the login component
    let authStore = Store.authenticationStore()




    /// htis  is her


    let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets/59e3ff07bce41056bf4deb81'
    })
    console.log('FLJEWLJFEWJL resp', resp)
    console.log('FLJEWLJFEWJL error', error)
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <View style={styles.leftRight}>
          <Text style={styles.headerText}>{`TA Stipend Budget`}</Text>
          <Button title={`Edit`} />
        </View>
        <BudgetBanner
          budgetRatio={`fsdlkdsjlk`}
          resetDate={`10/1`}
          />
        <BudgetStatusBar
          leftLabel={`9/21`}
          rightLabel={`10/21`}
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
