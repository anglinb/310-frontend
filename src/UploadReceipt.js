import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

import API from './lib/API'

export default class App extends React.Component {
  state = {
    uploading: false,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15,
          }}>
          Upload Receipt
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  // _maybeRenderImage = () => {
  //   let { image } = this.state;
  //   if (!image) {
  //     return;
  //   }

  //   return (
  //     <View
  //       style={{
  //         marginTop: 30,
  //         width: 250,
  //         borderRadius: 3,
  //         elevation: 2,
  //         shadowColor: 'rgba(0,0,0,1)',
  //         shadowOpacity: 0.2,
  //         shadowOffset: { width: 4, height: 4 },
  //         shadowRadius: 5,
  //       }}>
  //       <View
  //         style={{
  //           borderTopRightRadius: 3,
  //           borderTopLeftRadius: 3,
  //           overflow: 'hidden',
  //         }}>
  //         <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
  //       </View>

  //       <Text
  //         onPress={this._copyToClipboard}
  //         onLongPress={this._share}
  //         style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
  //         {image}
  //       </Text>
  //     </View>
  //   );
  // };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let { resp, error } = await uploadImageAsync(pickerResult.uri);
        if (error) {
          throw error 
        }
        if (resp.status === 'ok') {
          await this.props.navigation.state.params.scanReceiptDidFinish(resp.result)
          this.props.navigation.goBack()
        } else {
          Alert.alert(
            `Whoops!`,
            `Unfortunately we were unable to detect the amount from this receipt :(`,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }

      }
    } catch (e) {
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  const endpoint = `/receipts/upload`
  let formData = new FormData()
  formData.append('receipt', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  })

  let { resp, error } = await API.build().authenticated().upload({
    endpoint, formData
  })
  return { resp, error }
}