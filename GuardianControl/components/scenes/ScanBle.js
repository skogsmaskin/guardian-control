import React, {Component} from 'react'
import Button from 'react-native-button'
import BleManager from 'react-native-ble-manager'
import {requestPermission, checkPermission} from 'react-native-android-permissions'
import {
  AppRegistry,
  Text,
  View,
  Image,
  ToolbarAndroid,
  NativeAppEventEmitter
} from 'react-native'

import DeviceList from '../DeviceList'

import styles from '../../styles'

const SCANTIME = 10
const APP_TITLE = 'Guardian Control'

export default class ScanBleScene extends Component {

  constructor(props) {
    super(props)
    const devicesDB = {
      // 'XX:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // 'ZZ:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '23:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '25:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '76:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '33:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '52:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '99:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '36:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '22:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '19:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()},
      // '02:91:48:2E:9E:4E': {id: 'XX:91:48:2E:9E:4E', name: 'test', lastSeen: new Date()}
    }
    this.state = {
      permissionsGranted: true,
      error: null,
      connectedDevice: null,
      devicesDB: devicesDB,
      devices: Object.keys(devicesDB).map(key => devicesDB[key]),
      scanning: false
    }

    this.discoverSubscription = null
    this.scanStopSubscription = null

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

  static get defaultProps() {
    return {
      title: 'Scan for you pipe'
    }
  }

  componentDidMount() {
    BleManager.start()
  }

  componentWillUnmount() {
    if (this.state.scanning) {
      BleManager.stopScan()
    }
  }

  start() {
    this.setState({error: null})
    BleManager.enableBluetooth()
      .then(() => {
        this.startScan()
        console.log('The bluetooh is already enabled or the user confirm')
      })
      .catch(error => {
        console.log(error)
        this.setState({error: {code: 'bluetoothNotReady', message: 'Bluetooth not turned on?'}})
      })
  }

  handleScanFinishedEvent = () => {
    console.log('Received BleManagerStopScan callback from BleManager')
    this.stopScan()
  }

  handleDiscoverPeripheral = data => {
    if (data.name) {
      const devicesDB = Object.assign({}, this.state.devicesDB)
      devicesDB[data.id] = Object.assign({}, data, {lastSeen: new Date()})
      console.log('Found device', devicesDB[data.id])
      const devices = Object.keys(devicesDB)
        .map(key => devicesDB[key])
        .filter(device => (device.lastSeen.getTime() > (device.lastSeen.getTime() - 10000)))
      this.setState({devicesDB: devicesDB, devices: devices})
    }
  }

  startScan = () => {
    console.log('Scanning start requested')
    if (!this.state.scanning) {
      return BleManager.scan([], SCANTIME, true)
        .then(() => {
          console.log('Scanning started by BleManager')
          this.setState({scanning: true})
          this.discoverSubscription = NativeAppEventEmitter
            .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral)
          this.scanStopSubscription = NativeAppEventEmitter
            .addListener('BleManagerStopScan', this.handleScanFinishedEvent)
        })
        .catch(err => {
          console.log(err)
          this.setState({scanning: false})
        })
    }
    return Promise.resolve(null)
  }

  stopScan = () => {
    console.log('Scanning stop requested')
    if (this.state.scanning) {
      this.discoverSubscription.remove()
      this.scanStopSubscription.remove()
      return BleManager.stopScan().then(() => {
        console.log('Scanning stopped by BleManager')
        this.setState({scanning: false})
      })
      .catch(err => {
        console.log(err)
      })
    }
    return Promise.resolve(null)
  }

  toggleScanning() {
    if (this.state.scanning) {
      this.stopScan()
    } else {
      this.startScan()
    }
  }

  handleRestartButtonPress = () => {
    this.start()
  }

  handlePermissionButtonPress = () => {
    this.checkAndGrantPermissions()
  }

  handlePressDeviceButton(device) {
    this.setState({device: device})
  }

  handleToolbarActionSelected = position => {
    if (position === 0) {
      this.toggleScanning()
    }
  }

  handleSelectDevice = index => {
    const device = this.state.devices[index]
    this.stopScan()
    console.log(device)
  }

  handleRefreshDevices = () => {
    this.toggleScanning()
  }

  render() {
    const state = this.state
    const {error} = this.state
    return (
      <View style={styles.scene}>
        <View style={styles.toolbarContainer}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={this.props.title}
            titleColor={'#333'}
            show="always"
            onActionSelected={this.handleToolbarActionSelected}
            actions={[{title: this.state.scanning ? 'Stop scan' : 'Scan', show: 'always'}]}
          />
        </View>
        <View style={styles.background}>
          <Image source={require('../../img/pipe-bg.png')} style={styles.backgroundImage} />
        </View>

        <View style={styles.foreground}>

          { error && (
            <View style={styles.container}>
              <Text style={styles.errorMessage}>
                {state.error.message}
              </Text>
              {
                error.code === 'bluetoothNotSupported' && (
                  <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                    onPress={this.handlePermissionButtonPress}
                  >
                    Turn on bluetooth
                  </Button>
                )
              }
              {
                error.code === 'bluetoothNotReady' && (
                  <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                    onPress={this.handleRestartButtonPress}
                  >
                    Try again
                  </Button>
                )
              }
            </View>
          )}

          {
            this.state.devices.length > 0 && (
              <View style={styles.topLine}>
                <Text style={styles.boldText}>Available devices:</Text>
              </View>
            )
          }
          <DeviceList
            onPressItem={this.handleSelectDevice}
            scanning={this.state.scanning}
            devices={this.state.devices}
            onRefresh={this.handleRefreshDevices}
          />
          <View style={styles.bottomLine}>
            <Text style={styles.smallText}>
              To get started select your pipe in the list above.
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
