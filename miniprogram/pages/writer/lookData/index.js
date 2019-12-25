// miniprogram/pages/writer/lookData/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	dataDetail(e){
	//	console.log(e)
		wx.navigateTo({
			url: '../dataDetail/dataDetail?id='+e.currentTarget.id,
		})
	},
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		const db = wx.cloud.database()
		db.collection('user').where({
			_openid: getApp().globalData.openid,
		}).get({
			success: res => {
				that.setData({
				questionsArray:res.data[0].questionsArray,
					_id: res.data[0]._id
				})
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