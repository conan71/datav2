import React, { useState, useEffect } from 'react'
import { Form, Input, InputNumber } from 'antd'
import { SketchPicker } from 'react-color'
import { ImageBox } from '@components/upload/image'
import styles from './screen.module.less'
type SizeType = Parameters<typeof Form>[0]['size']
interface Props {
  screenName: string
  size: any
  backgroundColor: any | string
  backgroundImage: string
  changeScreen: Function
}
const Screen = (props: Props) => {
  const {
    screenName,
    size,
    backgroundColor,
    backgroundImage,
    changeScreen,
  } = props
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [selfColor, setSelfColor] = useState(backgroundColor)
  const [top, setTop] = useState(0)
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
    setTop(130)
  }
  const handleClose = () => {
    setDisplayColorPicker(false)
  }
  const handleChange = (color) => {
    setSelfColor(color.rgb)
    changeScreen('bgColor', color.rgb)
  }
  return (
    <div className={styles.screen}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        size={'small' as SizeType}
      >
        <Form.Item label="大屏名称">
          <Input
            defaultValue={screenName}
            onChange={(e) => {
              changeScreen('name', e.target.value)
            }}
          />
        </Form.Item>

        <Form.Item label="大屏尺寸" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <InputNumber
              defaultValue={size.width}
              onChange={(e) => {
                changeScreen('width', e)
              }}
            />
            <div className={styles.screenAttr}>宽度</div>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <InputNumber
              defaultValue={size.height}
              onChange={(e) => {
                changeScreen('height', e)
              }}
            />
            <div className={styles.screenAttr}>高度</div>
          </Form.Item>
        </Form.Item>
        <Form.Item label="背景颜色">
          <div className={styles.colorBody}>
            <div className={styles.swatch} onClick={handleClick}>
              <div
                className={styles.color}
                style={{
                  background: `${
                    typeof selfColor === 'string'
                      ? selfColor
                      : `rgba(${selfColor.r}, ${selfColor.g}, ${selfColor.b}, ${selfColor.a})`
                  }`,
                }}
              />
            </div>
          </div>
        </Form.Item>
        <Form.Item label="背景图">
          <ImageBox
            imgData={{
              url: backgroundImage,
              opacity: 1,
            }}
            upImage={(val) => {
              changeScreen('bgImg', val)
            }}
          />
        </Form.Item>
      </Form>
      <div
        style={{ position: 'absolute', top: top, left: '20px', width: '100%' }}
      >
        <div>
          {displayColorPicker ? (
            <div className={styles.popover}>
              <div className={styles.cover} onClick={handleClose} />
              <SketchPicker color={selfColor} onChange={handleChange} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default Screen
