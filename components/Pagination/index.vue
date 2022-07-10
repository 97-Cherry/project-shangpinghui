<template>
  <div class="pagination">
    <!-- <h1>--{{startNumAndEndNUM}}------当前的页面{{pageNo}}</h1> -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNUM.start>1" @click="$emit('getPageNo',1)" >1</button>
    <button v-if="startNumAndEndNUM.start>2">···</button>

    <button v-for="(page, index) in startNumAndEndNUM.end" :key="index" v-show="page>=startNumAndEndNUM.start"  @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    
    <button v-if="startNumAndEndNUM.end<totalPage -1">···</button>
    <button v-if="startNumAndEndNUM.end<totalPage"  @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage"  @click="$emit('getPageNo',pageNo+1)" >下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>

  export default {
    name: "pagination",
    // 父组件--子组件传递数据，通过自定义属性的方式传递数据
    props:['pageNo','pageSize','total',
    'continues'],
    //计算属性，计算出总共的页码数
    computed: {
      //利用计算属性计算出总的数据需要展示的页面数是多少也
      totalPage(){
        return Math.ceil(this.total/this.pageSize);
      },
      startNumAndEndNUM(){
        //声明连个变量，起始值和结束值，d
        let start=0,end=0;
      if(this.continues>this.totalPage){
        start=1;
        end=this.totalPage
      }else{
        //连续的页面小于总的页码数
        start=this.pageNo-Math.floor(this.continues/2);
        //可能会出现start出现负数和1开始
        end=this.pageNo+Math.floor(this.continues/2);
        if(start<1){
          start=1;
          end=this.continues
        }
        if(end>this.totalPage){
          end=this.totalPage;
          start=this.totalPage-this.continues+1;//开始的值
        }
      }
      return {start,end}
      }
    },
    
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: skyblue;
  }
</style>