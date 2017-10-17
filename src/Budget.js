import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';
import Hr from 'react-native-hr';

import Container from './components/Container'
import BudgetBanner from './components/BudgetBanner'
import BudgetStatusBar, { BudgetStatusBarDates, BudgetStatusBarCategory } from './components/BudgetStatusBar'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import ControlBanner from './components/ControlBanner'

export default class Budget extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
      isEditing: false,
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.renderCategories = this.renderCategories.bind(this)
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    console.log('navigate to transaction')
    this.props.navigation.navigate('NewTransaction')
  }

   async componentDidMount() {
    let token = await Store.authenticationStore().getAuthenticationToken()
    console.log('TOKEN !!!!', token)
    let { resp, error } = await API.build().authenticated().get({
      endpoint: `/budgets/${this.state.budget._id}`
    })
    console.log('TKELWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWOKEN !!!!', token)
    this.setState({ budget: resp })
  }

  renderCategories() {
    return (
      <View>
        {this.state.budget.categories.map((category, index) => {
          return <BudgetStatusBarCategory key={category.slug} category={category} />
        })}
      </View>
    )
  }

  renderTransactions() {
    return (
      <View>
        {this.state.bu}
      </View>
    )
  } 

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <View style={styles.leftRight}>
          <Text style={styles.headerText}>{this.state.budget ? this.state.budget.name : `Loading...`}</Text>
          <Button onPress={()=> {}} title={`Edit`} />
        </View>
        <BudgetBanner
          budget={this.state.budget}
          />
        <BudgetStatusBarDates
          budget={this.state.budget}
          />
          <View  style={{marginTop: 10, marginBottom: 10, height: 1, backgroundColor: config.darkText }}></View>
          <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Categories`}</Text>
          {this.renderCategories()}
          <View  style={{marginTop: 10, marginBottom: 10, height: 1, backgroundColor: config.darkText }}></View>
          <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Recent Transactions`}</Text>
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
