//app.js
App({
    onLaunch: function() {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
				//env: 'se-project-kx6o3',
				env:'se-project-9m1pp',
                traceUser: true,
            })
        }

        this.globalData = {
            questions: {
                ques: []
            }
        }


        this.checkOpenID()

		
    },
    checkOpenID: function() {
        // 在第一步，需检查是否有 openid，如无需获取
        if (!this.globalData.openid) {
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    this.globalData.openid = res.result.openid
                    console.log(this.globalData.openid)
                    const db = wx.cloud.database()
		// 查询当前用户所有的 counters
		db.collection('user').where({
			_openid: this.globalData.openid
		}).get({
			success: res => {
				if (res.data.length == 0) {
					db.collection('user').add({
						data: {
							questionsArray: [],
							datasArray:[]
						},
						success: res => {
							console.log('新建用户成功')
						}, fail: err => {
							console.log('新建用户失败')
						}
					})
				}
				console.log('初始化，拉取该用户所有记录',res)
				//console.log(this.globalData)
			},
			fail: err => {
				wx.showToast({
					icon: 'none',
					title: '查询记录失败'
				})
				console.error('[数据库] [查询记录] 失败：', err)
			}
		})
                },
                fail: err => {
                    wx.showToast({
                        icon: 'none',
                        title: '获取 openid 失败，请检查是否有部署 login 云函数',
                    })
                    console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
                }
            })
        }
    }



})