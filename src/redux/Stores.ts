import { createStore } from 'redux'
import reducer from './reducer'
interface Scale {
  x: number
  y: number
}
export interface Screen {
  scale: Scale
  drag: boolean
  targets: Array<any>
}

export type Action =
  | {
      type: 'change_drag'
      val: boolean
    }
  | {
      type: 'change_targets'
      targets: Array<any>
    }

export const INITIAL_STATE: Screen = {
  drag: false,
  scale: {
    x: 1,
    y: 1,
  },
  targets: [],
}
export function makeStore() {
  return createStore(reducer, INITIAL_STATE)
}
