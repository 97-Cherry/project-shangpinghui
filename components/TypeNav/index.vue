<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- 采用一个事件的委派将鼠标移除的操委派给父元素 -->
    <div class="container">
      <div @mouseleave="removeShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派进行参数传递 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle' //lodash的引入，这种引入的方式是将lodash全部的功能引入了
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true //设置一个默认的显示样式
    }
  },

  //组件挂载完毕，可以向服务器发请求
  mounted() {
    //通过vuex的方式来发起请求，获取数据，存储于仓库中

    //组件挂载完毕之后
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    //右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次，注入一个参数state, 其实即为大仓库的数据
    ...mapState({
      //state这个参数，即为大仓库中的数据
      categoryList: state => {
        return state.home.categoryList
      }
    })
  },
  methods: {
    //鼠标移入
    // changeIndex(index){
    //   this.currentIndex=index
    //   // console.log(index)
    // },
    //changeIndex是es5的写法
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    goSearch(event) {
      //如何确定获取的是当前的a标签，给a标签添加相应的自定义属性 ：data-categoryName,其余的结点没有
      //dataset可以获取自定义属性和属性的值
      let element = event.target
      //console.log(element.dataset)，可以获取得到对象的标签值
      let { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        //如何确定当前是一级标签，二级标签，还是三级标签,同样采用自定义属性进行设置当前的值
        //整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryname: categoryname }

        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
    removeShow() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
        }
      }
      .cur {
        background-color: #bfa;
      }
    }
    .sort-enter {
      //过渡动画开始的状态
      height: 0;
    }
    .sort-enter-to {
      //过渡动画结束的状态
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>