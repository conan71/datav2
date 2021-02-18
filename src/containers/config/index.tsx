import React from 'react'
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
  const {
    screenName,
    size,
    backgroundColor,
    backgroundImage,
    changeScreen,
  } = props
  return (
    <div className={styles.config}>
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
  )
}
export default Config
