const app = getApp()

Page({
  data: {},

  copy: function ({ currentTarget: { dataset: { url } } }) {
    wx.setClipboardData({
      data: url,
    })
  },

  gotoPage: function ({ currentTarget: { dataset: { url } } }) {
    wx.navigateTo({ url });
  },

  onShareAppMessage: function () {
    return {}
  }

})
