import React, { useMemo } from 'react'
import EchartBox from './echart'
import styles from './index.module.less'
const Widget = ({ id }: any) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <EchartBox id={id} />
    </div>
  )
}
export default Widget
