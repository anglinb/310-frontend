import React from 'react';
import { 
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';

export default class Container extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let centeringStyles = this.props.centerContent ? { justifyContent: 'center' }  : { }

    if (this.props.avoidKeyboard) {
      return (
       <KeyboardAvoidingView style={StyleSheet.flatten([containerStyles.container, centeringStyles, this.props.style])}  behavior="padding">
          { this.props.children }
       </KeyboardAvoidingView>
      )
    }

    return (
      <View style={StyleSheet.flatten([containerStyles.container, centeringStyles, this.props.style])}>
        { this.props.children }
      </View>
    )
  }
}

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  } 
})