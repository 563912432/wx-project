import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import mint from 'mint-ui'
import VueCookie from 'vue-cookie'
import md5 from 'md5'
Vue.use(mint)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueCookie)

const store = new Vuex.Store({
  state: {
    chapter: 1,
    simulate: 2,
    vip: 3,
    host: '/',
    courseType: {
      'video': 2,
      'op': 3,
      'tk': 1
    },
    isLogin: false,
    selected: '1',
    userInfo: null,
    isWxBrowser: false,
    // 全部课程列表
    courseList: [],
    // 视频列表
    videoList: [],
    // 已购买的课程
    myCourses: null,
    // 题型映射
    typeList: {
      single: 1,
      single_five: 2,
      pw: 3,
      // 综合分析选择题
      zhfxxz: 4,
      multi: 5,
      multi_five: 6,
      zuhexuanze: 7,
      judge: 8,
      jisuan_fenxi: 11,
      // 中级简答题 同中级综合题
      zjjd: 13,
      // 建筑案例分析
      jzanli: 14,
      material: 15,
      bianxi: 16,
      jianda: 17,
      lunshu: 18,
      // 教师材料分析
      cailiaofenxi: 19,
      xiezuo: 20,
      jiaoxuesheji: 21,
      huodongsheji: 22,
      zh: 23,
      // 期货多选
      qhzhmx: 27,
      // 期货单选
      qhzhdx: 28
    },
    // 当前试卷信息
    paperInfo: null,
    // 会员消息
    memberMsg: null,
    // 试卷信息列表
    paper: {},
    examState: {
      // 答题卡面板状态
      examCard: false,
      // 解析面板状态
      examParse: false,
      // 视频解析状态（cs）
      parseVideo: false,
      // 当前题号
      curr_index: 0,
      // 考试剩余时间
      leftTime: 0,
      // 学员做题答案
      userAnswer: [],
      // 我的答疑面板状态
      examAsk: false
    },
    myProgress: {},
    // 答疑问题内容
    askInfo: [],
    // 是否开通答疑
    isAsk: false,
    // 提问内容
    askContent: '',
    // 是否勾选答疑
    isCheckAsk: false,
    // 选择的课程是否是图书配送版题库[默认不是]
    isBuyBookToSend: false
  },
  getters: {
    createUUID () {
      var d = new Date().getTime()
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    courseType (state) {
      return state.courseType
    },
    uploadPath (state) {
      return state.host + 'Uploads/'
    },
    myCourses (state) {
      return state.myCourses
    },
    isWxBrowser (state) {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.indexOf('micromessenger') > -1) {
        state.isWxBrowser = true
      } else {
        state.isWxBrowser = false
      }
      return state.isWxBrowser
    },
    memberMsg (state) {
      let date = new Date()
      if (state.memberMsg !== null && Math.floor(date.getTime() / 1000) < state.memberMsg.expire) {
        return state.memberMsg
      }
      return null
    },
    userAnswer (state) {
      let data = state.examState.userAnswer
      if (data && data.length > 0) {
        return data.filter(v => {
          if (typeof v.val === 'object') {
            return v.val.length > 0
          }
          return v.val !== null
        })
      }
    },
    createSignature (state) {
      if (state.userInfo === null) {
        return false
      }
      let len = 8
      let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let randomStr = ''
      for (let i = 0; i < len; i++) {
        randomStr += char.charAt(Math.floor(Math.random() * char.length))
      }
      if (randomStr === '') {
        return false
      }
      let secretStr = md5(state.userInfo.lastlogintime + randomStr)
      return {random: randomStr, signature: secretStr}
    },
    askInfo (state) {
      return state.askInfo
    },
    isAsk (state) {
      return state.isAsk
    },
    isCheckAsk (state) {
      return state.isCheckAsk
    },
    isBuyBookToSend (state) {
      return state.isBuyBookToSend
    }
  },
  mutations: {
    logout (state) {
      state.isLogin = false
      state.userInfo = null
    },
    setSelected (state, data) {
      state.selected = data + ''
    },
    setLogin (state, data) {
      state.isLogin = data
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setWxBrowser (state, bool) {
      state.isWxBrowser = bool
    },
    setCourseList (state, data) {
      state.courseList = data
    },
    setMyCourses (state, data) {
      state.myCourses = data
    },
    setVideoList (state, data) {
      state.videoList = data
    },
    setCurrentPaperInfo (state, data) {
      state.paperInfo = data
    },
    setMemberMessage (state, data) {
      state.memberMsg = data
    },
    setExamCard (state, bool) {
      state.examState.examCard = bool
    },
    setExamAsk (state, bool) {
      state.examState.examAsk = bool
    },
    setExamParse (state, bool) {
      state.examState.examParse = bool
    },
    setParseVideo (state, bool) {
      state.examState.parseVideo = bool
    },
    setExamCurrIndex (state, index) {
      state.examState.curr_index = index
    },
    clearExamState (state) {
      state.examState.curr_index = 0
      state.examState.leftTime = 0
      state.examState.examCard = false
      state.examState.examParse = false
      state.examState.parseVideo = false
      state.examState.userAnswer = []
      state.examState.examAsk = false
    },
    saveAnswer (state, data) {
      state.examState.userAnswer = data
    },
    setExamLeftTime (state, data) {
      state.examState.leftTime = data
    },
    setPaper (state, data) {
      state.paper[data.pid] = data.info
    },
    setMyProgress (state, data) {
      let cid = data.cid
      state.myProgress[cid] = data.progress
    },
    setAskInfo (state, data) {
      state.askInfo = data
    },
    setIsAsk (state, data) {
      state.isAsk = data
    },
    setAsk (state, data) {
      state.askContent = data
    },
    setIsCheckAsk (state, data) {
      state.isCheckAsk = data
    },
    setIsBuyBookToSend (state, data) {
      state.isBuyBookToSend = data
    }
  },
  actions: {
    // 登陆
    handleLogin ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/User/login.html', data.data, {emulateJSON: true}).then(response => {
        if (response.ok && response.body.status === 1) {
          commit('setUserInfo', JSON.parse(response.body.info))
          commit('setLogin', true)
          Vue.cookie.set('user', JSON.stringify({tel: data.data.tel, pwd: data.data.pwd}), {expires: 7})
          data.success()
        } else {
          data.failed(response.body.info)
        }
      }).catch(response => {
        data.failed('连接超时')
      })
    },
    // 注册
    handleReg ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/User/register.html', data.param, {emulateJSON: true}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success()
        } else {
          data.error(response.body.info)
        }
      }).catch(response => {
        data.error('连接超时')
      })
    },
    // 修改密码
    modifyPwd ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/User/modifyPwd.html', data.param, {
        emulateJSON: true,
        timeout: 5000
      }).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success()
        } else {
          data.error(response.body.info)
        }
      }).catch(response => {
        console.log(response)
      })
    },
    // 更新密码
    updatePwd ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/User/updatePwd.html', data.param, {
        emulateJSON: true,
        timeout: 5000
      }).then(response => {
        data.callback(response.data)
      }).catch(response => {
        console.log(response)
      })
    },
    // 发送验证码
    sendVerifyCode ({commit, state}, data) {
      if (!(/1[345678](\d){9}/g.exec(data.param.tel))) {
        data.error('请填写正确的手机号码')
      }
      Vue.http.post(state.host + 'Api/User/sendTelephoneCode.html', data.param, {
        emulateJSON: true,
        timeout: 5000
      }).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success()
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取课程分类
    getCourseCateList ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Course/getCourseCateList/id/' + data.id, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else if (response.body.status === -1) {
          commit('logout')
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取课程分类下课程列表
    getCourseList ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Course/getCourseList/id/' + data.id, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else if (response.body.status === -1) {
          commit('logout')
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取课程详细信息
    getCourseInfoById ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Course/getCourseInfoById/id/' + data.id, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取指定课程，指定类型试卷
    getPaperList ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Paper/getPaperList/type/' + data.param.type + '/cid/' + data.param.cid, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取视频列表
    getCourseListOfVideo ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Course/getCourseListOfVideo', {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          commit('setVideoList', JSON.parse(response.body.info))
          data.success(JSON.parse(response.body.info))
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取视频章节列表
    getVideoChapterList ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Video/getVideoChapterList/id/' + data.id, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取我的课程
    getMyCourse ({commit, state}, data) {
      if (!state.userInfo || !state.userInfo.id) {
        return
      }
      let uid = state.userInfo.id
      Vue.http.get(state.host + 'Api/MyCourse/getMyCourse/id/' + uid, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          // 去掉实操课程
          let courseList = JSON.parse(response.body.info)
          commit('setMyCourses', courseList)
          data.success(courseList)
        } else if (response.body.status === -1) {
          commit('logout')
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 开通课程
    openCourseByCard ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/MyCourse/openCourseByCard', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取我的消费记录
    getMySpendLog ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/User/getMySpendLog', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取会员消息
    getMessage ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/User/getMessage/uid/' + data.uid, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          let msg = JSON.parse(response.body.info)
          let date = new Date()
          // 设置有效期
          msg.expire = Math.floor(date.getTime() / 1000) + 5 * 300
          commit('setMemberMessage', msg)
          data.success(msg)
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取试卷信息
    getPaperInfo ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Paper/getPaperInfo/id/' + data.id, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          commit('setCurrentPaperInfo', JSON.parse(response.body.info))
          data.success(JSON.parse(response.body.info))
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取某试卷的全部题型
    getExamOfPaper ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Paper/getExamOfPaper', data.params, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    // 试题收藏
    collectExam ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Exam/collectExam', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    // 保存进度
    saveProgress ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Exam/saveProgress', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    getExamTypeMap ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Exam/getExamTypeMap', {timeout: 5000}).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    // 获取进度列表
    getProgressList ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Paper/getProgressList', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    delProgressRecord ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Paper/delProgressRecord', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    saveError ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Exam/saveError', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).catch((response) => {
        data.error(response)
      })
    },
    delErrorRecord ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Paper/delErrorRecord', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    getPaperOfError ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Paper/getPaperOfError', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    getPaperOfCollect ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Paper/getPaperOfCollect', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    removeErrorExam ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Exam/removeErrorExam', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    useKCode ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/MyCourse/useKCode', data.param, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    opeFreeCourse ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/MyCourse/openCourseForFree', data.params, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    // 获取我的答疑信息
    myAsk ({commit, state}, data) {
      if (!state.userInfo || !state.userInfo.id) {
        return
      }
      Vue.http.post(state.host + 'Api/Ask/userAsk', data.params, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    // 提交答疑
    submitAsk ({commit, state}, data) {
      Vue.http.post(state.host + 'Api/Ask/submitAsk', data.params, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    },
    // 获取课程课程列表
    getNewsList ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/News/getNewsList/p/' + data.p, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else if (response.body.status === -1) {
          commit('logout')
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取课程课程列表
    getNewsDetail ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/News/getNewsDetail/id/' + data.id, {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else if (response.body.status === -1) {
          commit('logout')
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取课程课程列表
    getIndexData ({commit, state}, data) {
      Vue.http.get(state.host + 'Api/Index/getIndexData', {timeout: 5000}).then(response => {
        if (response.ok && response.body.status === 1) {
          data.success(JSON.parse(response.body.info))
        } else if (response.body.status === -1) {
          commit('logout')
        } else {
          data.error(response.body.info)
        }
      }).catch(() => {
        data.error('连接超时')
      })
    },
    // 获取是否是图书配送版题库
    isBuyBookToSend ({commit, state}, data) {
      if (!state.userInfo || !state.userInfo.id) {
        return
      }
      Vue.http.post(state.host + 'Api/MyCourse/isBuyToSend', data.params, {
        timeout: 5000,
        emulateJSON: true
      }).then(response => {
        data.callback(response.data)
      }).catch((response) => {
        console.log(response)
      })
    }
  }

})

export default store
