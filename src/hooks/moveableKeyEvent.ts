import { useKeyPress, useThrottleFn } from 'ahooks'
let requester: any = undefined
const useKeyboardEvent = (moveableRef: any, targets: any[]) => {
  useKeyPress(
    'ctrl.up',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        requester = moveableRef.current.moveable.request('draggable')
        run('y', -1)
      }
    },
    {
      events: ['keydown'],
    }
  )
  useKeyPress(
    'ctrl.up',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        run('end')
      }
    },
    {
      events: ['keyup'],
    }
  )
  useKeyPress(
    'ctrl.down',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        requester = moveableRef.current.moveable.request('draggable')
        run('y', 1)
      }
    },
    {
      events: ['keydown'],
    }
  )
  useKeyPress(
    'ctrl.down',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()

        run('end')
      }
    },
    {
      events: ['keyup'],
    }
  )

  useKeyPress(
    'ctrl.left',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        requester = moveableRef.current.moveable.request('draggable')
        run('x', -1)
      }
    },
    {
      events: ['keydown'],
    }
  )
  useKeyPress(
    'ctrl.left',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        run('end')
      }
    },
    {
      events: ['keyup'],
    }
  )
  useKeyPress(
    'ctrl.right',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        requester = moveableRef.current.moveable.request('draggable')
        run('x', 1)
      }
    },
    {
      events: ['keydown'],
    }
  )
  useKeyPress(
    'ctrl.right',
    (e) => {
      if (targets.length > 0) {
        e.preventDefault()
        run('end')
      }
    },
    {
      events: ['keyup'],
    }
  )

  const { run } = useThrottleFn(
    (delta, val?) => {
      switch (delta) {
        case 'x':
          requester.request({ deltaX: val })
          break
        case 'y':
          requester.request({ deltaY: val })
          break
        case 'end':
          requester.requestEnd()
          break
      }
    },
    {
      wait: 30,
    }
  )
}
export default useKeyboardEvent
