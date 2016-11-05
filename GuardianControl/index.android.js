import React, {Component} from 'react'
import {requestPermission, checkPermission} from 'react-native-android-permissions'
import {
  AppRegistry,
  View,
  ToolbarAndroid,
  Navigator,
} from 'react-native'

import permissions from './components/scenes/Permissions'
import DeviceList from './components/DeviceList'
import ScanBle from './components/scenes/ScanBle'
import styles from './styles'

const SCANTIME = 10
const APP_TITLE = 'Guardian Control'

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

  renderBleScene = () => {
    return (
      <View style={styles.scene}>
        {
          this.state.permissionsGranted
            && !this.state.selectedDevice
            && (
              <ScanBle title={'Find your device'} />
            )
        }
      </View>
    )
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
    const scene = this.state.error ? this.renderErrorScene : this.renderBleScene
    return (
      <View>
        {scene(route, navigator)}
      </View>
    )
  }

  render() {

    return (
      <Navigator
        initialRoute={{title: 'Scan for device', index: 0}}
        renderScene={this.renderScene} /> // Navigator closing tag
    )
  }
}

AppRegistry.registerComponent('GuardianControl', () => GuardianControl)
