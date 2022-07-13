<template>
  <div>
    <!-- 在home组件中进行使用当前的组件内容,已经注册为一个全局的组件不需要引入 -->
    <TypeNav></TypeNav>
    <listContainer></listContainer>
    <recommend></recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in getFloorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import listContainer from './listContainer/index.vue'
import recommend from './recomment/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import {mapState} from 'vuex'
export default {
  name:'MyHome',
  components:{
    listContainer,
    recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
mounted(){
  this.$store.dispatch('getFloorList');
  // 获取用户信息，在首页进行展示
  this.$store.dispatch('getUserInfo');
  
},
computed: {
  ...mapState({
      getFloorList:state=>{
    return state.home.getFloorList
  }
  })

},
}
</script>
 
<style lang="less" scoped>

</style>