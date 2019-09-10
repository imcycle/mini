const weekNameMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

Component({
  properties: {
    mydate: String,  // 选中的天  Date String 格式
    mylist: Array,
  },

  data: {
    year: null,
    month: null,
    day: null,
    list: [],
  },

  lifetimes: {
    attached: function () {
      const now = new Date();
      this.setData({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      }, this.calcDayList)
    },
  },

  observers: {
    'mydate': function (mydate) {
      let date = new Date(mydate);
      this.setData({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      }, this.calcDayList);
    },

    'mylist': function (mylist) {
      this.setData({ list: mylist }, this.calcDayList);
    },
  },

  methods: {

    // 获取当月共多少天
    getThisMonthDays: function (year, month) {
      return new Date(year, month, 0).getDate()
    },

    // 获取当月第一天星期几   0 星期日
    getFirstDayOfWeek: function (year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },


    calcDayList: function () {
      const { year, month, list, } = this.data;

      let totalDay = this.getThisMonthDays(year, month);
      let firstDay = this.getFirstDayOfWeek(year, month);

      let dayList = [];
      for (let i = 0; i < (totalDay); i++) {
        dayList.push({
          day: i + 1,
          weekName: weekNameMap[(firstDay + i) % 7],
        })
      }

      // 向前添加
      for (let i = 0; i < (firstDay || 7) - 1; i++) {
        dayList.unshift({ day: 0, });
      }

      // 向后添加
      for (let i = 0; i < 42 - totalDay - ((firstDay || 7) - 1); i++) {
        dayList.push({ day: 0, });
      }

      // 当天
      let now = new Date();
      if (now.getFullYear() === year && now.getMonth() + 1 === month) {
        (dayList.find(d => d.day === now.getDate()) || {}).isToday = true;
      }

      // 业务数据处理
      list.forEach(item => {
        let find = dayList.find(d => d.day === item.day);
        if (find) {
          Object.assign(find, item);
        }
      })

      this.setData({ dayList, });
    },

    // 点击上个月
    handlePrevMonthClick: function () {
      let year = this.data.year;
      let month = this.data.month;
      if (this.data.month === 1) {
        year = this.data.year - 1;
        month = 12;
      } else {
        month = this.data.month - 1;
      }
      this.handleDateChange({ year, month });
    },

    // 点击下个月
    handleNextMonthClick: function () {
      let year = this.data.year;
      let month = this.data.month;
      if (this.data.month === 12) {
        year = this.data.year + 1;
        month = 1;
      } else {
        month = this.data.month + 1;
      }
      this.handleDateChange({ year, month });
    },

    // 点击 天
    handleDayClick: function (e) {
      const { day } = e.currentTarget.dataset;
      this.handleDateChange({ day })
    },

    // 处理日期变化
    handleDateChange: function (time) {
      const { year, month, day } = this.data;
      let date = { year, month, day, ...time };
      if (!this.data.mydate) {
        this.setData({ ...date });
        if (time.year || time.month) this.calcDayList();
      }
      this.triggerEvent('mydatechange', { date: new Date(`${date.year}/${date.month}/${date.day}`).toString() })
    }



  }
})