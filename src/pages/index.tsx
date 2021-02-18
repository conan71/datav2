import React, { useState, useEffect } from 'react'
import update, { extend } from 'immutability-helper'
import Menus from '@containers/menus'
import Config from '@containers/config'
import View from '@containers/view'
import { Button } from 'antd'
import styles from '@less/index.module.less'

const createBox = (index: number) => {
  return {
    id: 'box_' + index,
    drag: { w: 100, h: 100 },
    position: { x: 330, y: 30 },
    rotate: 0,
    ref: null,
  }
}

const Home = ({ history }: any) => {
  const [box, setBox] = useState({})
  const changeBox = (fields, value) => {
    let obj = {}
    let newbox
    if (!fields || !value) {
      return
    }
    if (typeof fields === 'string' && fields.indexOf('-') == -1) {
      newbox = value
    } else {
      const getObjByField = (field, val) => {
        const ids = field.split('-')
        let th = ''
        for (let i = 0; i < ids.length; i++) {
          th += "['" + ids[i] + "']"
          if (!eval(`obj${th}`)) {
            eval(`obj${th}={}`)
          }
        }
        eval(`obj${th}={$set: val}`)
      }
      if (Array.isArray(fields) && Array.isArray(value)) {
        fields.forEach((item, index) => {
          getObjByField(item, value[index])
        })
      } else {
        getObjByField(fields, value)
      }
      newbox = update(box, obj)
    }
    setBox(newbox)
  }
  // useEffect(() => {
  // const defBox = createBox(0)
  // setBox({ [defBox.id]: defBox })
  // }, [])

  return (
    <>
      <div className={styles.menus}>
        <Menus />
      </div>
      <div id="container" className={styles.container}>
        <View box={box} setBox={setBox} changeBox={changeBox} />
      </div>
      <div className={styles.attr}>
        <Button type="primary">Button</Button>
        {/* <Config /> */}
      </div>
    </>
  )
}
export default Home
