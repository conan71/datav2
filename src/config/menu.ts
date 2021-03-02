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
        title: '分组柱状图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/2.png',
      },
      {
        id: 1,
        title: '堆叠柱状图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/15.png',
      },
      {
        id: 1,
        title: '基础条形图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/3.png',
      },
      {
        id: 1,
        title: '分组条形图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/4.png',
      },
    ],
  },
  {
    title: '折线图',
    icon: '',
    children: [
      {
        id: 1,
        title: '普通折线图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/7.png',
      },
      {
        id: 1,
        title: '阶梯折线图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/11.png',
      },
      {
        id: 1,
        title: '分组阶梯折线图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/12.png',
      },
      {
        id: 1,
        title: '多色折线图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/10.png',
      },
      {
        id: 1,
        title: '面积图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/9.png',
      },
    ],
  },
  {
    title: '饼图',
    icon: '',
    children: [
      {
        id: 1,
        title: '基础饼图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/13.png',
      },
      {
        id: 1,
        title: '多色南丁格尔玫瑰图',
        icon: '',
        widget: 'echart',
        imgPath: './image/chart/14.png',
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
