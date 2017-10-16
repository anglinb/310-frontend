import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  Image,
} from 'react-native';

import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'
import Container from './components/Container'
import API from './lib/API'

//need to put this is terminal:
//install react-native-camera-roll-picker --save
import CameraRollPicker from 'react-native-camera-roll-picker'

export default class CameraRoll extends React.Component {
  getSelectedImages(image){
    if(image[0]){
      //post the image to their Profile
      //you will render the image back at the AccountSettings
      //navigate back to AccountSettings
      this.props.navigation.navigate('AccountSettings', {name: 'Lucy'})
    }
  }
}
