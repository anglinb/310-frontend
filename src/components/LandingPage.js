import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View
} from 'react-native';

import config from '../config'
import StyledButton from './StyledButton'

class LandingPageItem extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.bannerItemTop}>{this.props.topText}</Text>
        <Text style={styles.bannerItemBottom}>{this.props.bottomText}</Text>
      </View>
    )
  }
}

export default class LandingPage extends React.Component {

  render() {
    return (
       <View style={StyleSheet.flatten([styles.upDown, {backgroundColor: config.white}])}>
          <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.white}])}>
            <Image
            source={require('../assets/wallet.png')}
            style={{width: 40, height: 40, alignSelf: 'center'}}
            />
            <LandingPageItem
              topText={'Track Spending'}
              bottomText={`Manage multiple budgets in one place and add custom spending categories.`}
            />
          </View>
          <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.white}])}>
             <Image
             source={require('../assets/cards.png')}
             style={{width: 40, height: 40, alignSelf: 'center'}}
             />
             <LandingPageItem
               topText={'Stay Organized'}
               bottomText={`Manage multiple budgets in one place and add custom spending categories.`}
             />
           </View>
           <View style={StyleSheet.flatten([styles.leftRight, {backgroundColor: config.white}])}>
                <Image
                source={require('../assets/prayers.png')}
                style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <LandingPageItem
                  topText={'Regain Sanity'}
                  bottomText={`Finances shouldn't drive you crazy. $anity lets you get back to your life.`}
                />
            </View>
          <StyledButton
          title={`Get Started`}
          onPress={() => this.props.navigation.navigate('Login')}
          />
          <Text style={styles.bannerItemVeryBottom}>{'Tap the button above to get started.'}</Text>
         </View>





    )
  }
}


const styles = StyleSheet.create({
  upDown: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 100,
    paddingBottom:30,
    paddingRight: 10,
    paddingLeft: 10
  },
  leftRight: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  bannerItemTop: {
    fontSize: 24,
    fontFamily: config.font,
    fontWeight: '600',
    textAlign: 'left',
    color: config.veryDarkText,
  },
  bannerItemBottom: {
    fontSize: 10,
    fontFamily: config.font,
    fontWeight: '600',
    color: config.veryDarkText,
    textAlign: 'left',
    maxWidth: 225
  },
  bannerItemVeryBottom: {
    fontSize: 8,
    fontFamily: config.font,
    fontWeight: '600',
    color: config.veryDarkText,
    textAlign: 'center'
  },
  bannerBottomText: {
    color: '#f0fc'
  }
  // canvas: {
  //   flex:1
  //   width: 200,
  //   height: 200
  // }
});
