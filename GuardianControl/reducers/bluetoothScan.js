import {
  REQUEST_SCAN_START,
  RECEIVE_SCAN_START,
  REQUEST_SCAN_START_FAILURE,
  REQUEST_SCAN_STOP,
  RECEIVE_SCAN_STOP,
  REQUEST_SCAN_STOP_FAILURE,
  DEVICE_DISCOVERED
} from '../actions/bluetoothScan'


const defaultState = {
  devicesDB: {},
  devices: [],
  lastDiscoveredDevice: null,
  error: null,
  scanning: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_SCAN_START:
      return Object.assign(
        {},
        state,
        {
          scanning: action.scanning,
          error: action.error,
        }
      )
    case RECEIVE_SCAN_START:
      return Object.assign(
        {},
        state,
        {
          scanning: action.scanning,
          error: action.error
        }
      )
    case REQUEST_SCAN_START_FAILURE:
      return Object.assign(
        {},
        state,
        {
          error: action.error,
          scanning: action.scanning
        }
      )
    case REQUEST_SCAN_STOP:
      return Object.assign(
        {},
        state,
        {
          scanning: action.scanning,
          error: action.error,
        }
      )
    case RECEIVE_SCAN_STOP:
      return Object.assign(
        {},
        state,
        {
          scanning: action.scanning,
          error: action.error
        }
      )
    case REQUEST_SCAN_STOP_FAILURE:
      return Object.assign(
        {},
        state,
        {
          error: action.error,
          scanning: action.scanning
        }
      )
    case DEVICE_DISCOVERED:
      return Object.assign(
        {},
        state,
        {
          lastDiscoveredDevice: action.device,
          devices: action.devices,
          deviceDB: action.deviceDB,
          error: action.error,
          scanning: action.scanning
        }
      )
    default:
      return state
  }
}
