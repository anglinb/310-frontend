import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Picker,
  ScrollView
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import StyledPicker from './components/StyledPicker'
import ControlBanner from './components/ControlBanner'
import TransactionEntry from './components/TransactionEntry'

export default class PickCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: ['TA Stipend','Work Study','Shits & Gigs'],
      selectedCategory: '',
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  async componentDidMount() {
    //NEED TO WORK TO GET THE CATEGORIES!!
    //TODO: match the categories for the specified budget

    /*let { resp, error } = await API.build().authenticated().get({
      endpoint: '/budgets'
    })

    const budgetsList = resp.map((obj) => {
      obj.key = obj.name
      return obj;
    })

    this.setState({'budgets':budgetsList})
    this.handleButtonPress = this.handleButtonPress.bind(this)*/
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    //already at transaction so leave empty
    this.props.navigation.navigate('NewTransaction')
  }

  //EDITINGBANNER buttons
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }

  async yButtonPress() {
    //send over the category selection to the prop
    this.props.navigation.state.params.returnCategory(this.state.selectedCategory)
    this.props.navigation.goBack()
  }

  render() {
    let categoryItems = this.state.categories.map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        })

    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
          />
        <EditingBanner
          header = {'Select Category'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <ScrollView>
          <View style={{padding: 10}}>
          <Picker
              mode={'dropdown'}
              selectedValue={this.state.selectedCategory}
              onValueChange={(cat) => this.setState({selectedCategory: cat})}>
              {categoryItems}
              </Picker>
            </View>
          </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
