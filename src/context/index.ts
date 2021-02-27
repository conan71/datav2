import React from 'react'
const PageContext = React.createContext({
  box: {},
  boxOrder: [],
  screenName: '',
  backgroundImage: '',
  backgroundColor: '',
  size: {},
  setBox: (e) => {},
  changeBox: (e, v) => {},
  setBoxOrder: (e) => {},
  setScreenName: (e) => {},
  setBackgroundImage: (e) => {},
  setBackgroundColor: (e) => {},
  setSize: (e) => {},
})
export default PageContext
