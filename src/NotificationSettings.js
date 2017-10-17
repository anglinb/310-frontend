import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Switch
} from 'react-native';

import Container from './components/Container'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import EditingBanner from './components/EditingBanner'
import ControlBanner from './components/ControlBanner'

export default class NotificationSettings extends React.Component {

  //default thresholds are 50,90,100
  //default notification freq is Weekly
  constructor(props) {
    super(props);
    this.state = {
      fifty: true,
      sixty: false,
      seventy: false,
      eighty: false,
      ninety: true,
      hundred: true,
      //daily: false,
      //twiceWeekly: false,
      //weekly: true,
      //never: false,
    }
    this.xButtonPress = this.xButtonPress.bind(this)
    this.yButtonPress = this.yButtonPress.bind(this)
    this.hamburgerButtonPress = this.hamburgerButtonPress.bind(this)
    this.transactionButtonPress = this.transactionButtonPress.bind(this)
  }

  //CONTROLBANNER buttons
  async hamburgerButtonPress(){
    //this is a placeholder until we get Hamburger running
    this.props.navigation.navigate('HamburgerNavigation')
  }
  async transactionButtonPress(){
    this.props.navigation.navigate('NewTransaction')
  }

  //CONTROL BUTTONS
  async xButtonPress() {
    //navigate back a page
    this.props.navigation.goBack()
  }
  async yButtonPress() {
    //PUT call to update the notifications

    //navigate back to Account Settings
    this.props.navigation.navigate('AccountSettings')
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <ControlBanner
          hamburgerButtonPress={() => {this.hamburgerButtonPress()}}
          transactionButtonPress={() => {this.transactionButtonPress()}}
            />
        <EditingBanner
          header = {'Notification Settings'}
          xButtonPress={() => {this.xButtonPress()}}
          yButtonPress={() => {this.yButtonPress()}}
          />
        <View style={{padding: 10}}>
        <Text style={styles.headerText}>{`Notification Threshold`}</Text>
        <View style={styles.leftRight}>
          <View style={styles.leftRight}>
            <Text style={styles.headerText}>{`50%`}</Text>
            <Switch
              onValueChange={(value) => this.setState({fifty: value})}
              value={this.state.fifty}
              onTintColor={config.lightGreen}/>
          </View>
          <Text style={styles.headerText}>{`80%`}</Text>
          <Switch
            onValueChange={(value) => this.setState({eighty: value})}
            value={this.state.eighty}
            onTintColor={config.lightGreen}/>
        </View>
        <View style={styles.leftRight}>
          <View style={styles.leftRight}>
            <Text style={styles.headerText}>{`60%`}</Text>
            <Switch
              onValueChange={(value) => this.setState({sixty: value})}
              value={this.state.sixty}
              onTintColor={config.lightGreen}/>
          </View>
          <Text style={styles.headerText}>{`90%`}</Text>
          <Switch
            onValueChange={(value) => this.setState({ninety: value})}
            value={this.state.ninety}
            onTintColor={config.lightGreen}/>
        </View>
        <View style={styles.leftRight}>
          <View style={styles.leftRight}>
            <Text style={styles.headerText}>{`70%`}</Text>
            <Switch
              onValueChange={(value) => this.setState({seventy: value})}
              value={this.state.seventy}
              onTintColor={config.lightGreen}/>
          </View>
          <Text style={styles.headerText}>{`100%`}</Text>
          <Switch
            onValueChange={(value) => this.setState({hundred: value})}
            value={this.state.hundred}
            onTintColor={config.lightGreen}/>
        </View>
        </View>
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
