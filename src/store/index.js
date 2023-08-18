import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home'

export default createStore({
  state: {
    playList:[{  //默认的播放列表
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id:1446137141,
      name:'雨爱（抖音版）'
     
    }],
    playListIndex:0,   //默认下标为0
    isbtnShow:true,  //播放svg变化的显示
    detailShow:false,//歌曲详情页的展示
    lyricList:{},//歌词
    currentTime:0,  //歌曲播放当前时间
    duration:0,//歌曲总时长
    isLogin:false, //判断是否登录
    isFooterMusic:true, //判断底部组件是否显示
    token:'',
    user:{} //用户信息

  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
    },
    updatePlayList:function(state,value){
      state.playList=value
      console.log(state.playList)
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    updateToken:function(state,value){
      state.token=value
      localSorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
      state.user=value
    }

  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit('updateLyricList',res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value);
      // console.log(res)
      return res
    }
  },
  modules: {
  }
})
