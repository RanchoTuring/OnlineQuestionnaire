// pages/writer/addQues/addQues.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        types: ['单选题', '多选题', '自由填写'],
        type: 0,
        showType: false,
        finished: false,
        itemCount: 0
    },
    submit(e) { //题目填写完成
        //console.log(e)
        this.setData({
            finished: true
        })
        let item = []
        for (let i = 0; i < this.data.itemCount; i++) {
            //console.log(e.detail.value[i.toString()])
            let value = e.detail.value[i.toString()]
            if (value.length != 0) item.push(value)
        }
        this.setData({
            title: e.detail.value.title,
            item: item
        })
    },
    nextStep(e) { //进行下一步
        //console.log(e)
		let app=getApp()
		let that=this
        app.globalData.questions.ques.push({
            title: this.data.title,
            item: this.data.item,
            type: this.data.type
        })
        if (e.currentTarget.dataset.target == "nextQues") {//下一题
            wx.redirectTo({
                url: 'addQues',
            })
        } else if (e.currentTarget.dataset.target == "finish") {//完成
			const db=wx.cloud.database()

			app.globalData.questions.num = app.globalData.questions.ques.length
			app.globalData.questions.id = Date.now()   //需要改

			//拉取原来的数据
			db.collection('user').where({
				_openid: getApp().globalData.openid
			}).get({
				success: res => {
					this.setData({
						//oldQuestions: res.data[0].questions,
						_id:res.data[0]._id
					})
					
					let datas = { id: app.globalData.questions.id,itemCounter:[]}
					for(let i=0,len=app.globalData.questions.num;i<len;i++){
						let item = app.globalData.questions.ques[i].item
						if(item===undefined){//无选项代表是填空
							datas.itemCounter.push([])//用空列表占位
						}else{
							let size=item.length
							let tempArray = []
							for (let j = 0; j < size; j++) {
								tempArray.push(0)
							}
							datas.itemCounter.push(tempArray)
						}
						
					}
					//创建索引
                    db.collection('questionIndex').add({
                        data:{
                            id:app.globalData.questions.id
                        },success: res => {

						}, fail: err => {
							console.log('新建索引失败')
						}
                    })

					const _=db.command
					//创建新问卷及其统计集合并上传
					db.collection('user').doc(this.data._id).update({
						data: {
							questionsArray: _.push(app.globalData.questions),
							datasArray:_.push(datas)
						},
						success: res => {
							console.log('done', res)
							wx.showToast({
								title: '问卷创建成功',
							})
						},
						fail: err => {
							icon: 'none',
								console.error('[数据库] [更新记录] 失败：', err)
						}
					})

				},
				fail: err => {
					wx.showToast({
						icon: 'none',
						title: '查询记录失败'
					})
					console.error('[数据库] [查询记录] 失败：', err)
				}
			})

            wx.redirectTo({
                url: '../preview/preview',
            })
        }
    },

    addItem() {
        this.setData({
            itemCount: this.data.itemCount + 1
        })
    },
    deleteItem(e) {
        this.setData({
            itemCount: this.data.itemCount - 1
        })
    },
    selectType(e) {
        console.log(e)
        this.setData({
            //	['questions.ques[0]']:{type:e.detail.value.type}
            type: e.detail.value.type,
            showType: false
        })
    },
    typeModal(e) {
        this.setData({
            showType: true
        })
    },
    hideModal(e) {
        this.setData({
            showType: null
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            questions: getApp().globalData.questions,
            num: getApp().globalData.questions.ques.length + 1
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})