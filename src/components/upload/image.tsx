import React, { useEffect, useState, useRef, CSSProperties } from 'react'
import { useEventListener, useClickAway, useDebounceFn } from 'ahooks'
import { useDropzone } from 'react-dropzone'
import './image.css'
interface imgData {
  url: String
  opacity?: number
}
interface props {
  imgData?: imgData
  upImage?: Function
}
const img = {
  display: 'block',
  width: 'auto',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
}
const IImage = ({ url, delFun }) => {
  const content: CSSProperties = {
    position: 'relative',
    width: 'auto',
    height: '100%',
  }
  const delBtn = useRef<HTMLDivElement | null>(null)
  useEventListener(
    'click',
    (e) => {
      e.preventDefault()
      delFun()
    },
    { target: delBtn }
  )
  return (
    <div style={content}>
      <img src={url} style={img} />
      <div ref={delBtn} className="del">
        删除
      </div>
    </div>
  )
}
function fileToBase64(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      //这里是一个异步，所以获取数据不好获取在实际项目中，就用new Promise解决
      if (this.result) {
        resolve(this.result)
      } else {
        reject('err')
      }
    }
  })
}
//仅图片选择显示
export const ImageBox = (props: props) => {
  const { imgData, upImage } = props
  const zone = {
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      fileToBase64(acceptedFiles[0]).then((res) => {
        setFiles([res])
      })
      // setFiles(
      //   acceptedFiles.map((file) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     })
      //   )
      // )
    },
    onDragOver: (e) => {
      // console.log('onDragOver>>>>>>>>>>>>' + e)
    },
  }
  const [files, setFiles] = useState<any>([])
  const [url, setUrl] = useState(imgData?.url)
  const { getRootProps, getInputProps } = useDropzone(zone)
  useEffect(() => {
    if (files.length > 0 && files[0]) {
      setUrl(files[0])
      if (upImage) {
        upImage(files[0])
      }
    } else {
      setUrl('')
    }
  }, [files])
  useEffect(() => {
    setUrl(imgData?.url)
  }, [imgData])
  const delFun = () => {
    setFiles([])
    if (upImage) {
      upImage('')
    }
  }

  const getImage = () => {
    return files
  }
  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {url ? (
        <IImage url={url} delFun={delFun}></IImage>
      ) : (
        <div>选择或拖动图片到此处</div>
      )}
    </div>
  )
}
