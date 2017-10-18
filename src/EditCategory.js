import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  FlatList
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'

export default class EditCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.category,
      budget: (props.navigation.state.params === undefined)?undefined:props.navigation.state.params.budget,
    }
    console.log("DKKDKDKDKKDKKDKDKLDLKDLKDKLKLDSLKS", this.state, 'fdsjkldflsjkkljfdsjklfdsjkldfs', props.navigation.state.params)
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
    this.editTransactionButtonPress = this.editTransactionButtonPress.bind(this)
    this.deleteButtonPress = this.deleteButtonPress.bind(this)
    this.updateBudget = this.updateBudget.bind(this)
  }

  //update budget
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
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', resp)
      var category = this.state.category
      for (var i = 0; i < resp.categories.length; i++) {
          if (resp.categories[i].slug === this.state.category.slug) {
            category = resp.categories[i]
            break;
          }
      }
      this.setState({ budget: resp, category }, () => {
        console.log('FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO upda')
        setTimeout(() => {

        })
        this.forceUpdate()
      })
    }
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

  //EDITINGBBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    let { resp, error } = await API.build().authenticated().put({
        //how do you get the Budget ID?
        endpoint: `/budgets/${this.state.budget._id}/categories/${this.state.category.slug}`,
        body: {
          name: this.state.category.name,
          amount: this.state.category.amount,
        }
      })
      if (error) {
        Alert.alert(
          'Whoops!',
          error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        await this.props.navigation.state.params.updateBudget()
        this.props.navigation.goBack()
      }
  }

  async deleteButtonPress() {
    let { resp, error } = await API.build().authenticated().delete({
        //how do you get the Budget ID or CategorySlug?
        endpoint: `/budgets/${this.state.budget._id}/categories/${this.state.category.slug}`,
      })
      if (error) {
        Alert.alert(
          'Whoops!',
          error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        await this.props.navigation.state.params.updateBudget()
        //navigate back a page
        this.props.navigation.goBack()
      }
  }

  //other buttons
  async editTransactionButtonPress(transaction){
    console.log('Edit Transaction')
    console.log('CAAAAAAAAAAAAAAAAAAAA', transaction)
    this.props.navigation.navigate('EditTransaction', {
      transaction,
      category: this.state.category,
      budget: this.state.budget,
      updateBudget: this.updateBudget })
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <EditingBanner
          header = {'Edit Category'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
            <StyledTextInput
              labelText={'Category Name'}
              value={this.state.category.name}
              onChangeText={(name) => {
                this.setState({ category: Object.assign({}, this.state.category, { name })})
              }} />
            <StyledTextInput
              labelText={`Budget Amount`}
              value={String(this.state.category.amount)}
              onChangeText={(amount) => {
                  this.setState({
                    category: Object.assign({}, this.state.category, { amount: parseInt(amount, 10) })})
                  }} />
            <View style={styles.container}>
                <FlatList
                  data={this.state.category.transactions}
                  keyExtractor={item => item._id}
                  renderItem={(transaction) =>  {
                  console.log("GOT TRAN", transaction)
                  return (
                    <StyledButton
                        key={transaction.item._id}
                        style={{marginTop: 10}}
                        title={'Edit ' + transaction.item.name}
                        onPress={() => this.editTransactionButtonPress(transaction.item)}
                        />
                    )
                    }}
                  />
                </View>
            <StyledButton
              style={{marginTop: 10}}
              title={`Delete Category`}
              onPress={this.deleteButtonPress}
              />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
