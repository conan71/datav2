import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import styles from './index.module.less'
interface Props {
  color: Object | string
  change?: Function
}
const Color = (props: Props) => {
  const { color, change } = props
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [selfColor, setSelfColor] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  })
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }
  const handleClose = () => {
    setDisplayColorPicker(false)
  }
  const handleChange = (color) => {
    setSelfColor(color.rgb)
    // if (typeof change == 'function') {
    //   change(color)
    // }
  }
  return (
    <div className={styles.colorBody}>
      <div className={styles.swatch} onClick={handleClick}>
        <div
          className={styles.color}
          style={{
            background: `rgba(${selfColor.r}, ${selfColor.g}, ${selfColor.b}, ${selfColor.a})`,
          }}
        />
      </div>
      {displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={selfColor} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  )
}
export default Color
