import { createStore } from 'vuex'
declare let SessionStorage : any;
const USER = "USER";

const store = createStore({
  state: {
    //防止空指针异常,避免刷新之后数据消失
    user: SessionStorage.get(USER) ||{}
  },
  mutations: {
    setUser(state,user){
      state.user = user;
      SessionStorage.set(USER,user);
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store;
