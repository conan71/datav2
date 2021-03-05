import React, { useRef } from 'react'
import { useDrop } from 'ahooks'
import { v4 as uuidv4 } from 'uuid'
import { useMappedState } from 'redux-react-hook'
import { Screen } from '@redux/Stores'
import styles from '@less/drop.module.less'

interface Drop {
  children?: React.ReactNode
  boxOrder: Array<any>
  frame: Object
  setBoxOrder: Function
  setFrame: Function
}
const mapState = (state: Screen) => ({
  isDrag: state.drag,
  scale: state.scale,
})
let index = 1
export const Drop = ({
  children,
  frame,
  boxOrder,
  setBoxOrder,
  setFrame,
}: Drop) => {
  const { isDrag, scale } = useMappedState(mapState)
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

  let w = 540,
    h = 300
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
      const { option, data } = content
      const id = 'box_' + index
      index++
      let width = option?.width || w,
        height = option?.height || h
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
      const nmodel = {
        option: option,
        id: id,
        key: key,
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
      setFrame({
        ...frame,
        [id]: nmodel,
      })
      setBoxOrder([...boxOrder, id])
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
