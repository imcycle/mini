Page({
  data: {
    picList: [],
    picList1: [{ url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567767650570&di=e99314caaadc830e9b590311945cdbaa&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fh027%2Fh13%2Fimages201508311321540_info200X200.png' }],
  },

  handlePicturesChange: function ({ detail }) {
    this.setData({ picList: detail })
  },

  handlePicturesChange1: function ({ detail }) {
    this.setData({ picList1: detail })
  },

  onShareAppMessage: function () {
    return {}
  },

})
