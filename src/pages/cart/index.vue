<template>
  <div class="wrapper">
    <!-- 收货信息 -->
    <dl class="shipment">
      <block v-if="address">
      <dt>收货人: </dt>
      <dd class="meta">
        <span class="name">刘德华</span>
        <span class="phone">13535337057</span>
      </dd>
      <dt>收货地址:</dt>
      <dd>广东省广州市天河区一珠吉</dd>
    </block>
        <button v-else type="primary" >收货地址</button>
    </dl>
    <!-- 购物车 -->
    <div class="carts">
      <div class="item">
        <!-- 店铺名称 -->
        <div class="shopname">优购生活馆</div>
        <div class="goods" v-for="(cart,index) in carts" :key="cart.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="cart.goods_small_logo"></image>
          <!-- 商品信息 -->
          <div class="meta">
            <p class="name">{{cart.goods_name}}</p>
            <p class="price"><span>￥</span>{{cart.goods_price}}<span>.00</span></p>
            <!-- 加减 -->
            <div class="amount">
              <span class="reduce" @click="changeNumber(-1,index)">-</span>
              <input type="number" :value="cart.goods_number" class="number">
              <span class="plus" @click="changeNumber(1,index) ">+</span>
            </div>
          </div>
          <!-- 选框 -->
          <span class="checkbox" @click="cutState(index)">
            <icon type="success" size="20" :color="cart.goods_checked?'#ea4451':'#ccc'"></icon>
          </span>
        </div>

      </div>

    </div>
    <!-- 其它 -->
    <div class="extra">
      <label class="checkall" @click="checkAll" >
        <icon type="success"  size="20" :color="allPig?'#ea4451':'#ccc'"></icon>
        全选
      </label>
      <div class="total">
        合计: <span>￥</span><label>{{amount}}</label><span>.00</span>
      </div>
      <div class="pay">结算({{checkedGoods.length}})</div>
    </div>
  </div>
</template>

<style scoped lang="less">

  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    span.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .item {
      margin-top: 20rpx;
    }
    
    .shopname {
      padding: 30rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      span.checkbox {
        display: block;
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
        bottom: 0;

        color: #ea4451;
        font-size: 33rpx;

        span {
          font-size: 22rpx;
        }
      }

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        span {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, span {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      span {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }

  }
</style>

<script>
  export default {
    data() {
      return {
        // 购物车数据
        carts: [],
        // 全选按钮
        allPig: false,
        // 收货地址
        address: null
      }
    },
    computed: {
      // 在购物车所有商品中，取出选中的商品
      checkedGoods () {
          return this.carts.filter((val) => {
            return val.goods_checked;
        })
      },

      // 总计
      amount(){      
          let total = 0
          this.checkedGoods.forEach((e) => {
            total +=  e.goods_price * e.goods_number
          });

          return total
      }
      
    },
    methods: {
      // 全选
      checkAll(){
        this.carts.forEach((e)=>{
          this.allPig ? e.goods_checked : e.goods_checked = false
        })
        
        this.carts.forEach((e)=>{

          e.goods_checked =!e.goods_checked
            this.allPig =  e.goods_checked      
        })
        

      // 记录本地
          mpvue.setStorageSync('carts',this.carts)
      },

      // 切换购物车选中状态
      cutState(index){
          this.carts[index].goods_checked = !this.carts[index].goods_checked
          
          // 记录本地
          mpvue.setStorageSync('carts',this.carts)

          if(this.checkedGoods.length === this.carts.length){
            this.allPig = true
            return
          }
            this.allPig = false
      },
        // 加减数量
      changeNumber(num,index){
        
        // 最小买一件
          if(num == -1 && this.carts[index].goods_number <= 1) return;
          
          // 选中才能操作
          if(this.carts[index].goods_checked){
              this.carts[index].goods_number += num;
          }
            

          // 记录本地
          mpvue.setStorageSync('carts', this.carts)
      },

      // 读取购物车数据
      getShopping(){
        this.carts = mpvue.getStorageSync('carts') || []
      }
    },
    
    mounted() {
      this.getShopping()
        // 全选按钮颜色设置
        this.allPig = 
        this.checkedGoods.length === this.carts.length &&this.carts.length > 0? true :false
    },
  }
</script>