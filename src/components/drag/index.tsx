import React, { useState } from 'react'
import { useDrag } from 'ahooks'
import { useDispatch } from 'redux-react-hook'

const style: React.CSSProperties = {
  cursor: 'move',
  width: '100%',
  height: '100%',
  borderRadius: '4px',
}

interface BoxProps {
  model: Object
  key?: number
  children?: React.ReactNode
}
const Drag = ({ model, children }: BoxProps) => {
  const dispatch = useDispatch()
  const [dragging, setDragging] = useState<string | null>(null)
  // const [isDrag, dragActions] = appStore.useModel('drag')
  // const [isDrag] = store.useModelState('drag');
  // const dragActions = appStore.useModelDispatchers('drag')
  const getDragProps = useDrag({
    onDragStart: (data) => {
      setDragging(data)
      dispatch({
        type: 'change_drag',
        val: true,
      })
      // dragActions.update(true)
    },
    onDragEnd: () => {
      setDragging(null)
      dispatch({
        type: 'change_drag',
        val: false,
      })
      // dragActions.update(false)
    },
  })
  const opacity = dragging ? 1 : 1
  return (
    <div {...getDragProps(model)} style={{ ...style, opacity }}>
      {children}
    </div>
  )
}

export default Drag
