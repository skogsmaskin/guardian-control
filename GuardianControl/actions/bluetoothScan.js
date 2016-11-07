import BleManager from 'react-native-ble-manager'
import Debug from 'react-native-debug'
import {
  NativeAppEventEmitter
} from 'react-native'

import {
  BLE_SCAN_TIME,
  BLE_DISCOVERED_DEVICE_TTL
} from '../constants'

Debug.enable('*')
const debug = Debug('rdx.actions.bluetoothScan')

export const REQUEST_SCAN_START = 'REQUEST_SCAN_START'
export const RECEIVE_SCAN_START = 'RECEIVE_SCAN_START'
export const REQUEST_SCAN_START_FAILURE = 'REQUEST_SCAN_START_FAILURE'

export const REQUEST_SCAN_STOP = 'REQUEST_SCAN_STOP'
export const RECEIVE_SCAN_STOP = 'RECEIVE_SCAN_STOP'
export const REQUEST_SCAN_STOP_FAILURE = 'REQUEST_SCAN_STOP_FAILURE'

export const DEVICE_DISCOVERED = 'DEVICE_DISCOVERED'

const devicesDB = {}

let discoverSubscription = null
let scanStopSubscription = null

function _getDevices() {
  return Object.keys(devicesDB)
    .map(key => devicesDB[key])
    .filter(item =>
      (item.lastSeen.getTime()
        > (
          item.lastSeen.getTime() - (BLE_DISCOVERED_DEVICE_TTL * 1000)
        )
      )
    )
}

function _requestScanStart() {
  return {
    type: REQUEST_SCAN_START,
    error: null,
    scanning: false
  }
}

function _receiveScanStart() {
  return {
    type: RECEIVE_SCAN_START,
    error: null,
    scanning: true
  }
}

function _requestScanStartFailure(error) {
  return {
    type: REQUEST_SCAN_START_FAILURE,
    error: error,
    scanning: false
  }
}

function _requestScanStop() {
  return {
    type: REQUEST_SCAN_STOP,
    error: null
  }
}

function _receiveScanStop() {
  return {
    type: RECEIVE_SCAN_STOP,
    error: null,
    scanning: false
  }
}

function _requestScanStopFailure(error) {
  return {
    type: REQUEST_SCAN_STOP_FAILURE,
    error: error,
    scanning: false
  }
}

function _deviceDiscovered(device) {
  devicesDB[device.id] = Object.assign({}, device, {lastSeen: new Date()})
  return {
    type: DEVICE_DISCOVERED,
    device: device,
    devicesDB: devicesDB,
    devices: _getDevices()
  }
}

function _handleDiscoverDevice(device, dispatch) {
  dispatch(_deviceDiscovered())
}

function _handleScanFinishedEvent(dispatch) {
  debug('Received BleManagerStopScan callback from BleManager')
  dispatch(_receiveScanStop())
}

function _startScan(dispatch) {
  debug('Scanning start requested')
  return BleManager.scan([], BLE_SCAN_TIME, true)
    .then(() => {
      debug('Scanning started by BleManager')
      discoverSubscription = NativeAppEventEmitter
        .addListener(
          'BleManagerDiscoverPeripheral',
          device => _handleDiscoverDevice(device, dispatch)
        )
      scanStopSubscription = NativeAppEventEmitter
        .addListener(
          'BleManagerStopScan',
          () => _handleScanFinishedEvent(dispatch)
        )
      return true
    })
}


function _stopScan(dispatch) {
  debug('Scanning stop requested')
  discoverSubscription.remove()
  scanStopSubscription.remove()
  return BleManager.stopScan().then(() => {
    debug('Scanning stopped by BleManager')
    return true
  })
}

export function start() {
  return (dispatch, getState) => {
    dispatch(_requestScanStart())
    _startScan()
      .then(() => {
        dispatch(_receiveScanStart())
      })
      .catch(err => {
        debug('Error starting scan', err)
        dispatch(_requestScanStartFailure())
      })
  }
}

export function stop() {
  return (dispatch, getState) => {
    dispatch(_requestScanStop())
    _stopScan()
      .then(() => {
        dispatch(_receiveScanStop())
      })
      .catch(err => {
        debug('Error stopping scan', err)
        dispatch(_requestScanStopFailure())
      })
  }
}
