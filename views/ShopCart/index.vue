<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <!-- 商品的选中状态 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="changeChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <!-- 点击添加熟练度额值 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value *1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0" @click="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span >{{totalGoods}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
 
  mounted() {
    this.getData() //获取数据

    //删除商品列表中的数据
    // this.$store.dispatch('deleteCartById')
  },
  methods: {
    // 可以用来重复调用数据
    getData() {
      // 获取商品的数据
      this.$store.dispatch('getCartList')
    },
    // 改变参数的值handler
    handler: throttle(async function (type, disNum, cart) {
      switch (type) {
        case 'add':
          disNum = 1
          break

        case 'minus':
          // 判断，当前产品的个数大于1才能进行-1的操作
          if (cart.skuNum > 1) {
            disNum = -1
          } else {
            disNum = 0 //表示产品的数量不发生改变
          }
          break
        case 'change':
          // 用来判断当前的额值是否是存在不正常输入的情况
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0 //用户输入的值是一个非法的数字，带给服务的值是0,表示数据为发生任何的改变
          } else {
            parseInt(disNum) - cart.skuNum
          }
      }
      //判断完成之后，需要进行重新派发数据请求
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 重新获取服务器的数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 500),

    // 删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('deleteCartById', cart.skuId)
        // 如果删除成功，再次发起请求获取新的数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改商品的一个选中状态
    async changeChecked(cart, event) {
      try {
        // console.log(event.target.checked);//获取商品的值。是一个布尔值
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked })
        this.getData() //重新获取数据
      } catch (error) {
        alert(error.message)
      }
    },
    // // 点击全选按钮，当前商品就全部选中，没有全选，当前的商品就完全部选中
    async changeAllChecked(event){
      try {
        let isChecked=event.target.checked ?'1':'0';
      // console.log(checked)
       await this.$store.dispatch('updataChangeAllChecked',isChecked)
      this.getData();
      } catch (error) {
        alert(error.message)
        
      }
    },
    // 删除全部的商品信息
   async deleteAllCheckedCart(){
      // console.log(content)
      // 删除商品内容，需要进行dispatch派发数据内容
      try {
       await this.$store.dispatch('deleteAllCheckedCart');
       this.getData()
      } catch (error) {
        alert(error.message)
        
      }
      
    },




  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
      
    },
    // 计算商品的总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    isAllChecked() {
      // 遍历元素中所有的值都是isChecked==1，开始勾选
      // arr.every((item)=>{})；遍历数组中的每一个值，如果存在满足条件的，返回false
      return this.cartInfoList.every(item => item.isChecked == 1)
    },
    totalGoods(){
      let sum=0
      // 当前的商品状态为选中的状态，就数组＋1，否则-1；
      this.cartInfoList.forEach(item=>{
        if(item.isChecked==1){
          sum++
        }else{
          while(sum>=0){

            sum--
          }
          sum=0
        }
      })
      return sum
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>