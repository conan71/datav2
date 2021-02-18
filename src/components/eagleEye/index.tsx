import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useEventListener, useDebounceFn } from 'ahooks'
import styles from '@less/eagleEye.module.less'
interface props {
  frameMap: Object
}
const w = 300
let h = 200
let move = {
  canMove: false,
  self: {
    left: 0,
    top: 0,
  },
}
const EagleEye = (props: props) => {
  const { frameMap } = props
  const view: any = document.getElementById('view')
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
  })
  const [body, setBody] = useState({
    bodyWidth: 0,
    bodyHeight: 0,
  })

  const newFrameMap = useMemo(() => {
    return frameMap
  }, [Object.values(frameMap)])

  const select = useRef<HTMLDivElement | null>(null)
  const size = {
    width: view.children[0].children[0].offsetWidth,
    height: view.children[0].children[0].offsetHeight,
    scaleWidth: view.children[0].offsetWidth,
    scaleHeight: view.children[0].offsetHeight,
  }
  const visible = {
    top: view.children[0].children[0].offsetTop,
    left: view.children[0].children[0].offsetLeft,
    scrollLeft: view.scrollLeft,
    scrollTop: view.scrollTop,
  }
  const scalew = w / size.scaleWidth
  h = Math.ceil(scalew * size.scaleHeight)
  const visiblew = body.bodyWidth * scalew
  const visibleh = body.bodyHeight * scalew
  const canvasRef = useRef<any>()
  const drawRect = (item: any) => {
    const ctx = canvasRef.current?.getContext('2d')
    const x = item.position.x + visible.left + 1
    const y = item.position.y + visible.top + 1
    const rectCenterPoint = {
      x: (x + item.drag.w / 2) * scalew,
      y: (y + item.drag.h / 2) * scalew,
    }
    if (ctx) {
      ctx.translate(rectCenterPoint.x, rectCenterPoint.y)
      ctx.rotate((item.rotate * Math.PI) / 180)
      ctx.translate(-rectCenterPoint.x, -rectCenterPoint.y)
      ctx.fillStyle = 'red'
      ctx.fillRect(
        x * scalew,
        y * scalew,
        item.drag.w * scalew,
        item.drag.h * scalew
      )
      ctx.restore()
      ctx.save()
    }
  }

  const upHandler = (ev: MouseEvent) => {
    move.canMove = false
  }

  const downHandler = (ev: MouseEvent) => {
    move.canMove = true
    move.self = {
      left: ev.offsetX,
      top: ev.offsetY,
    }
  }

  const mousemoveHandler = (ev: MouseEvent) => {
    if (move.canMove === true) {
      const l = ev.offsetX
      const t = ev.offsetY
      const left = l - move.self.left
      const top = t - move.self.top
      let leftV = 0,
        topV = 0
      if (!select.current) {
        return
      }

      leftV = select.current.offsetLeft + left
      topV = select.current.offsetTop + top

      if (select.current.offsetLeft + select.current.offsetWidth + left >= w) {
        leftV = w - select.current.offsetWidth
      }
      if (select.current.offsetLeft + left <= 0) {
        leftV = 0
      }

      if (select.current.offsetTop + select.current.offsetHeight + top >= h) {
        topV = h - select.current.offsetHeight
      }
      if (select.current.offsetTop + top <= 0) {
        topV = 0
      }

      select.current.style.left = leftV + 'px'
      select.current.style.top = topV + 'px'
      view.scrollTo(leftV / scalew, topV / scalew)
    }
  }
  useEventListener('mouseup', upHandler)
  useEventListener('mousedown', downHandler, { target: select })
  useEventListener('mousemove', mousemoveHandler, { target: select })
  useEffect(() => {
    setScroll({
      x: view.scrollLeft * scalew,
      y: view.scrollTop * scalew,
    })
    setBody({
      bodyWidth: view.offsetWidth,
      bodyHeight: view.offsetHeight,
    })
    view.addEventListener('scroll', () => {
      if (move.canMove == false) {
        setScroll({
          x: view.scrollLeft * scalew,
          y: view.scrollTop * scalew,
        })
      }
    })
    window.addEventListener('resize', () => {
      setBody({
        bodyWidth: view.offsetWidth,
        bodyHeight: view.offsetHeight,
      })
    })
  }, [])
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    console.log('drawReact>>>>>>')
    if (ctx) {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = '#8dbf8d'
      ctx.lineWidth = 1
      ctx.strokeRect(
        visible.left * scalew,
        visible.top * scalew,
        size.width * scalew,
        size.height * scalew
      )
      ctx.save()
      Object.values(newFrameMap).forEach((item) => {
        drawRect(item)
      })
    }
  }, [Object.values(newFrameMap)])
  const selectw = Math.floor(visiblew - 4) > w ? w : Math.floor(visiblew - 4)
  const selecth = Math.floor(visibleh - 4) > h ? h : Math.floor(visibleh - 4)
  return (
    <div className={styles.thumbnail}>
      <div className={styles.eagleEye}>
        <canvas ref={canvasRef} id="EagleEye" width={w} height={h}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <div
          id="select"
          ref={select}
          className={styles.select}
          style={{
            width: selectw,
            height: selecth,
            top: Math.floor(scroll.y),
            left: Math.floor(scroll.x),
          }}
        ></div>
      </div>
    </div>
  )
}

export default EagleEye
