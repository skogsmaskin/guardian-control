import React, {Component} from 'react'
import {BleManager} from 'react-native-ble-plx'
import {requestPermission, checkPermission} from 'react-native-android-permissions'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default class GuardianControl extends Component {

  constructor(props) {
    super(props)
    this.manager = new BleManager()
  }

  componentDidMount() {
    this.checkAndGrantPermissions()
  }

  componentWillUnmount() {
    this.manager.destroy()
  }

  checkAndGrantPermissions() {
    checkPermission('android.permission.ACCESS_COARSE_LOCATION').then(result => {
      console.log('Already Granted!')
      console.log(result)
      this.manager.startDeviceScan(null, null, this.handleDiscoveredDevice)
      setTimeout(() => {
        this.manager.stopDeviceScan()
      }, 5000)
    }, result => {
      console.log('Not Granted!')
      console.log(result)
      requestPermission('android.permission.ACCESS_COARSE_LOCATION').then(reqResult => {
        console.log('Granted!', reqResult)
      }, deniedResult => {
        console.log('Not Granted!')
        console.log(deniedResult)
      })
    })
  }

  handleDiscoveredDevice(error, scannedDevice) {
    if (error) {
      return console.log(error)
    }
    return console.log(scannedDevice)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('GuardianControl', () => GuardianControl)
