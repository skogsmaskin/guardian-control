import React, {Component} from 'react'
import Button from 'react-native-button'
import {
  Text,
  View,
} from 'react-native'

import styles from '../../styles'

export default class Permissions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            You must allow location to be read
          </Text>
          <Text style={styles.instructions}>
            In order to use Bluetooth LE and scan for devices, you need to grant the app to read your location.
          </Text>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.button}
            onPress={this.handlePermissionButtonPress}
          >
            Allow permissions
          </Button>
        </View>
      </View>
    )
  }
}
