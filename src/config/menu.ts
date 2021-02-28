const menu = [
  {
    title: '柱状图',
    icon: '',
    children: [
      {
        id: 1,
        title: '基本柱状图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/1.png',
      },
      {
        id: 1,
        title: '基本柱状图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/2.png',
      },
      {
        id: 1,
        title: '基本柱状图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/3.png',
      },
    ],
  },
  {
    title: '折线图',
    icon: '',
    children: [
      {
        id: 1,
        title: '基本折线图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/7.png',
      },
    ],
  },
]
const nav = [
  {
    name: '图表',
    icon: 'iconmodular',
  },
  {
    name: '静态',
    icon: 'iconfile-open',
  },
  {
    name: '地图',
    icon: 'iconlayers',
  },
]
const ehartOption = {
  1: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          {
            value: 100,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#EF098A', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0.5)', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
          {
            value: 230,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'blue', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
          {
            value: 240,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'blue', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
          {
            value: 250,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'blue', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
          {
            value: 260,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'blue', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
          {
            value: 360,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'blue', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
          {
            value: 460,
            itemStyle: {
              color: {
                type: 'linear', // 线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red', // 0%处的颜色为红色
                  },
                  {
                    offset: 1,
                    color: 'blue', // 100%处的颜色为蓝
                  },
                ],
              },
            },
          },
        ],
        type: 'bar',
      },
    ],
  },
}
export { menu, nav, ehartOption }
