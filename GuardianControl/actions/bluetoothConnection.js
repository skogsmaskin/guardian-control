import BleManager from 'react-native-ble-manager'
import Debug from 'react-native-debug'
import {AsyncStorage} from 'react-native'
import {
  BLE_SERVICE_HEX,
  CONNECTED_DEVICE_STORAGE_KEY,
} from '../constants'

export const REQUEST_CONNECT_DEVICE = 'REQUEST_CONNECT_DEVICE'
export const RECEIVE_CONNECT_DEVICE = 'RECEIVE_CONNECT_DEVICE'
export const REQUEST_CONNECT_FAILURE = 'REQUEST_CONNECT_FAILURE'

export const REQUEST_DISCONNECT_DEVICE = 'REQUEST_DISCONNECT_DEVICE'
export const RECEIVE_DISCONNECT_DEVICE = 'RECEIVE_DISCONNECT_DEVICE'
export const REQUEST_DISCONNECT_FAILURE = 'REQUEST_DISCONNECT_FAILURE'

Debug.enable('*')
const debug = Debug('rdx.actions.bluetooth')

function _requestConnectDevice(device) {
  return {
    type: REQUEST_CONNECT_DEVICE,
    device: device
  }
}

function _receiveConnectDevice(device) {
  return {
    type: RECEIVE_CONNECT_DEVICE,
    device: device
  }
}

function _requestConnectFailure(device, error) {
  return {
    type: REQUEST_CONNECT_FAILURE,
    device: device,
    error: error
  }
}

function _receiveDisconnectDevice(device) {
  return {
    type: RECEIVE_DISCONNECT_DEVICE,
    device: device
  }
}

function _requestDisconnectDevice(device) {
  return {
    type: REQUEST_DISCONNECT_DEVICE,
    device: device
  }
}

function _requestDisconnectFailure(device, error) {
  return {
    type: REQUEST_DISCONNECT_FAILURE,
    device: device,
    error: error
  }
}

function _connect(device, dispatch) {
  return BleManager.connect(device.id)
    .then(connectedDevice => {
      const requiredCharacteristic = connectedDevice.characteristics
        .find(characteristic => characteristic.service === BLE_SERVICE_HEX)
      if (requiredCharacteristic) {
        debug(`Connected to ${device.id}`)
        return connectedDevice
      }
      const error = new Error('This device does not provide the required '
        + `service characteristic (${BLE_SERVICE_HEX})`)
      error.code = 'BluetoothDeviceNotSupported'
      dispatch(_requestConnectFailure(device, error))
      throw error
    })
}

function _disconnect(device) {
  return BleManager.disconnect(device.id)
    .then(() => {
      debug(`Disconnected from ${device.id}`)
      return device
    })
}

export function connectDevice(device) {
  return (dispatch, getState) => {
    debug(`Connecting to ${device.id}`)
    dispatch(_requestConnectDevice(device))
    _connect(device, dispatch)
      .then(connectedDevice => {
        return AsyncStorage.setItem(
            CONNECTED_DEVICE_STORAGE_KEY,
            JSON.stringify(device)
          )
          .then(value => {
            dispatch(_receiveConnectDevice(connectedDevice))
          })
      })
      .catch(err => {
        debug(`Error connecting to ${device.id}`, err)
        dispatch(_requestConnectFailure(device, err))
      })
  }
}

export function disconnectDevice(device) {
  return (dispatch, getState) => {
    dispatch(_requestDisconnectDevice(device))
    _disconnect(device)
      .then(() => {
        return AsyncStorage.setItem(
            CONNECTED_DEVICE_STORAGE_KEY,
            null
          )
          .then(value => {
            dispatch(_receiveDisconnectDevice(device))
          })
      })
      .catch(err => {
        debug(`Error disconnecting from ${device.id}`, err)
        dispatch(_requestDisconnectFailure(device, err))
      })
  }
}
