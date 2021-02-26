import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import MoveableBox, { cRef } from '@components/moveable'
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
  animation,
  theme,
} from 'react-contexify'
import Selecto from 'react-selecto'
import Ruler from '@scena/react-ruler'
import Guides from '@scena/react-guides'
import { useScroll, useDebounceFn, useFullscreen } from 'ahooks'
import { useMappedState } from 'redux-react-hook'
import EagleEye from '@components/eagleEye'
import { Screen } from '@redux/Stores'
import { Drop } from '@components/drop'
import styles from '@less/view.module.less'

const PAGE_MARGIN = {
  top: 30,
  right: 100,
  bottom: 100,
  left: 30,
}
const MENU_ID = 'menu-id'
const RULER = 25
const mapState = (state: Screen) => ({
  scale: state.scale,
})
interface props {
  box: Object
  boxOrder: Array<any>
  backgroundColor: any | string
  backgroundImage: string
  size: any
  setBoxOrder: Function
  setBox: Function
  changeBox: Function
}
const View = (props: props) => {
  const {
    box,
    boxOrder,
    size,
    setBox,
    backgroundColor,
    backgroundImage,
    setBoxOrder,
    changeBox,
  } = props
  const [lines, setLines] = useState<any>({
    x: [],
    y: [],
  })
  const { scale } = useMappedState(mapState)
  const [activeBox, setActiveBox] = useState('')
  const view = useRef<HTMLDivElement | null>(null)
  const childRef = useRef<cRef>(null)
  const dropBody = useRef<HTMLDivElement | null>(null)
  const selectoRef = useRef<any>()
  const scroll = useScroll(view)

  const handleLock = (e: any) => {
    // console.log(targets)
  }
  const { show } = useContextMenu({
    id: MENU_ID,
  })
  const displayMenu = (e: any) => {
    e.persist()
    if (e.target && e.target.id != 'modelList') {
      show(e)
    } else {
      e.preventDefault()
    }
  }
  const handleDelete = (e: any) => {
    if (childRef && childRef.current) {
      childRef.current.handleDelete(e)
    }
  }

  return (
    <>
      <div className={styles.ruler}>
        <div
          className={styles.width}
          style={{
            transform: `translateX(-${scroll.left}px) scale(${scale.x},${scale.y})`,
            transformOrigin: '0 0',
            width:
              size.width + RULER + PAGE_MARGIN.left + PAGE_MARGIN.right + 'px',
            // paddingLeft: RULER + PAGE_MARGIN.left + 'px',
          }}
        >
          <Guides
            negativeRuler={false}
            textAlign={'left'}
            mainLineSize={12}
            shortLineSize={5}
            longLineSize={7}
            type="horizontal"
            backgroundColor={'#171c28'}
            style={{
              display: 'block',
              width: size.width + PAGE_MARGIN.right + 'px',
              height: RULER + 'px',
            }}
            rulerStyle={{
              // transform: `translateY(-${scroll.top}px) scale(${scale.x},${scale.y})`,
              left: RULER + PAGE_MARGIN.left + 'px',
              width: '100%',
              height: '100%',
            }}
            unit={100}
            onChangeGuides={({ guides }) => {
              setLines({ x: lines.x, y: guides })
            }}
          />
        </div>
        <div
          className={styles.height}
          style={{
            transform: `translateY(-${scroll.top}px) scale(${scale.x},${scale.y})`,
            transformOrigin: '0 0',
            height:
              size.height + RULER + PAGE_MARGIN.top + PAGE_MARGIN.bottom + 'px',
            // paddingTop: RULER + PAGE_MARGIN.top + 'px',
          }}
        >
          <Guides
            negativeRuler={false}
            textAlign={'right'}
            mainLineSize={12}
            shortLineSize={5}
            longLineSize={7}
            type="vertical"
            backgroundColor={'#171c28'}
            style={{
              display: 'block',
              height: size.height + PAGE_MARGIN.bottom + 'px',
              width: RULER + 'px',
            }}
            rulerStyle={{
              // transform: `translateX(-${scroll.left}px) scale(${scale.x},${scale.y})`,
              top: RULER + PAGE_MARGIN.top + 'px',
              width: '100%',
              height: '100%',
            }}
            unit={100}
            onChangeGuides={({ guides }) => {
              setLines({ y: lines.y, x: guides })
            }}
          />
        </div>
      </div>
      <div className={styles.view} id="view" ref={view}>
        <div
          id="scale"
          onContextMenu={displayMenu}
          className={styles.scale}
          style={{
            width:
              size.width + RULER + PAGE_MARGIN.left + PAGE_MARGIN.right + 'px',
            height:
              size.height + RULER + PAGE_MARGIN.top + PAGE_MARGIN.bottom + 'px',
            transform: `scale(${scale.x},${scale.y})`,
            transformOrigin: '0 0',
          }}
        >
          <div
            id="dropBody"
            className={styles.dropBody}
            ref={dropBody}
            style={{
              top: PAGE_MARGIN.top + RULER,
              left: PAGE_MARGIN.left + RULER,
              height: size.height + 'px',
              width: size.width + 'px',
            }}
          >
            <Drop
              frame={box}
              setFrame={setBox}
              boxOrder={boxOrder}
              setBoxOrder={setBoxOrder}
            >
              <MoveableBox
                ref={childRef}
                lines={lines}
                backgroundColor={backgroundColor}
                backgroundImage={backgroundImage}
                size={size}
                frame={box}
                setBox={setBox}
                setFrame={changeBox}
                boxOrder={boxOrder}
                setBoxOrder={setBoxOrder}
              ></MoveableBox>
            </Drop>
          </div>
        </div>
      </div>
      <div className={styles.thumbnail}>
        {view.current ? <EagleEye frameMap={box} /> : ''}
      </div>
      <Menu
        id={MENU_ID}
        theme={theme.dark}
        animation={animation.scale}
        className={styles.menu}
      >
        <Item onClick={handleLock}>锁定</Item>
        <Item onClick={handleDelete}>删除</Item>
      </Menu>
      <Selecto
        ref={selectoRef}
        dragContainer={'#moveable'}
        selectableTargets={['.modelItem']}
        hitRate={30}
        selectByClick={false}
        selectFromInside={true}
        ratio={0}
        toggleContinueSelect={['shift']}
        onDragStart={(e: any) => {
          if (childRef && childRef.current) {
            const ismove = childRef.current.isMoveableElement(e)
            if (ismove) {
              e.stop()
            }
          }
        }}
        onSelect={(e: any) => {
          if (e.selected.length === 0) {
            return
          }
          if (childRef && childRef.current) {
            childRef.current.setTargets(e.selected)
          }
        }}
      />
      <div className={styles.editSlider}></div>
    </>
  )
}
export default View
