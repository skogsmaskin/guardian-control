import {combineReducers} from 'redux'
import bluetoothConnection from './bluetoothConnection'
import bluetoothReadWrite from './bluetoothReadWrite'

export default combineReducers({
  bluetoothConnection,
  bluetoothReadWrite
})
