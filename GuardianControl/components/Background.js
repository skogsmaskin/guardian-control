import {React, Component} from 'react'
import {
  View,
  Image
} from 'react-native'
import styles from '../styles'

export default class GuardianControl extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Image source={require('./img/pipe-bg.png')} style={styles.backgroundImage} />
      </View>
    )
  }
}
