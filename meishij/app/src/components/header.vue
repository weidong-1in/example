<template>
  <el-header style="height:auto;">
    <div class="header">
      <div class="header_c">
        <el-row type="flex" justify="start" align="middle">
          <!--显示logo-->
          <el-col :span="6">
            <a href class="logo"></a>
          </el-col>
          <el-col :span="10" :offset="2"></el-col>
          <!--显示用户头像和ID、发布菜谱、退出登入状态-->
          <el-col :span="6" :offset="3" class="avatar-box" v-show="isLogin">
            <router-link :to="{name:'space'}">
              <el-avatar
                style="vertical-align:middle;"
                shape="square"
                size="medium"
                :src="userInfo.avatar"
              ></el-avatar>
            </router-link>
            <router-link :to="{name:'space'}" class="user-name">{{userInfo.name}}</router-link>
            <router-link :to="{name:'create'}" class="collection">发布菜谱</router-link>
            <a href="javascript:;" class="collection" @click="loginOut">退出</a>
          </el-col>
          <!--显示跳转登录注册页面-->
          <el-col :span="6" :offset="3" class="avatar-box" v-show="!isLogin">
            <router-link :to="{name:'login'}" class="user-name">登录</router-link>
            <router-link :to="{name:'login'}" class="collection">注册</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="nav-box">
      <div class="nav_c">
        <Menus></Menus>
      </div>
    </div>
  </el-header>
</template>

<script>
import Menus from "@/components/menus";
import { login_out } from "@/service/api";
export default {
  name: "headers",
  components: {
    Menus
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    loginOut() {
      this.$confirm("确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          const data = await login_out();
          this.$message({
            type: 'success',
            message: data.mes
          });
          localStorage.removeItem('token');
          window.location.href='/'
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="stylus">
.header {
  height: 129px;
  background-color: #c90000;

  .logo {
    display: block;
    height: 129px;
    width: 184px;
    background: url('https://s1.c.meishij.net/n/images/logo2.png') -15px 9px no-repeat; // s1.c.meishij.net/n/images/logo2.png) -15px 9px no-repeat;
  }
}

.header_c, .nav_c {
  width: 990px;
  margin: 0 auto;
}

.nav-box {
  height: 60px;
  background-color: #fff;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.3);
}

.user-name {
  margin-left: 5px;
  color: #fff;
}

.collection {
  margin-left: 5px;
  color: #fff;
}
</style>