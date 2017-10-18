import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image
} from 'react-native';

import Container from './components/Container'
import Store from './lib/Store'
import config from './config'
import AnalyticsChart from './components/AnalyticsChart'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import ControlBanner from './components/ControlBanner'


export default class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      budget: props.navigation.state.params.budget || null,
    }
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
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

  render() {
    return (
     <Container style={{padding:0}}>
     <ControlBanner
       hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
       transactionButtonPress={() => {this.transactionButtonPress()}}
     />
      <View>
      <AnalyticsChart
        budget={this.state.budget}/>
      </View>
     </Container>
   )
  }
}

const styles = StyleSheet.create({
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  middle: {
    padding: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
