import React, { useState, useRef } from 'react'
import { useEventListener } from 'ahooks'
import Screen from './components/screen'
import styles from '@less/config.module.less'
interface Props {
  screenName: string
  size: Object
  backgroundColor: Object | string
  backgroundImage: string
  box: Object
  setBox: Function
  changeBox: Function
  changeScreen: Function
}
const Config = (props: Props) => {
  const [state, setState] = useState('auto')
  const [width, setWidth] = useState(-1)
  const dom = useRef<HTMLDivElement | null>(null)
  const {
    screenName,
    size,
    backgroundColor,
    backgroundImage,
    changeScreen,
  } = props

  const upHandler = (ev: MouseEvent) => {
    setState('auto')
  }
  const downHandler = (ev: MouseEvent) => {
    setState('move')
  }
  const mousemoveHandler = (ev: any) => {
    if (state === 'move') {
      const pw = window.screen.width
      const l = ev.clientX
      setWidth(pw - l)
    }
  }
  useEventListener('mouseup', upHandler)
  useEventListener('mousedown', downHandler, { target: dom })
  useEventListener('mousemove', mousemoveHandler)
  return (
    <>
      <div className={styles.changeWidth} ref={dom}>
        <i className={`iconfont icontuodong `}></i>
      </div>
      <div
        className={styles.config}
        style={{ width: `${width > 300 ? width + 'px' : '300px'}` }}
      >
        <div className={styles.header}>参数设置</div>
        <div className={styles.body}>
          <Screen
            screenName={screenName}
            size={size}
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage}
            changeScreen={changeScreen}
          />
        </div>
      </div>
    </>
  )
}
export default Config
