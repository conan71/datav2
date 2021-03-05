import React, { useState, useRef, useMemo, useContext } from 'react'
import { useEventListener } from 'ahooks'
import { useMappedState } from 'redux-react-hook'
import { Screen } from '@redux/Stores'
import ScreenConfig from './components/screen'
import Widget from './components/widget'
import EchartConfig from './components/echart'
// import PageContext from '@context/index'
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
const mapState = (state: Screen) => ({
  active: state.active,
})
const Config = (props: Props) => {
  const { active } = useMappedState(mapState)
  // const { box } = useContext(PageContext)
  const [state, setState] = useState('auto')
  const [width, setWidth] = useState(-1)
  const dom = useRef<HTMLDivElement | null>(null)
  const {
    screenName,
    size,
    box,
    backgroundColor,
    backgroundImage,
    changeScreen,
  } = props

  const data = useMemo(() => {
    return box[active[0]]
  }, [active, box])
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
  const getConfig = () => {
    if (active.length === 0) {
      return (
        <ScreenConfig
          screenName={screenName}
          size={size}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          changeScreen={changeScreen}
        />
      )
    } else if (active.length === 1) {
      const getChartConfig = () => {
        switch (data.data.widget) {
          case 'echart':
            return <EchartConfig />
          default:
            return <EchartConfig />
        }
      }
      return (
        <>
          <Widget />
          {getChartConfig()}
        </>
      )
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
        <div className={styles.header}>
          {active.length == 0
            ? screenName
            : active.length == 1
            ? box[active[0]]?.data.title
            : ''}
        </div>
        <div className={styles.body}>{getConfig()}</div>
      </div>
    </>
  )
}
export default Config
