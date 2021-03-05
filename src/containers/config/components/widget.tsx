import React, { useState, useEffect, useContext } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Form, Input, InputNumber } from 'antd'
import { Screen } from '@redux/Stores'
import PageContext from '@context/index'
import styles from './widget.module.less'
const mapState = (state: Screen) => ({
  active: state.active,
})
const Widget = () => {
  const { active } = useMappedState(mapState)
  const { box, changeBox } = useContext(PageContext)
  const [selfbox, setSelfBox] = useState({
    id: '',
    drag: {
      w: 0,
      h: 0,
    },
    position: {
      x: 0,
      y: 0,
    },
  })
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(active)
    setSelfBox(box[active[0]])
  }, [active, box[active[0]]])
  return (
    <>
      <h3>组件</h3>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        // size={'small' as SizeType}
      >
        <Form.Item label="尺寸" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <InputNumber
              value={selfbox.drag.w}
              onChange={(e) => {
                changeBox(`${active[0]}-drag-w`, e)
              }}
            />
            <div className={styles.text}>宽</div>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <InputNumber
              value={selfbox.drag.h}
              onChange={(e) => {
                changeBox(`${active[0]}-drag-h`, e)
              }}
            />
            <div className={styles.text}>高</div>
          </Form.Item>
        </Form.Item>
        <Form.Item label="位置" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <InputNumber
              value={selfbox.position.x}
              onChange={(e) => {
                console.log(e)
                changeBox(`${active[0]}-position-x`, e)
              }}
            />
            <div className={styles.text}>左</div>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <InputNumber
              value={selfbox.position.y}
              onChange={(e) => {
                changeBox(`${active[0]}-position-y`, e)
              }}
            />
            <div className={styles.text}>上</div>
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  )
}

export default Widget
