import BleManager from 'react-native-ble-manager'
import Debug from 'react-native-debug'
import {hexValueToBase64Value} from '../shared/utils/bluetoothHelpers'
import {BLE_SERVICE_UUID, BLE_CHARACTERISTIC_UUID} from '../constants'

Debug.enable('*')
const debug = Debug('rdx.actions.bluetoothReadWrite')

export const REQUEST_WRITE_DEVICE = 'REQUEST_WRITE_DEVICE'
export const RECEIVE_WRITE_DEVICE = 'RECEIVE_WRITE_DEVICE'
export const REQUEST_WRITE_FAILURE = 'REQUEST_WRITE_FAILURE'

function _requestWriteDevice(device) {
  return {
    type: REQUEST_WRITE_DEVICE,
    device: device
  }
}

function _receiveWriteDevice(device, value) {
  return {
    type: RECEIVE_WRITE_DEVICE,
    device: device,
    value: value
  }
}

function _write(device, value) {
  const data = hexValueToBase64Value(value)
  return BleManager.write(
      device.id,
      BLE_SERVICE_UUID,
      BLE_CHARACTERISTIC_UUID,
      data
    )
    .then(() => {
      debug(`Wrote: ${data} (${value})`)
    }).catch(err => {
      debug('Error:', err)
    })
}

export function write(device, value) {
  return (dispatch, getState) => {
    dispatch(_requestWriteDevice(device))
    return _write(device, value)
      .then(() => {
        dispatch(_receiveWriteDevice(device, value))
      })
  }
}
