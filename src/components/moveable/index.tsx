import React, { useState, useEffect, useRef, useMemo, useImperativeHandle, forwardRef, ForwardRefRenderFunction } from 'react';
import Moveable, { MoveableManagerInterface, Renderer } from 'react-moveable';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Screen } from '@redux/Stores';
import Widget from '@components/widget';
import Plug from '@components/plug';
import useKeyboardEvent from '@hooks/moveableKeyEvent';
import 'react-contexify/dist/ReactContexify.css';
import styles from '@less/box.module.less';

function removeValue(val: any, arr: Array<any>) {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

interface props {
  frame: Object;
  boxOrder: Array<any>;
  setFrame: Function;
  setBoxOrder: Function;
  setBox: Function;
  size: {
    height: number;
    width: number;
  };
  lines: {
    x: [];
    y: [];
  };
  backgroundColor: any | string;
  backgroundImage: string;
}

export interface cRef {
  handleDelete: (e: any) => void;
  setTargets: (e: any) => void;
  isMoveableElement: (e: any) => boolean;
}
const mapState = (state: Screen) => ({
  active: state.active,
});

const modelPositionBox = {
  name: 'modelPositionName',
  props: {},
  events: {},
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    return (
      <div
        key={'dimension-viewer'}
        className={'moveable-dimension'}
        style={{
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: 'translate(-50%, 0px)',
        }}
      >
        x：{Math.round(rect.left)} y： {Math.round(rect.top)}
      </div>
    );
  },
} as const;
const modelSizeBox = {
  name: 'modelSizeName',
  props: {},
  events: {},
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    return (
      <div
        key={'dimension-viewer'}
        className={'moveable-dimension'}
        style={{
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: 'translate(-50%, 0px)',
        }}
      >
        {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
      </div>
    );
  },
} as const;

const modelRotateBox = {
  name: 'modelRotateName',
  props: {},
  events: {},
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();
    return (
      <div
        key={'dimension-viewer'}
        className={'moveable-dimension'}
        style={{
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: 'translate(-50%, 0px)',
        }}
      >
        {Math.round(rect.rotation)}°
      </div>
    );
  },
} as const;
const MoveableBox: ForwardRefRenderFunction<cRef, props> = (map, childRef) => {
  const { active } = useMappedState(mapState);
  const { frame, size, lines, boxOrder, setBoxOrder, setFrame, setBox, backgroundColor, backgroundImage } = map;
  const [targets, setTargets] = useState<any>([]);
  const [elementGuidelines, setElementGuidelines] = useState<any>([]);
  const [modelBtn] = useState(true);
  const [modelSize, setModelSize] = useState(false);
  const [modelRotate, setModelRotate] = useState(false);
  const [modelPosition, setModelPosition] = useState(false);
  const [verticalGuidelines, setVerticalGuidelines] = useState<any>();
  const [horizontalGuidelines, setHorizontalGuidelines] = useState<any>();
  const dispatch = useDispatch();
  const moveableRef = useRef<any>(null);
  useKeyboardEvent(moveableRef, targets);
  const frameMap = useMemo(() => {
    return JSON.parse(JSON.stringify(frame));
  }, [frame]);
  const modelBtnBox = {
    name: 'modelBtnName',
    props: {},
    events: {},
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
      const rect = moveable.getRect();
      const { pos2 } = moveable.state;
      // use css for able
      const EditableViewer = moveable.useCSS(
        'div',
        `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .moveable-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
        .moveable-button:before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 16px;
          height: 2px;
          background: #fff;
          border-radius: 1px;
          cursor: pointer;
        }
        .moveable-button:after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 16px;
          height: 2px;
          background: #fff;
          border-radius: 1px;
          cursor: pointer;
        }
        `
      );
      // Add key (required)
      // Add class prefix moveable-(required)
      return (
        <EditableViewer
          key="editable-viewer"
          className={'moveable-editable'}
          style={{
            transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
          }}
        >
          <button className="moveable-button" onClick={handleDelete}></button>
        </EditableViewer>
      );
    },
  } as const;
  useEffect(() => {
    const list = Object.keys(frameMap).map((item) => {
      return document.getElementById(item);
    });
    setElementGuidelines(list);
  }, [Object.keys(frameMap).length]);

  useEffect(() => {
    setFrame(frameMap);
  }, [frameMap]);

  useEffect(() => {
    let vlines: number[] = [...lines.x],
      hlines: number[] = [...lines.y];

    for (let i = 0; i < size.width / 100; i++) {
      vlines.push(i * 100);
    }
    vlines.push(size.width);
    for (let i = 0; i < size.height / 100; i++) {
      hlines.push(i * 100);
    }
    hlines.push(size.height);
    setVerticalGuidelines(vlines);
    setHorizontalGuidelines(hlines);
  }, [size, lines]);

  useEffect(() => {
    const active = targets.map((item) => {
      return item.id;
    });
    dispatch({
      type: 'change_active',
      active: active,
    });
  }, [targets]);

  useEffect(() => {
    const dom = document.getElementById(active[0]);
    if (dom) {
      moveableRef.current.moveable.updateTarget();
    }
  }, [frameMap[active[0]]]);

  const handleOnClick = (e: any) => {
    e.stopPropagation();
    const Target = e.currentTarget;
    const id = Target.id || Target.dataset.id;
    if (!id || id === '') return;
    if (id === 'modelList') {
      if (targets.length > 0) setTargets([]);
    } else if (id.length > 0) {
      const dom = document.getElementById(id);
      setTargets([dom]);
    }
  };

  useImperativeHandle(childRef, () => ({
    // 暴露给父组件的方法
    handleDelete: (e: any) => {
      handleDelete(e);
    },
    setTargets: (data: any[]) => {
      setTargets(data);
    },
    isMoveableElement: (e: any) => {
      const moveable = moveableRef.current;
      const target = e.inputEvent.target;
      return moveable.isMoveableElement(target) || targets.some((t: any) => t === target || t.contains(target));
    },
  }));

  const handleDelete = (e: any) => {
    let ids: any[] = [];
    targets.forEach((item: any, index: number) => {
      const id = item.id;
      delete frameMap[id];
      ids.push(id);
    });
    const newBoxOrder = delArr(boxOrder, ids);
    setBoxOrder(newBoxOrder);
    setBox(frameMap);
    setTargets([]);
  };

  const FlatArr = (arr) => {
    while (arr.some((t) => Array.isArray(t))) {
      arr = [].concat.apply([], arr);
    }
    return arr;
  };

  const delArr = (arr: Array<any>, obj) => {
    const delArrItem = (item) => {
      for (let i = 0; i < newArr.length; i++) {
        const element = newArr[i];
        if (Array.isArray(element)) {
          removeValue(item, element);
          // element.$removeValue(item);
        } else {
          removeValue(item, newArr);
          // newArr.$removeValue(item);
        }
      }
    };
    let newArr = JSON.parse(JSON.stringify(arr));
    if (obj.length > 1) {
      //成组
      debugger;
    } else {
      delArrItem(obj[0]);
    }
    return newArr;
  };

  return (
    <div className={styles.body} id="moveable">
      <Moveable
        ref={moveableRef}
        className={styles.moveable}
        ables={[modelBtnBox, modelPositionBox, modelSizeBox, modelRotateBox]}
        keepRatio={false} //调整大小或缩放比例时，保持宽度与高度的比例
        props={{
          modelBtnName: modelBtn,
          modelPositionName: modelPosition,
          modelSizeName: modelSize,
          modelRotateName: modelRotate,
        }}
        target={targets} //
        origin={false} //中心圆点
        draggable={true}
        resizable={true}
        rotatable={true}
        snappable={true} //是否可以将目标对齐
        snapDistFormat={(v) => `${v}px`}
        snapThreshold={5} //吸附
        isDisplaySnapDigit={true}
        verticalGuidelines={verticalGuidelines} //垂直方向上添加剪辑辅助线
        horizontalGuidelines={horizontalGuidelines} //水平方向上添加剪辑辅助线
        elementGuidelines={elementGuidelines}
        onDragStart={(e) => {
          const id = e.target.id;
          let Transform = frameMap[id];
          e.set([Transform.position.x, Transform.position.y]);
          setModelPosition(true);
        }}
        onDrag={(data) => {
          const { target, beforeTranslate } = data;
          const frame = frameMap[target.id];
          frame.position = {
            x: beforeTranslate[0],
            y: beforeTranslate[1],
          };
        }}
        onDragEnd={(data) => {
          const { target } = data;
          const frame = frameMap[target.id];
          setFrame(`${target.id}-position`, frame.position);
          setModelPosition(false);
          // setModelSize(true)
        }}
        onResizeStart={({ setOrigin, dragStart, target }) => {
          setOrigin(['%', '%']);
          const id = target.id;
          let Transform = frameMap[id];
          dragStart && dragStart.set([Transform.position.x, Transform.position.y]);
          setModelSize(true);
        }}
        onResize={({ target, width, height, drag }) => {
          const beforeTranslate = drag.beforeTranslate;
          const frame = frameMap[target.id];
          frame.position = {
            x: beforeTranslate[0],
            y: beforeTranslate[1],
          };
          frame.drag = { w: width, h: height };
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onResizeEnd={(data) => {
          const { target } = data;
          const frame = frameMap[target.id];
          setFrame([`${target.id}-position`, `${target.id}-drag`], [frame.position, frame.drag]);
          setModelSize(false);
          // setModelSize(false)
        }}
        onRotateStart={({ set, target }) => {
          const frame = frameMap[target.id];
          set(frame.rotate);
          setModelRotate(true);
        }}
        onRotate={(data) => {
          const frame = frameMap[data.target.id];
          frame.rotate = data.beforeRotate;
        }}
        onRenderEnd={(data) => {
          const { target } = data;
          const frame = frameMap[target.id];
          setFrame(`${target.id}-rotate`, frame.rotate);
          setModelRotate(false);
        }}
        onDragGroupStart={(e) => {
          e.events.forEach((ev) => {
            const id = ev.target.id;
            let Transform = frameMap[id];
            ev.set([Transform.position.x, Transform.position.y]);
          });
          setModelPosition(true);
        }}
        onDragGroup={(e) => {
          e.events.forEach((ev) => {
            const { target, beforeTranslate } = ev;
            const frame = frameMap[target.id];
            frame.position = {
              x: beforeTranslate[0],
              y: beforeTranslate[1],
            };
            target.style.transform = `translateX(${frame.position.x}px) translateY(${frame.position.y}px) rotate(${frame.rotate}deg) scaleX(1) scaleY(1)`;
          });
        }}
        onDragGroupEnd={(e) => {
          setModelPosition(false);
          let fields: any[] = [],
            vals: any[] = [];
          e.targets.forEach((item, inex) => {
            const frame = frameMap[item.id];
            fields.push(`${item.id}-position`);
            vals.push(frame.position);
          });

          setFrame(fields, vals);
        }}
        onResizeGroupStart={(e) => {
          e.events.forEach((ev) => {
            const id = ev.target.id;
            let Transform = frameMap[id];
            ev.dragStart && ev.dragStart.set([Transform.position.x, Transform.position.y]);
          });
          setModelSize(true);
        }}
        onResizeGroup={(e) => {
          e.events.forEach((ev) => {
            const { target, width, height, drag } = ev;
            const beforeTranslate = drag.beforeTranslate;
            const frame = frameMap[target.id];
            frame.position = {
              x: beforeTranslate[0],
              y: beforeTranslate[1],
            };
            frame.drag = { w: width, h: height };
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` + ` rotate(${frame.rotate}deg)`;
          });
        }}
        onResizeGroupEnd={(e) => {
          setModelSize(false);

          let fields: any[] = [],
            vals: any[] = [];
          e.targets.forEach((item, inex) => {
            const frame = frameMap[item.id];
            fields.push(`${item.id}-position`);
            fields.push(`${item.id}-drag`);
            vals.push(frame.position);
            vals.push(frame.drag);
          });
          setFrame(fields, vals);
        }}
        onRotateGroupStart={(e) => {
          e.events.forEach((ev, i) => {
            const frame = frameMap[ev.target.id];
            ev.set(frame.rotate);
            ev.dragStart && ev.dragStart.set([frame.position.x, frame.position.y]);
          });
          setModelRotate(true);
        }}
        onRotateGroup={(e) => {
          e.events.forEach((ev, i) => {
            const beforeTranslate = ev.drag.beforeTranslate;
            const frame = frameMap[ev.target.id];
            frame.position = {
              x: beforeTranslate[0],
              y: beforeTranslate[1],
            };
            frame.rotate = ev.rotate;
            ev.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` + ` rotate(${ev.rotate}deg)`;
          });
        }}
        onRotateGroupEnd={(e) => {
          setModelRotate(false);

          let fields: any[] = [],
            vals: any[] = [];
          e.targets.forEach((item, inex) => {
            const frame = frameMap[item.id];
            fields.push(`${item.id}-position`);
            fields.push(`${item.id}-rotate`);
            vals.push(frame.position);
            vals.push(frame.rotate);
          });
          setFrame(fields, vals);
        }}
        onRender={({ target }) => {
          const { position, rotate } = frameMap[target.id];
          target.style.transform = `translate(${position.x}px, ${position.y}px)` + ` rotate(${rotate}deg)`;
        }}
      />

      <div
        className={styles.loop}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: `${
            typeof backgroundColor === 'string' ? backgroundColor : `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`
          }`,

          backgroundSize: 'auto 100%',
        }}
        onClick={handleOnClick}
        onContextMenu={handleOnClick}
        id="modelList"
      >
        {
          // Object.values(frameMap).map((item: any, index) => {
          FlatArr(boxOrder).map((o: any, index) => {
            const item = frameMap[o];
            return (
              <div
                onClick={handleOnClick}
                key={item.id}
                id={item.id}
                className={`${styles.model} ${
                  targets.find((target) => {
                    return target.id === item.id;
                  }) !== undefined
                    ? styles.select
                    : ''
                } modelItem`}
                style={{
                  width: `${item.drag.w}px`,
                  height: `${item.drag.h}px`,
                  transform: `translate(${item.position.x}px, ${item.position.y}px) rotate( ${item.rotate}deg )`,
                }}
              >
                <Plug url="./echart" name="echart" />
                {/* <Widget
                  id={item.id}
                  active={
                    targets.find((target) => {
                      return target.id === item.id;
                    }) !== undefined
                      ? true
                      : false
                  }
                /> */}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default forwardRef(MoveableBox);
