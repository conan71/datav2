const menu = [
  {
    title: '柱状图',
    icon: '',
    children: [
      {
        id: 1,
        title: '基本柱状图',
        icon: '',
        imgPath: './image/chart/1.png',
      },
      {
        id: 1,
        title: '基本柱状图',
        icon: '',
        imgPath: './image/chart/2.png',
      },
      {
        id: 1,
        title: '基本柱状图',
        icon: '',
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
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  },
}
export { menu, nav, ehartOption }
