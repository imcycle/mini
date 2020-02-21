Page({
  data: {
    mydate: new Date().toString(),
    mylist: [
      {
        day: 1,       // 当月天
        bg: true,     // 是否显示背景
        point: true,  // 是否显示圆点
      },
      { day: 3, bg: true },
      { day: 4, bg: true },
      { day: 5, bg: true, point: true },
      { day: 6, bg: true, point: true },
      { day: 7, point: true },
      { day: 8, point: true },
      { day: 9, point: true },
    ]
  },

  handleDateClick: function ({ detail: { date } }) {
    this.setData({ mydate: date });
  },

  onShareAppMessage: function () {
    return {}
  },
})
