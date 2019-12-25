// miniprogram/pages/reader/question/question.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scroll: -1,

    },
    submit(e) {
        //console.log(e.detail.value)
		//在本地记录本次提交
		let result=e.detail.value
		let ques = this.data.questions.ques
		let datas=this.data.datas
		for(let i=0,len=this.data.questions.num;i<len;i++){
			if(ques[i].type==0){
				datas.itemCounter[i][result[i.toString()]]+=1
			}else if(ques[i].type==1){
				let size=result[i.toString()].length
				for(let j=0;j<size;j++){
					datas.itemCounter[i][result[i.toString()][j.toString()]]+=1
				}
			}else{
				datas.itemCounter[i].push(result[i.toString()])
			}
		}
		

		//更新数据库里的值
        const db = wx.cloud.database()
		let datasArray = this.data.datasArray
		datasArray[this.data.datasArrayPos]=datas
        db.collection('user').doc(this.data._id).update({
            data: {
				datasArray:datasArray
			},
            success: res => {
                console.log('done', res)
                wx.showToast({
                    title: '提交成功！',
                    success:res=>{
                        setTimeout(function () {
                            wx.navigateBack({})
                          }, 1500) 
                    }
                    
                })
                
            },
            fail: err => {
                icon: 'none',
                console.error('[数据库] [更新记录] 失败：', err)
            }
        })
    },
    scrollSteps(e) {
        //console.log(e)
        this.setData({
            scroll: this.data.scroll + 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中',
          })
        let that = this
        const db = wx.cloud.database()
        
        db.collection('questionIndex').where({
            id:parseInt(options.id)
        }).get({
            success: res => {
                //console.log('questionIndex res',res)
                if (res.data.length==0) {
                    wx.hideLoading()
                    wx.showModal({
                        title: '查找失败！',
                        content: '没有找到编号对应的问卷，请检查输入是否正确！',
                        showCancel: false,
                        success: function(res) {
                            if (res.confirm) {
                                wx.navigateBack({})
                            }
                        }
                    })
                }

                that.setData({
                    quesOpenId:res.data[0]._openid
                })
                //得到问卷创建者的openid后，进行检索
                db.collection('user').where({
                    _openid:that.data.quesOpenId
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
            fail:err =>{
                wx.hideLoading()
            }
           
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