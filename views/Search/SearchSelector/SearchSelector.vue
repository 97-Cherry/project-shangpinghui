<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌的内容 -->
        <ul class="logo-list">
          <li v-for="trademark in trademarkList" :key="trademark.tmId" @click="tradeMarkHandler(trademark)">{{trademark.tmName}}</li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 平台售卖属性 -->
    <div class="type-wrap" v-for="att in attrsList" :key="att.attrId">
      <!-- 平台的售卖属性 -->
      <div class="fl key">{{att.attrName}}</div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 平台的售卖属性值 -->
          <li  v-for="(attrvalue,index) in att.attrValueList" :key="index" @click="attrInfo(att,attrvalue)">
            <a>{{attrvalue}}</a>
          </li>

        </ul>
      </div>
      <div class="fl ext"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchSelector',
  computed: {
    ...mapGetters(['trademarkList', 'attrsList'])
  },
  methods: {
    tradeMarkHandler(trademark) {
      //点击了品牌，面包屑会进行相应的展示，
      //在父组件中发请求，因为父组件中的searchParams带给服务器参数，子组件需要传递参数给父组件
      // console.log(trademark);//获取得到一个对象，可以得到tmName的值
      this.$emit('tradeMarkInfo', trademark)
    },
    attrInfo(att,attrvalue){
      this.$emit('attrInfo',att,attrvalue);
      
    }
  }
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>