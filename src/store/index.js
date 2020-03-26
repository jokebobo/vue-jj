import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './moduleA';
Vue.use(Vuex)


const state= {
  a:"1,2,3",
  count:1,
  chatId:-1,
  userinfo:null
}
const getters={
  beArray:state=>{
    return state.a.split(",")
  },
  removeLast:(state,getters)=>{
    return getters.beArray.pop();
  }
}
const mutations={
  increment:(state,payload)=>{
    //通过载荷payload传递参数
    state.count+=payload.addnum
  },
  setChatId:(state,payload)=>{
    state.chatId=payload.id
  },
  setUser:(state,payload)=>{
    state.userinfo=payload.user
  }
}
const actions={
  //通过载荷payload传递参数
  incrementAsync:({state,commit},payload)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        commit('increment',payload)
        resolve()
      },1000)
      
    })
    
  },
  incrementAsyncB:({commit,dispatch},payload)=>{
    return dispatch('incrementAsync',payload)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    moduleA
  }
})
