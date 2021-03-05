import React, { useState } from 'react'
import update from 'immutability-helper'
import Menus from '@containers/menu'
import Config from '@containers/config'
import View from '@containers/view'
import PageContext from '@context/index'
import styles from '@less/index.module.less'

const Home = ({ history }: any) => {
  const [box, setBox] = useState({})
  const [boxOrder, setBoxOrder] = useState([])
  const [screenName, setScreenName] = useState('新建大屏')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#171c28')
  const [size, setSize] = useState({
    width: 1920,
    height: 1080,
  })
  const changeBox = (fields, value) => {
    let obj = {}
    let newbox
    if (typeof fields === 'undefined' || typeof value === 'undefined') {
      return
    }
    if (typeof fields === 'string' && fields.indexOf('-') === -1) {
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
  const changeScreen = (fields, value) => {
    switch (fields) {
      case 'name':
        setScreenName(value)
        break
      case 'bgImg':
        setBackgroundImage(value)
        break
      case 'bgColor':
        setBackgroundColor(value)
        break
      case 'height':
        setSize({
          ...size,
          height: value,
        })
        break
      case 'width':
        setSize({
          ...size,
          width: value,
        })
        break
    }
  }
  return (
    <PageContext.Provider
      value={{
        box: box,
        boxOrder,
        screenName,
        backgroundImage,
        backgroundColor,
        size,
        setBox: (e) => setBox(e),
        changeBox: (e, v) => changeBox(e, v),
        setBoxOrder: (e) => setBoxOrder(e),
        setScreenName: (e) => setScreenName(e),
        setBackgroundImage: (e) => setBackgroundImage(e),
        setBackgroundColor: (e) => setBackgroundColor(e),
        setSize: (e) => setSize(e),
      }}
    >
      <div className={styles.menus}>
        <Menus />
      </div>
      <div id="container" className={styles.container}>
        <View
          box={box}
          boxOrder={boxOrder}
          size={size}
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
          setBox={setBox}
          changeBox={changeBox}
          setBoxOrder={setBoxOrder}
        />
      </div>
      <div className={styles.attr}>
        <Config
          screenName={screenName}
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
          box={box}
          size={size}
          changeScreen={changeScreen}
          setBox={setBox}
          changeBox={changeBox}
        />
      </div>
    </PageContext.Provider>
  )
}
export default Home
