import React from 'react';
import { 
  StyleSheet,
  Button,
  Text, 
  View
} from 'react-native';

export default class Profile extends React.Component {

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Profile here fkjsdlfjdslfjdl {params.name}</Text>
      </View>
    )
  }
}