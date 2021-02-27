import React, {
  useEffect,
  useMemo,
  useContext,
  CSSProperties,
  Fragment,
} from 'react'
import { useEventListener, useClickAway, useDebounceFn } from 'ahooks'
import PageContext from '@context/index'
import * as echarts from 'echarts'
const EchartBox = ({ id, _echarts_instance_, set_Echarts_instance_ }) => {
  const boxId = useMemo(() => {
    return id
  }, [id])
  const { box } = useContext(PageContext)
  const chart = box[boxId]
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
  const { run } = useDebounceFn(
    () => {
      if (chart && chart.id) {
        let c = document.getElementById(chart.id + '_echart')
        if (c) {
          if (!_echarts_instance_[boxId]) {
            let myChart = echarts.init(c, 'dark')
            set_Echarts_instance_({
              ..._echarts_instance_,
              [boxId]: myChart,
            })
            myChart.setOption(chart.option)
          } else {
            let myChart = _echarts_instance_[boxId]
            myChart.setOption(chart.option)
            myChart.resize()
          }
        }
      }
    },
    {
      wait: 200,
    }
  )
  useEffect(() => {
    if (chart && chart.id) {
      run()
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
