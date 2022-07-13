<template>
  <div class="spec-preview">
    <img :src="imageObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imageObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask" ></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed: {
      imageObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted() {
      // 全局事件总线，获取兄弟组件之间的数据
      this.$bus.$on('getIndex',(index)=>{
        //传递过来的值需要进行修改当前的动态组件的值
        this.currentIndex=index;
      })
    },
    methods: {
      handler(event){
        //鼠标移动进行移动,ref获取mask遮罩层
        let mask=this.$refs.mask;//获取当前的mask元素值
        let left=event.offsetX-mask.offsetWidth/2;
        let top=event.offsetY-mask.offsetHeight/2;
        if(left<=0) left=0;
        if(left>=mask.offsetWidth) left=mask.offsetWidth;
        if(top<=0) top=0;
        if(top>=mask.offsetHeight) top=mask.offsetHeight;
        mask.style.left=left+'px';
        mask.style.top=top+'px';

        //获取大图片的元素值
        let big=this.$refs.big;
        //大图片是小图片的二倍关系
        big.style.left=- 2*left +'px';
        big.style.top=- 2*top+'px';



      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>