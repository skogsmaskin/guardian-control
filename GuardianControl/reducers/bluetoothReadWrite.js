import {
  REQUEST_WRITE_DEVICE,
  RECEIVE_WRITE_DEVICE,
  REQUEST_WRITE_FAILURE
} from '../actions/bluetoothReadWrite'

const defaultState = {
  writeError: null,
  valueToWrite: null,
  valueWritten: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_WRITE_DEVICE:
      return Object.assign(
        {},
        state,
        {
          writeError: action.error,
          valueToWrite: action.value,
          valueWritten: null
        }
      )
    case RECEIVE_WRITE_DEVICE:
      return Object.assign(
        {},
        state,
        {
          writeError: null,
          valueToWrite: action.value,
          valueWritten: action.value
        }
      )
    case REQUEST_WRITE_FAILURE:
      return Object.assign(
        {},
        state,
        {
          writeError: action.error,
          valueToWrite: action.value,
          valueWritten: null
        }
      )
    default:
      return state
  }
}
