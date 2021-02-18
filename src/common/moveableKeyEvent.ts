import { useKeyPress, useThrottleFn } from 'ahooks'
let requester: any = undefined
const keyboardEvent = (moveableRef: any, targets: any[]) => {
  useKeyPress(
    'up',
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
    'up',
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
    'down',
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
    'down',
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
    'left',
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
    'left',
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
    'right',
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
    'right',
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
export default keyboardEvent
