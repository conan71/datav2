import React, { useState } from 'react'
import Nav from './compnents/nav'
import Assembly from './compnents/assembly'
import Layer from './compnents/layer'
import styles from '@less/menus.module.less'
const Menus = () => {
  const [show, setShow] = useState(true)
  const [isModel, setIsModel] = useState(true)
  return (
    <div
      className={styles.menus}
      style={{
        width: `${!show ? '50px' : ''}`,
      }}
    >
      <div className={styles.nav}>
        <i
          className={`iconfont icontoggle-left ${styles.btn}`}
          onClick={(e) => {
            setShow(!show)
          }}
        ></i>
        <Nav />
      </div>
      <div className={styles.content}>
        <div className={styles.switch}>
          <div
            className={isModel ? styles.active : ''}
            onClick={(e) => {
              setIsModel(true)
            }}
          >
            组件
          </div>
          <div
            className={!isModel ? styles.active : ''}
            onClick={(e) => {
              setIsModel(false)
            }}
          >
            层级
          </div>
        </div>
        <div className={styles.list}>{isModel ? <Assembly /> : <Layer />}</div>
      </div>
    </div>
  )
}
export default Menus
