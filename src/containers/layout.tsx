import React from 'react'

import { StoreContext } from 'redux-react-hook'
import { makeStore } from '@redux/Stores'

import Home from '@pages/index'
import Header from './Header'
import styles from '@less/layout.module.less'
const store = makeStore()
const Layout = () => {
  return (
    <StoreContext.Provider value={store}>
      <div className={styles.basicLayout}>
        <Header />
        <section className={styles.body}>
          <Home />
        </section>
      </div>
    </StoreContext.Provider>
  )
}

export default Layout
