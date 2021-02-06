import { Action, Screen } from './Stores'

export default function reducer(
  state: Screen | null | undefined,
  action: Action
) {
  if (!state) {
    return null
  }

  switch (action.type) {
    case 'change_drag': {
      return {
        ...state,
        drag: action.val,
      }
    }

    default:
      return state
  }
}
