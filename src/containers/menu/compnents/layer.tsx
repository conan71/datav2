import React, { useState, useContext } from 'react'
import { menu, nav, ehartOption } from '@config/menu'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Screen } from '@redux/Stores'
import PageContext from '@context/index'
import styles from './layer.module.less'
const mapState = (state: Screen) => ({
  targets: state.targets,
})
const Layer = () => {
  const { targets } = useMappedState(mapState)
  const { box, changeBox, boxOrder } = useContext(PageContext)
  console.log(box, boxOrder, targets)
  return <>dd</>
}
export default Layer
