import React from 'react';
import {
  Alert,
  Container,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import config from '../config'

export default class ControlBanner extends React.Component {

  //need to change the images to buttons with icons
  render() {
    return (
      <View style={StyleSheet.flatten([styles.leftRight, {marginTop: 0, marginBottom: 0}])}>
        <TouchableHighlight onPress={this.props.hamburgerButtonPress}>
          <Image accessible={true} accessibilityLabel={'hamburger'}
            style={{width: 20, height: 20, alignSelf: 'center'}}
            source={require('../assets/hamburger.png')}
          />
        </TouchableHighlight>
        <Image source={require('../assets/Logo.png')}
          style={{width: 60, height: 20, alignSelf: 'center'}}/>
        <TouchableHighlight onPress={this.props.transactionButtonPress}>
          <Image
            style={{width: 30, height: 30, alignSelf: 'center'}}
            source={require('../assets/transaction.png')}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: config.white,
    fontSize: 18,
    fontWeight: '600',
  },
  leftRight: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    fontFamily: config.font,
    fontWeight: '600',
    color: '#fff',
  },
});
