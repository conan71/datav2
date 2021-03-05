import { useKeyPress, useThrottleFn } from 'ahooks'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Screen } from '@redux/Stores'

const mapState = (state: Screen) => ({
  active: state.active,
})

const useKeyboardEvent = () => {
  const dispatch = useDispatch()
  const { active } = useMappedState(mapState)
  useKeyPress(
    'ctrl.up',
    (e) => {
      if (active.length === 1) {
        e.preventDefault()
        run('y', -1)
      }
    },
    {
      events: ['keydown'],
    }
  )

  useKeyPress(
    'ctrl.down',
    (e) => {
      if (active.length === 1) {
        e.preventDefault()
        run('y', 1)
      }
    },
    {
      events: ['keydown'],
    }
  )

  useKeyPress(
    'ctrl.left',
    (e) => {
      if (active.length === 1) {
        e.preventDefault()
        run('x', -1)
      }
    },
    {
      events: ['keydown'],
    }
  )

  useKeyPress(
    'ctrl.right',
    (e) => {
      if (active.length === 1) {
        e.preventDefault()
        run('x', 1)
      }
    },
    {
      events: ['keydown'],
    }
  )

  const { run } = useThrottleFn(
    (delta, val?) => {
      switch (delta) {
        case 'x':
          dispatch({
            type: 'change_active',
            active: [
              {
                ...active[0],
                position: {
                  ...active[0].position,
                  x: active[0].position.x + val,
                },
              },
            ],
          })
          break
        case 'y':
          dispatch({
            type: 'change_active',
            active: [
              {
                ...active[0],
                position: {
                  ...active[0].position,
                  y: active[0].position.y + val,
                },
              },
            ],
          })
          break
      }
    },
    {
      wait: 30,
    }
  )
}
export default useKeyboardEvent
