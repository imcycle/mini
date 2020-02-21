Page({
  data: {
    visible: false,
  },

  handleShow: function () {
    this.setData({ visible: true });
  },

  handleCancel: function () {
    this.setData({ visible: false });
  },

  onShareAppMessage: function () {
    return {}
  },
})
