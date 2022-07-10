<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 使用声明式导航实现页面间的跳转 -->
            <router-link to="/login" >登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="../../assets/images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
          <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
        </form>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    //搜索按钮的编程式导航
    goSearch() {
      // this.$router.push('/search/'+ this.keyWord +"?k="+this.keyword.toUpperCase());
      //路由传递参数
      //模板字符串
      //   this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //第三种方式：对象的方式,比较常用的方法
      //路由跳转传递参数的时候，不能够将path和对象的params一起使用，控制台会出现错误
      //如何指定params参数可传递可不传递
      //如果存在query参数
      if (this.$route.query) {
        let location = { name: 'search', params: { keyword: this.keyword || undefined } };
        // let location =this.$router.push(`/search/${this.keyword || undefined}`)
        location.query = this.$route.query
        this.$router.push(location)
      }
      // console.log(this.$router)
    },
    // 退出登录
    //1、需要发起请求，通知服务器退出登录，同时需要进行删除一些数据内容
    // 2、清除项目当中的userinfo，和token数据
    async logOut(){
      try {
        await this.$store.dispatch('userLogOut');
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)

      }
    }

  },
  //全局事件总线$bus来进行兄弟之间的数据通信
  mounted() {
    this.$bus.$on('clear',()=>{
        this.keyword='';
    })
  },
  computed: {
    userName(){
      // 获取用户名信息
      return this.$store.state.usercode.userInfo.name

    }
  },
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>

