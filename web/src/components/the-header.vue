<template>
  <a-layout-header class="header">
    <div class="logo" >
      wiki电子书
    </div>
    <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="/">
        <router-link to="/">首页</router-link>

        </a-menu-item>

      <a-menu-item key="/admin/user" :style="user.id?{}:{display:'none'}">
        <router-link to="/admin/user">用户管理</router-link>
      </a-menu-item>

      <a-menu-item key="/admin/ebook" :style="user.id?{}:{display:'none'}">
        <router-link to="/admin/ebook">电子书管理</router-link>
      </a-menu-item>

      <a-menu-item key="/admin/category" :style="user.id?{}:{display:'none'}">
        <router-link to="/admin/category">分类管理</router-link>
      </a-menu-item>


      <a-menu-item key="/about">
        <router-link to="/about">关于我们</router-link>
      </a-menu-item>



      <a class="login-menu" @click="showLoginModal" v-show="!user.id">
        <span>登录</span>
      </a>
      <a-popconfirm
          title="确认退出登录?"
          ok-text="是"
          cancel-text="否"
          @confirm="logout()"
      >
        <a class="login-menu" v-show="user.id">
          <span>退出登录</span>
        </a>
      </a-popconfirm>

      <a class="login-menu" v-show="user.id">
        <span>您好：{{user.loginName}}</span>
      </a>



      <a-modal
          title="登录"
          v-model:visible="LoginModalVisible"
          :confirm-loading="LoginModalLoading"
          @ok="login"
      >
        <a-form :model="loginUser" :label-col="{span : 6}" :wrapper-col="{span : 18}">
          <a-form-item label="登录名">
            <a-input v-model:value="loginUser.loginName" />
          </a-form-item>

          <a-form-item label="密码">
            <a-input v-model:value="loginUser.password" type="password" />
          </a-form-item>

        </a-form>

      </a-modal>


    </a-menu>



  </a-layout-header>
</template>
<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import Axios from "axios";
import {message} from "ant-design-vue";
import axios from "axios";
import store from "@/store";

declare let hexMd5 :any;
declare let KEY:any;


export default defineComponent({
  name: 'the-header',
  setup: function (){

    //用来登录
    const loginUser = ref({
      loginName : "ymg@wiki2021",
      password: "test"
    });

    //用来保存
    const user = computed(()=> store.state.user);


    const LoginModalVisible = ref(false);
    const LoginModalLoading = ref(false);
    const showLoginModal = () => {
      LoginModalVisible.value = true;
    };

    //登录
    const login = () =>{
      console.log("开始登录");
      LoginModalLoading.value = true;

      //前端数据加密传输
      loginUser.value.password = hexMd5(loginUser.value.password + KEY);

      axios.post("/user/login", loginUser.value).then((response) => {
        LoginModalLoading.value = false;
        const data = response.data;
        if(data.success){
          LoginModalVisible.value = false;
          message.success("登录成功");

          store.commit("setUser",data.content);
        }else {
          message.error(data.message);
        }
    });
    }

    //退出登录
    const logout = () =>{
      console.log("退出登录");

      axios.get("/user/logout/"+ user.value.token).then((response) => {
        const data = response.data;
        if(data.success){
          message.success("退出成功");

          //前端清楚store中的信息
          store.commit("setUser",{});
        }else {
          message.error(data.message);
        }
      });
    }

    return{
      LoginModalVisible,
      LoginModalLoading,
      showLoginModal,
      loginUser,
      login,
      user,
      logout,


    }

  }


});
</script>
<style>
  .login-menu {
    float: right;
    color: white;
    padding-left: 10px;
  }
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    /*margin: 16px 24px 16px 0;*/
    /*background: rgba(255, 255, 255, 0.3);*/
    color: white;
    font-size: 18px;

  }
</style>