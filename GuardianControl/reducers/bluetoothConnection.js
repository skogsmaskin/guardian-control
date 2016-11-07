import {
  REQUEST_CONNECT_DEVICE,
  RECEIVE_CONNECT_DEVICE,
  REQUEST_CONNECT_FAILURE,
  REQUEST_DISCONNECT_DEVICE,
  RECEIVE_DISCONNECT_DEVICE,
  REQUEST_DISCONNECT_FAILURE
} from '../actions/bluetoothConnection'

const defaultState = {
  connectedDevice: null,
  connectingDevice: null,
  failedDevice: null,
  error: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_CONNECT_DEVICE:
      return Object.assign(
        {},
        state,
        {
          connectingDevice: action.device,
          connectedDevice: null,
          failedDevice: null,
          error: null
        }
      )
    case RECEIVE_CONNECT_DEVICE:
      return Object.assign(
        {},
        state,
        {
          connectedDevice: action.device,
          connectingDevice: null,
          failedDevice: null,
          error: null
        }
      )
    case REQUEST_CONNECT_FAILURE:
      return Object.assign(
        {},
        state,
        {
          connectedDevice: null,
          connectingDevice: null,
          failedDevice: action.device,
          error: action.error
        }
      )
    case REQUEST_DISCONNECT_DEVICE:
      return state
    case RECEIVE_DISCONNECT_DEVICE:
      return Object.assign(
        {},
        state,
        {
          connectedDevice: null,
          connectingDevice: null,
          failedDevice: null,
          error: null
        }
      )
    case REQUEST_DISCONNECT_FAILURE:
      return Object.assign(
        {},
        state,
        {
          connectedDevice: null,
          connectingDevice: null,
          failedDevice: action.device,
          error: action.error
        }
      )
    default:
      return state
  }
}
