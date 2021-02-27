import { createStore } from 'redux'
import reducer from './reducer'
interface Scale {
  x: number
  y: number
}
export interface Screen {
  scale: Scale
  drag: boolean
  active: Array<any>
  hover: string
}

export type Action =
  | {
      type: 'change_drag'
      val: boolean
    }
  | {
      type: 'change_active'
      active: Array<any>
    }
  | {
      type: 'change_hover'
      hover: string
    }

export const INITIAL_STATE: Screen = {
  drag: false,
  scale: {
    x: 1,
    y: 1,
  },
  active: [],
  hover: '',
}
export function makeStore() {
  return createStore(reducer, INITIAL_STATE)
}
