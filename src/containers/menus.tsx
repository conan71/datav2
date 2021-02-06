import React from 'react'
import Drag from '@components/drag'
import styles from '@less/menus.module.less'
const Menus = () => {
  const model = {
    name: 333,
  }
  return (
    <div className={styles.menus}>
      <div>
        <div className={styles.item}>
          <Drag key={0} model={model}>
            ddd
          </Drag>
        </div>
      </div>
    </div>
  )
}
export default Menus
