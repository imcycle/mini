Component({
  properties: {
    mydata: Array,
    mymaxcount: Number,
  },

  data: {
    value: [],       // 暂存上传结果
    canUseCount: 0,  // 可使用个数
  },

  observers: {
    'mydata, mymaxcount': function (mydata, mymaxcount) {
      this.setData({ canUseCount: (mymaxcount || 3) - mydata.length });
    },
  },

  methods: {
    handleUpload: function () {
      const { canUseCount } = this.data;
      wx.chooseImage({
        count: canUseCount,
        success: (res) => {
          wx.showLoading();
          Promise.all(res.tempFilePaths.map(d => this.uploadFile(d)))
            .finally(() => {  // app.js中实现promise finally
              wx.hideLoading();
              this.triggerEvent('mychange', [...this.data.mydata, ...this.data.value]);
              this.data.value = [];  // 清空上传结果
            })
        }
      })
    },

    uploadFile: function (filePath) {
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: 'http://deployment.whosmeya.com/api/postok',
          filePath,
          name: 'file',
          success: (res) => {
            if (res.statusCode === 200) {
              let json = JSON.parse(res.data);
              this.data.value.push({
                filePath,
                // 业务数据
              });
              resolve();
              return;
            }
            reject();
          },
          fail: (err) => {
            reject(err);
          }
        })
      })

    },

    handleImageDelete: function ({ currentTarget: { dataset: { index } } }) {
      const { mydata } = this.data;
      mydata.splice(index, 1);
      this.triggerEvent('mychange', mydata);
    },

  }

})
