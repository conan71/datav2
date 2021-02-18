import React, { useState } from 'react'
import styles from '@less/scale.module.less'
const Scale = ({ start, type, max }) => {
  let m = max - start === 200 ? true : false
  if (type === 'transverse') {
    return (
      <div
        className={styles.transverse}
        style={{ width: `${m ? '195px' : max - start + 'px'}` }}
      >
        {start}
        <div className={styles.end}>{m ? start + 100 : max}</div>
      </div>
    )
  } else {
    return (
      <div
        className={styles.portrait}
        style={{ height: `${m ? '195px' : max - start + 'px'}` }}
      >
        {start}
        <div className={styles.end}>{m ? start + 100 : max}</div>
      </div>
    )
  }
}

export default Scale
