import React, { useState, useEffect, useContext } from 'react'
import { useMappedState } from 'redux-react-hook'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Screen } from '@redux/Stores'
import PageContext from '@context/index'

const grid = 8
const mapState = (state: Screen) => ({
  hover: state.hover,
  active: state.active,
})
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#0c0e10' : '#0c0e10',
  padding: grid,
  width: '100%',
})
const getItemStyle = (isDragging, hover, id, active, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: active == id ? '#2f3b54' : hover === id ? '#404b56' : '#292f35',

  // styles we need to apply on draggables
  ...draggableStyle,
})
interface item {
  id: string
  name: string
  index: number
}
const Layer = () => {
  const { hover, active } = useMappedState(mapState)
  const { box, setBoxOrder, boxOrder } = useContext(PageContext)
  const [items, setItems] = useState<any>([])
  const activeId = active.length > 0 ? active[0].id : ''
  useEffect(() => {
    let list = boxOrder.map((item: any, index) => {
      return item
    })
    setItems(list)
  }, [boxOrder])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const newitems = reorder(
      items,
      result.source.index,
      result.destination.index
    )
    setItems(newitems)
    setBoxOrder(newitems)
  }
  const Content = () => {
    if (items.length === 0) {
      return null
    }
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={getListStyle(droppableSnapshot.isDraggingOver)}
            >
              {items.map((item: item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        hover,
                        item,
                        activeId,
                        draggableProvided.draggableProps.style
                      )}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
  return <Content />
}
export default Layer
