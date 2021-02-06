import { createStore } from 'redux'
import reducer from './reducer'
interface Scale {
  x: number
  y: number
}
export interface Screen {
  scale: Scale
  drag: boolean
}
export type Action =
  | {
      type: 'change_drag'
      val: boolean
    }
  | {
      type: 'change_title'
      boo: boolean
    }

export const INITIAL_STATE: Screen = {
  drag: false,
  scale: {
    x: 1,
    y: 1,
  },
}
export function makeStore() {
  return createStore(reducer, INITIAL_STATE)
}
