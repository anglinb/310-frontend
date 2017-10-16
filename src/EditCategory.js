import React from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import Container from './components/Container'
import EditingBanner from './components/EditingBanner'
import API from './lib/API'
import Store from './lib/Store'
import config from './config'
import StyledTextInput from './components/StyledTextInput'
import StyledButton from './components/StyledButton'

export default class EditCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      budgetAmount: '',
    }
  }

  render() {
    return (
      <Container style={{padding: 0}}>
        <EditingBanner
          header = {'Edit Category'}
          />
        <View style={{padding: 10}}>
          <StyledTextInput
            labelText={'Category Name'}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})} />
            <StyledTextInput
              labelText={`Budget Amount`}
              value={this.state.budgetAmount}
              onChangeText={(budgetAmount) => this.setState({budgetAmount})} />
              <StyledButton
              style={{marginTop: 20}}
              title={`Save Category`}
            />
            <StyledButton
            style={{marginTop: 20}}
            title={`Delete Category`}
          />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
});
