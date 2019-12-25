// miniprogram/pages/writer/preview/preview.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		questions: {
			id: 77746546,
			title: "关于大学生对选修课的态度调查问卷",
			info: "尊敬的女士/先生： 您好，这是一份关于选修课的调查问卷，本次问卷不记名，请您根据自己的实际情况认真填写，谢谢您的支持。",
			num: 5,
			ques: [
				{
					title: "您的性别",
					type: 0,
					item: ["男", "女"]
				}, {
					title: "您目前的年级",
					type: 0,
					item: ["大一", "大二", "大三", "大四"]
				}, {
					title: "您倾向于哪类选修课",
					type: 1,
					item: ["法学类", "科学技术类", "经济管理类", "人文艺术类"]
				}, {
					title: "您一般在选修课上做些什么",
					type: 1,
					item: ["认真听课", "玩手机", "做其他的作业", "其他"]
				}, {
					title: "您如何评价任课老师",
					type: 2
				}
			]
		}
	},
	copyId(){
		wx.setClipboardData({
			data: this.data.questions.id.toString(),
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//console.log(getApp().globalData.questions)
		this.setData({
			questions: getApp().globalData.questions
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