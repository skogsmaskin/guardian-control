import React, {Component, PropTypes} from 'react'
import styles from '../styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  AppRegistry,
  Text,
  View,
  ListView,
  RefreshControl,
  ScrollView,
  TouchableHighlight
} from 'react-native'


export default class DeviceList extends Component {
  static propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object)
  }
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {dataSource: this.ds.cloneWithRows(this.props.devices)}
  }

  componentWillUpdate(nextProps) {
    if (nextProps.devices !== this.props.devices) {
      this.setState({dataSource: this.ds.cloneWithRows(nextProps.devices)})
    }
  }

  handlePressItem = rowId => {
    if (this.props.onPressItem) {
      this.props.onPressItem(rowId)
    }
  }

  handleRefreshList = () => {
    if (this.props.onRefresh) {
      this.props.onRefresh()
    }
  }

  renderRow = (rowData: string, sectionID: number, rowId: number, highlightRow: (sectionID: number, rowId: number) => void) => {
    const onPress = () => {
      this.handlePressItem(rowId)
      highlightRow(sectionID, rowId)
    }
    return (
      <TouchableHighlight onPress={onPress} underlayColor={'#eee'}>
        <View style={styles.row}>
          <Icon name="bluetooth" style={styles.rowIcon} />
          <View style={styles.rowText}>
            <Text style={styles.rowMainText}>
              {rowData.name}
            </Text>
            <Text style={styles.rowSecondaryText}>
              {rowData.id}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderSeparator(sectionID, rowId, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowId}`}
        style={styles.rowSeparator}
      />
    )
  }

  handleRefresh = () => {
    this.props.onRefresh()
  }

  render() {
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.props.scanning}
            onRefresh={this.handleRefresh}
          />
        }
        enableEmptySections
        dataSource={this.state.dataSource}
        style={styles.list}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    )
  }

}
