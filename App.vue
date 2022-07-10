<template>
  <div id="app">
    <Header></Header>
    <!-- 定义路由组件的展示去也 -->
    <router-view>
    </router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    
  },
  mounted(){
    //在app.vue执行的时候，进行数据的请求
     this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
