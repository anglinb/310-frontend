import React from 'react';
import {
  Alert,
  Container,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import config from '../config'

export default class EditingBanner extends React.Component {

  //need to change the Y button to a check image
  render() {
    return (
      <View>
        <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.lightGreen}])}>
          <TouchableHighlight onPress={this.props.xButtonPress} accessible={true} accessibilityLabel={'editing-cancel'}>
            <Image
              style={{width: 20, height: 20, alignSelf: 'center'}}
              source={require('../assets/x.png')}
              />
          </TouchableHighlight>
          <Text style={styles.headerText}>{ this.props.header }</Text>
          <TouchableHighlight onPress={this.props.yButtonPress} accessible={true} accessibilityLabel={'checkmark'}>
            <Image
              style={{width: 20, height: 20, alignSelf: 'center'}}
              source={require('../assets/checkmark.png')}
              />
          </TouchableHighlight>
        </View>
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
