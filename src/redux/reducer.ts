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
    case 'change_active': {
      return {
        ...state,
        active: action.active,
      }
    }
    case 'change_hover': {
      return {
        ...state,
        hover: action.hover,
      }
    }
    default:
      return state
  }
}
