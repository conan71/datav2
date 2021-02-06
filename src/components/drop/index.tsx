import React, { useRef, useEffect, useDebugValue } from 'react'
import { useDrop } from 'ahooks'
import { v4 as uuidv4 } from 'uuid'
import { useMappedState } from 'redux-react-hook'
import { Screen } from '@redux/Stores'
import styles from '@less/drop.module.less'
// import { dataList } from '@/config/menuConfig'
import { AnyIfEmpty } from 'react-redux'
interface contentXY {
  left: number
  top: number
  bodyLeft: number
  bodyTop: number
  height: number
  width: number
}
interface Drop {
  children?: React.ReactNode
  // contentXY: contentXY
  frame: Object
  setFrame: Function
}
const mapState = (state: Screen) => ({
  isDrag: state.drag,
  scale: state.scale,
})
export const Drop = ({ children, frame, setFrame }: Drop) => {
  const { isDrag, scale } = useMappedState(mapState)

  // const dbody = dropBody?.current || {
  //   offsetLeft: 0,
  //   offsetTop: 0,
  //   offsetHeight: 0,
  //   offsetWidth: 0,
  //   scrollLeft: 0,
  //   scrollTop: 0,
  // }
  // const body = ref?.current || {
  //   offsetLeft: 0,
  //   offsetTop: 0,
  //   offsetHeight: 0,
  //   offsetWidth: 0,
  // }
  // setContentXY({
  //   left: dbody.offsetLeft,
  //   top: dbody.offsetTop,
  //   bodyLeft: body.offsetLeft,
  //   bodyTop: body.offsetTop,
  //   bodyHeight: body.offsetHeight,
  //   bodyWidth: body.offsetWidth,
  //   height: dbody.offsetHeight,
  //   width: dbody.offsetWidth,
  // })
  const view: any = document.getElementById('view')
  const dbody: any = document.getElementById('dropBody')
  const body: any = document.getElementById('container')
  const contentXY = {
    left: dbody?.offsetLeft,
    top: dbody?.offsetTop,
    bodyLeft: body?.offsetLeft,
    bodyTop: body?.offsetTop,
    bodyHeight: body?.offsetHeight,
    bodyWidth: body?.offsetWidth,
    height: dbody?.offsetHeight,
    width: dbody?.offsetWidth,
  }

  const scrollLeft = view?.scrollLeft || 0
  const scrollTop = view?.scrollTop || 0

  let w = 100,
    h = 100
  const [props, { isHovering }] = useDrop({
    onText: (text, e) => {
      console.log(text)
    },
    onFiles: (files, e) => {
      console.log(e, files)
    },
    onUri: (uri, e) => {
      console.log(e)
    },
    onDom: (content: any, e: any) => {
      const data = frame[content.name]
      const id = uuidv4().split('-')[1]
      let width = data?.width || w,
        height = data?.height || h
      const key = uuidv4()
      let left = Math.round(
        (e.pageX -
          contentXY.bodyLeft -
          contentXY.left * scale.x +
          scrollLeft -
          (width * scale.x) / 2) /
          scale.x
      )
      let top = Math.round(
        (e.pageY -
          contentXY.bodyTop -
          contentXY.top * scale.y +
          scrollTop -
          (height * scale.y) / 2) /
          scale.y
      )
      const model = {
        ...content,
        id: id,
        key: key,
        type: content.type,
        name: content.name,
        left: left,
        top: top,
        url: content.path,
        drag: {
          w: width,
          h: height,
        },
        position: {
          x: left,
          y: top,
        },
        ref: null,
        rotate: 0,
        data: data,
      }
      frame[id] = model
      // setFrame(frame)
      // modelUp.add(model)
      // counterActions.setActive(id)
    },
  })
  const ref = useRef<HTMLDivElement | null>(null)
  let opacity = 1
  if (isDrag) {
    opacity = 0.9
  }
  if (isHovering) {
    opacity = 0.85
  }
  return (
    <div className={styles.drop} {...props} style={{ opacity }}>
      <div className={styles.dropContent} ref={ref}>
        {children}
      </div>
    </div>
  )
}
