import React, {Component} from 'react'
import {requestPermission, checkPermission} from 'react-native-android-permissions'
import {
  AppRegistry,
  View,
  StatusBar,
  Navigator,
  Text
} from 'react-native'

import permissions from './components/scenes/Permissions'
import Bluetooth from './components/scenes/Bluetooth'
import styles from './styles'

export default class GuardianControl extends Component {

  constructor(props) {
    super(props)
    this.state = {
      permissionsGranted: true,
      error: null,
    }

    //intercept react-native error handling
    if (typeof ErrorUtils !== 'undefined') {
      this.defaultHandler = (ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler()) || ErrorUtils._globalHandler
      ErrorUtils.setGlobalHandler(this.wrapGlobalHandler)  //feed errors directly to our wrapGlobalHandler function
    }
  }

  wrapGlobalHandler = (error, isFatal) => {
    //do anything with the error here
    console.error(error)
    this.defaultHandler(error, isFatal)  //after you're finished, call the defaultHandler so that react-native also gets the error
  }

  checkAndGrantPermissions() {
    checkPermission('android.permission.ACCESS_COARSE_LOCATION').then(result => {
      console.log('Already Granted!', result)
      this.setState({permissionsGranted: true})
    }, result => {
      console.log('Not Granted!')
      console.log(result)
      this.setState({permissionsGranted: false})
      requestPermission('android.permission.ACCESS_COARSE_LOCATION').then(reqResult => {
        console.log('Granted!', reqResult)
        this.setState({permissionsGranted: true})
      }, deniedResult => {
        this.setState({permissionsGranted: false})
        console.log('Not Granted!')
        console.log(deniedResult)
      })
    })
  }

  start() {
    this.setState({error: null})
    this.checkAndGrantPermissions()
  }

  handleRestartButtonPress = () => {
    this.start()
  }

  handlePermissionButtonPress = () => {
    this.checkAndGrantPermissions()
  }

  renderBluetoothScene = () => {
    if (this.state.permissionsGranted) {
      return <Bluetooth title={'Find your pipe'} />
    }
    return null
  }

  renderErrorScene() {
    return (
      <View style={styles.scene}>
        {
          !this.state.permissionsGranted
            && (
              <Permissions
                title="Error"
                navigator={navigator}
              />
            )
        }
      </View>
    )
  }

  renderScene = (route, navigator) => {
    const scene = this.state.error ? this.renderErrorScene : this.renderBluetoothScene
    return scene(route, navigator)
  }

  render() {

    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <View style={styles.topLine}>
          <Text style={styles.topLineText}>Smok Guardian III Control</Text>
        </View>
        <Navigator
          initialRoute={{title: 'Scan for device', index: 0}}
          renderScene={this.renderScene}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('GuardianControl', () => GuardianControl)
