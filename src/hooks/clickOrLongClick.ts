import { useState } from 'react'
import { useEventListener } from 'ahooks'
const useClickAndLongClick = (time = 500) => {
  const [type, setType] = useState('')
  const upHandler = (ev: MouseEvent) => {}
  const downHandler = (ev: MouseEvent) => {
    setType('click')
    setTimeout(function () {
      setType('longClick')
    }, time)
  }
  useEventListener('mouseup', upHandler)
  useEventListener('mousedown', downHandler)

  return type
}
export default useClickAndLongClick
