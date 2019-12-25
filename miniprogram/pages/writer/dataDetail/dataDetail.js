// miniprogram/pages/writer/dataDetail/dataDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
          })
        let that = this
        const db = wx.cloud.database()

        db.collection('user').where({
            _openid:getApp().globalData.openid
         }).get({
             success: res => {
                 console.log('查到的值为', res)
 
                 let questionsArray = res.data[0].questionsArray
                 let datasArray = res.data[0].datasArray
                 that.setData({
                     _id: res.data[0]._id,
                     datasArray:datasArray
                 })

                 for (let i = 0, len = questionsArray.length; i < len; i++) {
                     if (questionsArray[i].id == options.id) {
                         that.setData({
                             questions: questionsArray[i]
                         });
                         break
                     }
                 }

                 for (let i = 0, len = datasArray.length; i < len; i++) {
                     if (datasArray[i].id == options.id) {
                         that.setData({
                             datas: datasArray[i],
                             datasArrayPos:i
                         });
                         break
                     }
                 }

                 wx.hideLoading()
             }
         })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})