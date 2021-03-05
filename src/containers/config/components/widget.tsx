import React, { useState, useEffect, useContext } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Form, Input, InputNumber } from 'antd'
import { Screen } from '@redux/Stores'
// import PageContext from '@context/index'
import styles from './widget.module.less'
const mapState = (state: Screen) => ({
  active: state.active,
})
const Widget = () => {
  const { active } = useMappedState(mapState)
  // const { changeBox } = useContext(PageContext)
  const [box, setBox] = useState({
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
    setBox(active[0])
  }, [active])
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
              value={box.drag.w}
              onChange={(e) => {
                dispatch({
                  type: 'change_active',
                  active: [
                    {
                      ...box,
                      drag: {
                        ...box.drag,
                        w: e,
                      },
                    },
                  ],
                })
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
              value={box.drag.h}
              onChange={(e) => {
                dispatch({
                  type: 'change_active',
                  active: [
                    {
                      ...box,
                      drag: {
                        ...box.drag,
                        h: e,
                      },
                    },
                  ],
                })
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
              value={box.position.x}
              onChange={(e) => {
                dispatch({
                  type: 'change_active',
                  active: [
                    {
                      ...box,
                      position: {
                        ...box.position,
                        x: e,
                      },
                    },
                  ],
                })
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
              value={box.position.y}
              onChange={(e) => {
                dispatch({
                  type: 'change_active',
                  active: [
                    {
                      ...box,
                      position: {
                        ...box.position,
                        y: e,
                      },
                    },
                  ],
                })
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
