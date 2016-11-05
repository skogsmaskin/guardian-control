import {
  StyleSheet,
  Image
} from 'react-native'

export default StyleSheet.create({
  scene: {
  },
  background: {
    zIndex: 0,
    position: 'absolute'
  },
  foreground: {
    zIndex: 1
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: Image.resizeMode.contain
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  boldText: {
    fontWeight: 'bold'
  },
  smallText: {
    color: '#ccc',
    fontSize: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  devices: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  },
  bottomLine: {
    padding: 20
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  topSpinner: {
    marginRight: 5
  },
  logo: {
    padding: 20,
    fontSize: 30,
    color: '#999'
  },
  buttonContainer: {
    padding: 10,
    height: 48,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#ddd'
  },
  button: {
    fontSize: 18,
    color: '#000'
  },
  list: {
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
  },
  rowText: {
  },
  rowMainText: {
    color: '#333',
    fontWeight: 'bold'
  },
  rowSecondaryText: {
    color: '#666'
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#ccc'
  },
  rowIcon: {
    fontSize: 40,
  },
  toolbarContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  toolbar: {
    backgroundColor: '#fff',
    height: 56
  }
})
