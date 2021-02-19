import React from 'react'
import Drag from '@components/drag'
import { Collapse } from 'antd'
import { menu, nav } from './menu'
import styles from '@less/menus.module.less'
const { Panel } = Collapse
const Menus = () => {
  const model = {
    name: 333,
  }
  const getNav = () => {
    return nav.map((item, index) => {
      return (
        <div className={styles.item} key={index}>
          <i className={`iconfont ${item.icon} `}></i>
        </div>
      )
    })
  }
  const getMenu = () => {
    return menu.map((item, index) => {
      return (
        <Panel header={item.title} key={index} className="panel">
          {getList(item.children)}
        </Panel>
      )
    })
  }
  const getList = (list) => {
    return list.map((item, index) => {
      return (
        <div className={styles.item}>
          <Drag key={0} model={model}>
            <div className={styles.name}>{item.title}</div>
            <img src={item.imgPath} />
          </Drag>
        </div>
      )
    })
  }
  return (
    <div className={styles.menus}>
      <div className={styles.nav}>
        <i className={`iconfont icontoggle-left ${styles.btn}`}></i>
        {getNav()}
      </div>
      <div className={styles.list}>
        <Collapse accordion ghost expandIconPosition="left">
          {getMenu()}
        </Collapse>
      </div>
    </div>
  )
}
export default Menus
