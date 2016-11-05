import React, {Component} from 'react'
import Button from 'react-native-button'
import BleManager from 'react-native-ble-manager'
import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ToolbarAndroid,
  NativeAppEventEmitter
} from 'react-native'

import DeviceList from '../DeviceList'

import styles from '../../styles'

const SCANTIME = 10

export default class ScanBleScene extends Component {

  constructor(props) {
    super(props)
    const devicesDB = {}
    this.state = {
      error: null,
      connectedDevice: null,
      devicesDB: devicesDB,
      devices: Object.keys(devicesDB).map(key => devicesDB[key]),
      scanning: false
    }

    this.discoverSubscription = null
    this.scanStopSubscription = null
  }

  componentDidMount() {
    BleManager.start()
    this.start()
  }

  componentWillUnmount() {
    if (this.state.connectedDevice) {
      BleManager.disconnect(this.state.connectedDevice)
    }
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

  connect = device => {
    console.log(`Connecting to ${device.id}`)
    return BleManager.connect(device.id)
      .then(connectedDevice => {
        const charectaristics = connectedDevice.characteristics
          .filter(char => char.service === 'fff0')
          .filter(char => char.characteristic === 'fff1')
        this.setState({
          connectedDevice: connectedDevice,
          charectaristics: charectaristics
        })
        return connectedDevice
      })
  }

  disconnect = device => {
    console.log(`Disconnecting ${device.id}`)
    return BleManager.disconnect(device.id)
      .then(() => {
        console.log('Disconnected')
        this.setState({connectedDevice: device})
      })
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

  handlePressDeviceButton(device) {
    this.setState({device: device})
  }

  handleToolbarActionSelected = position => {
    if (position === 0) {
      this.toggleScanning()
    }
  }

  handleSelectDevice = index => {
    const device = this.state.devicesDB[this.state.devices[index].id]
    this.stopScan()
    console.log(device)
    this.connect(device)
      .then(peripheralInfo => {
        console.log(peripheralInfo)
        this.disconnect(device)
      })
      .catch(err => {
        console.log(err)
        this.setState({error: {code: 'deviceNotAvailable', message: `Could not connect to ${device.id}`}})
        throw err
      })
  }

  handleRefreshDevices = () => {
    this.toggleScanning()
  }

  render() {
    const state = this.state
    const {error} = this.state
    return (
      <Image source={require('../../img/pipe-bg.png')} style={styles.backgroundImage}>
        <View>
          <ToolbarAndroid
            style={styles.toolbar}
            title={this.props.title}
            titleColor={'#333'}
            show="always"
            onActionSelected={this.handleToolbarActionSelected}
            actions={[{title: this.state.scanning ? 'Stop scan' : 'Scan', show: 'always'}]}
          />

          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.scanning}
                onRefresh={this.handleRefreshDevices}
              />
            }
          >

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

            <View style={styles.content}>
              {
                this.state.charectaristics && (
                  <Text style={styles.text}>
                    {
                      JSON.stringify(this.state.charectaristics)
                    }
                  </Text>
                )
              }
              <Text style={styles.text}>
                {
                  this.state.devices.length === 0
                    ? 'Press scan to search for your pipe by bluetooth.\nMake sure it is powered on and nearby.'
                    : 'Select your pipe in the list above, it is usually named "epv".'
                }
              </Text>

              { error && (
                <View>
                  <Text style={styles.errorMessage}>
                    {state.error.message}
                  </Text>
                  {
                    error.code === 'bluetoothNotSupported' && (
                      <Button
                        containerStyle={styles.buttonContainer}
                        style={styles.button}
                        onPress={this.handleRestartButtonPress}
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
                  {
                    error.code === 'deviceNotAvailable' && (
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
            </View>
          </ScrollView>
        </View>

      </Image>
    )
  }
}
