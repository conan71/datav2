import React, { useEffect, useContext, CSSProperties, Fragment } from 'react'
import PageContext from '@/context'
import * as echarts from 'echarts'
let _echarts_instance_ = {}
const EchartBox = ({ id }) => {
  const { box, changeBox } = useContext(PageContext)
  const chart = box[id]
  const style = {
    width: '100%',
    height: '100%',
  }
  const editNotClick: CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: 10,
  }
  useEffect(() => {
    if (chart && chart.id) {
      let c = document.getElementById(chart.id + '_echart')
      if (c) {
        if (!_echarts_instance_[id]) {
          let myChart = echarts.init(c)
          _echarts_instance_[id] = myChart
          // changeBox(`${chart.id}-ref`, myChart)
          myChart.setOption(chart.option)
        } else {
          let myChart = _echarts_instance_[id]
          myChart.setOption(chart.option)
          myChart.resize()
        }
      }
    }
  }, [chart.drag])
  if (!chart.option || !chart.id) {
    return <div>图表加载失败...</div>
  }
  return (
    <>
      <div style={editNotClick} data-id={chart.id}></div>
      <div style={style} id={`${chart.id}_echart`}></div>
    </>
  )
}
export default EchartBox
