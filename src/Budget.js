import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Hr from 'react-native-hr';

import Container from './components/Container'
import BudgetBanner from './components/BudgetBanner'
import BudgetStatusBar, { BudgetStatusBarDates, BudgetStatusBarCategory } from './components/BudgetStatusBar'
import API from './lib/API'
import Store from './lib/Store'
import NotificationsHelper from './lib/NotificationsHelper'
import config from './config'
import ControlBanner from './components/ControlBanner'
import TransactionRow from './components/TransactionRow'
import StyledButton from './components/StyledButton'

export default class Budget extends React.Component {

   constructor(props) {

    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
      isEditing: false,
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.updateBudget = this.updateBudget.bind(this)
    this.editButtonPress = this.editButtonPress.bind(this)
    this.analyticsButtonPress = this.analyticsButtonPress.bind(this)
    this.archiveButtonPress = this.archiveButtonPress.bind(this)
  }


  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    this.props.navigation.navigate('NewTransaction', { budget: this.state.budget, updateBudget: this.updateBudget })
  }

  async editButtonPress(){
    console.log('EditingBudget')
    this.props.navigation.navigate('EditBudget', { budget: this.state.budget,  updateBudget: this.updateBudget })
  }

  async analyticsButtonPress() {
    console.log('Analytics')
    this.props.navigation.navigate('Analytics', { budget: this.state.budget })
  }

  async archiveButtonPress() {
    console.log('Archive')
    this.props.navigation.navigate('Archive', { budget: this.state.budget })
  }

  async updateBudget() {
    const endpoint = "/budgets/" + this.state.budget._id
    let { resp, error } = await API.build().authenticated().get({
      endpoint: endpoint
    })
    if (error) {
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      this.setState({ budget: resp }, () => {
        this.forceUpdate()
      })
    }
  }

  async componentDidMount() {


    // throw "ERROR"
    console.log('dkkkkkkkkkkkdkdkdklsfjjlsdj;flj;slajfepowihjafopehwpaoifihewopaihfepoiwhafpoi')
    await this.updateBudget()

    // let notifHelper = new NotificationsHelper({ budget: this.state.budget })
    // notifHelper.calculateThresholds()
  }

  render() {
    let categories = null
    let transactions = null
    if(this.state.budget && this.state.budget.categories) {
      transactions = this.state.budget.categories.map((category, index) => {
        return category.transactions.map((transaction, index) => {
          return <TransactionRow transaction={transaction} />
        })
      })
      categories = this.state.budget.categories.map((category, index) => {
        return <BudgetStatusBarCategory key={category.slug} category={category} />
      })
    }

    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <ScrollView accessible={true} accessibilityLabel={'budget-scroll'}>
          <View style={styles.leftRight}>
            <Text style={styles.headerText}>{this.state.budget ? this.state.budget.name : `Loading...`}</Text>
            <Button onPress={this.editButtonPress} title={`Edit`} accessible={true} accessibilityLabel={'budget-edit'} />
          </View>
          <BudgetBanner
            budget={this.state.budget}
            />
          <BudgetStatusBarDates
            budget={this.state.budget}
            />
          <View  style={{marginTop: 10, marginBottom: 10, height: 1, backgroundColor: config.darkText }}></View>
          <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Categories`}</Text>
          <View>
            {(categories)?categories:null}
          </View>
          <View style={styles.leftRight}>
            <StyledButton
              style={{marginTop: 5, width: 148}}
              title={`Breakdown`}
              onPress={this.analyticsButtonPress}
              />
            <StyledButton
              style={{marginTop: 5, width: 148}}
              title={`History`}
              onPress={this.archiveButtonPress}
              />
          </View>
          <View style={styles.leftRight}>
            <StyledButton
              style={{marginTop: 5, width: 148}}
              title={`Rollover`}
              onPress={() => {
                this.props.navigation.navigate('RolloverSelection', {
                  budget: this.state.budget,
                  updateBudget: this.updateBudget
                })
              }}
              />
          </View>
          <View  style={{marginTop: 10, marginBottom: 10, height: 1, backgroundColor: config.darkText }}></View>
          <Text style={StyleSheet.flatten([styles.headerText, { padding: 10 }])}>{`Recent Transactions`}</Text>
          {(transactions)?transactions:null}
        </ScrollView>
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
