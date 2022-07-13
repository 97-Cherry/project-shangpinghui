<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread" >
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryname">{{searchParams.categoryname}} <i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}} <i @click="removekeyWord">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}} <i @click="removeTradeMark">×</i></li>
            <li class="with-x" v-for="(attrvalue,index) in searchParams.props" :key="index"> {{attrvalue.split(':')[1]}}<i @click="removeAttrValue(index)">×</i></li>
            
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 进行排序的结构 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合 <i v-show="isOne" class=" iconfont" :class="{'icon-down':isDesc,'icon-up':isAsc}"></i> </a>
                </li>
                <li :class="{active :isTwo}" @click="changeOrder('2')">
                  <a>价格<i v-show="isTwo" class=" iconfont" :class="{'icon-down':isDesc,'icon-up':isAsc}"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"><img :src="goods.defaultImg" /></a> 
                    -->

                    <!-- 传递动态参数项 -->
                    <router-link :to="`/detail/${goods.id}`">
                    <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
         <pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters,mapState } from 'vuex'
export default {
  name: 'search',
  data() {
    return {
      searchParams: {
        //带给服务器的参数,
        //一级分类的id
        category1Id: '',
        category2Id: '',
        category3Id: '',
        //分类名
        categoryname: '',
        //关键词
        keyword: '',
        //排序
        order: '1:desc',
        //分页器。代表当前的页码
        pageNo: 1,
        //每一个页码展示的数据
        pageSize: 10,
        //平台售卖属性操作的数据
        props: [],
        //品牌的名称
        trademark: '',
        //总的页码数
        //  total:91,
            //  可以连续展示的页面数
        // continues:5
   
       
      }
    }
  },

  components: {
    SearchSelector
  },
  beforeMount() {
    //当组件挂载之前执行一次，可以在这里进行searchParams数据的修改
// console.log(this.$route.query),可以获取得到当前搜索的内容值categoryName等
    // this.searchParams.category1Id=this.$route.query.category1Id;
    // this.searchParams.category2Id=this.$route.query.category2Id;
    // this.searchParams.category3Id=this.$route.query.category3Id;
    // this.searchParams.categoryName=this.$route.query.categoryName;
    // this.searchParams.keyword=this.$route.query.keyword;
   Object.assign(this.searchParams, this.$route.query,this.$route.params)
  //同时还需要多次发起请求

  },
  mounted() {
    // 在服务器发起请求之前，将searchparams数据进行获取并展示
    //传递过来的数据
    this.getDate()
  },

  computed: {
    //mapGetters采用数组的形式进行存储
    ...mapGetters(['goodsList']),
    ...mapState({
      total:state=>state.search.searchList.total

    }),

    isOne(){
      return this.searchParams.order.indexOf('1') !=-1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2') !=-1;
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc') !=-1;
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc') !=-1;
    }
  },
  methods: {
    getDate() {
      //将向服务器发起的请求封装为一个函数，可以根据不同的参数但会不同的数据，多次调用
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 删除分类的名字
    removeCategoryName(){
      //c如果设置当前的值为空，则依然还是会带给服务器，设置为undefined就不会把数据带给服务器了
     this.searchParams.categoryname=undefined;
     //点击删除之后，列表中的数据依然需要进行删除
     this.searchParams.category1Id=undefined;
     this.searchParams.category2Id=undefined;
     this.searchParams.category3Id=undefined;

     //在重新请求数据格式
     this.getDate();
         //删除之后，地址栏中的路径也应当发生改变， 直接进行路由的跳转

         //如果存在params参数，就不能直接进行跳转
         if(this.$route.params){

           this.$router.push({name:'search',params:this.$route.params});//自己跳转路由
         }
    },
    // 删除关键字的名字
    removekeyWord(){
      this.searchParams.keyword=undefined;
      this.getDate();
      //同时输入文本框中的文字需要清除，路径中存在的params参数也需要清除
    //配置全局$bus
    this.$bus.$emit('clear');
    //需要进行路由的跳转，如果当前的query参数清除
    if(this.$route.query){
      this.$router.push({name:'search',query:this.$route.query})
    }
    },
    // 自定义事件的语法
    tradeMarkInfo(trademark){
      // console.log(trademark)
      //需要进行品牌参数的整理
      this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
      this.getDate();
  },
  //进行删除tradeMark的操作
  removeTradeMark(){
    this.searchParams.trademark=undefined;
    this.getDate();

  },
  attrInfo(att,attrvalue){
    // console.log(att,attrvalue)
    let props=`${att.attrId}:${attrvalue}:${att.attrName}`;
    if(this.searchParams.props.indexOf(props)==-1) this.searchParams.props.push(props);
      this.getDate();

  },
  removeAttrValue(index){
    //需要获取得到点击元素的索引值
    this.searchParams.props.splice(index,1);//删除当前元素的索引号的值
    this.getDate();//重新获取得到当前的值
  },
  // 进行点击排序的操作
  //flag的形参时一个标记，代表用户点击的是综合还是价格
  changeOrder(flag){
    let originOrder=this.searchParams.order;//获取得到起始的升序还是降序
    // console.log('123')
    let originFlag=this.searchParams.order.split(":")[0];//1还是2
     let originSort=this.searchParams.order.split(":")[1];//获取的是desc还是asc
     let newOrder="";
     if(flag==originOrder){
    //   //默认的条件下是默认的综合降序
      newOrder=`${originFlag}:${originSort=='desc' ? "asc":'desc'}`;
     }else{
      //点击的是价格
      newOrder=`${flag}:${'desc'}`;
     }

     //将newOrder赋予this.searchParams.order;
     this.searchParams.order=newOrder;
     //重新赋值，获取数据
     this.getDate();
    

  } ,

  // 自定义事件
  getPageNo(pageNo){
    this.searchParams.pageNo=pageNo;
    this.getDate();
    
  }
   },
  watch: {
    //用于监听数据的变换，
    //可以用来监听路由的变换
    $route(){
      //在次发起请求之前需要再次整理带给服务器的数据
      Object.assign(this.searchParams,this.$route.params,this.$route.query)
    //再次发起ajax数据请求
    this.getDate();
    //会出现上次出现的内容不能全部清除，在发请求之前，需要将数据清除完毕，
   //分类的名字和关键词不需要进行清除数据，是因为在进行点击的时候，会赋予新的值
   this.searchParams.category1Id=undefined;
    this.searchParams.category2Id=undefined;
    this.searchParams.category3Id=undefined;
    }
  
  },
}

</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>