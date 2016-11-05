import {
  StyleSheet,
} from 'react-native'

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbarContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  toolbar: {
    height: 56
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold'
  },
  smallText: {
    color: '#ccc',
    fontSize: 14
  },
  scrollView: {
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    padding: 15
  },
  errorMessage: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  },
  bottomLine: {
    padding: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 58
  },
  topLineText: {
    fontSize: 18,
    color: '#fff'
  },
  topSpinner: {
    marginRight: 5
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
    padding: 10
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
    paddingRight: 4
  }
})
