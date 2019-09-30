<template>
  <div class="wrapper">
    <block v-if="productData">
    <!-- 商品图片 -->
    <swiper class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff" circular>
      <swiper-item v-for="item in productData.pics" :key="item.pics_id">
        <image :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <div class="meta">
      <p class="price">￥{{productData.goods_price}}</p>
      <p class="name">{{productData.goods_name}}</p>
      <p class="shipment">快递: 免运费</p>
      <span class="collect">收藏</span>
    </div>
    <!-- 商品详情 -->
    <div class="detail">
      <div v-html="productData.goods_introduce"></div>
    </div>
    <!-- 操作 -->
    <div class="action">
      <button open-type="contact">联系客服</button>
      <span class="cart" @click="goCart">购物车</span>
      <span class="add" @click="addCart">加入购物车</span>
      <span class="buy">立即购买</span>
    </div>
    </block>
  </div>
</template>

<style scoped lang="less">

  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 720rpx;
  }
  
  .meta {
    height: 270rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 30rpx;
    }

    .name {
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;

      overflow: hidden;
      text-overflow: ellipsis;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      padding-top: 50rpx;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 22rpx;
      color: #999;

      position: absolute;
      right: 20rpx;
      top: 91rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;

    span {
      display: block;
    }

    .add, .buy {
      width: 210rpx;
      text-align: center;
      line-height: 98rpx;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      line-height: 1;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
      padding-top: 56rpx;                         
    }
  }

</style>

<script>
import sleep from '@/utils/sleep'
import request from '@/utils/request'
  export default {
    data() {
      return {
        // 商品列表数据
        productData :null,
        // 购物车数据
        carts: []
      }
    },
    methods: {
    async  addCart(){
     // 标准的购物车需要检测用户是否登录

        // 1. 如果登录将用户id和商品id等信息发送到后端接口
        // 2. 如果未登录
        //    a) 弹窗指引用户先登录，从上述 1 继续操作
        //    b) 将购物车数据存入本地，当用户后期登录后，
        //       从上述 1 继续操作

        // 本次课中简化了购物车步骤，一律将购物车信息
        // 记录在本地，且不区分用户，目的是练习小程序 api
        // 的使用!!!!!!!!!!!!

        // 解析数据
       let {goods_id, goods_name, goods_small_logo, goods_price} = this.productData;

        // 判断购物车中是否已包含当前商品
        // 若包含则将数量加1，否则追加新记录
        // 标识购物车中是否有某商品
        let flag = false

        this.carts.forEach((e)=>{
          if(e.goods_id == goods_id){
            // 购物车包含当前商品
            e.goods_number++;
            flag = true
          }
        })
        
      // 在购物车没有找到某商品
        if(!flag){
          this.carts.push({
            goods_id,
            goods_name,
            goods_small_logo,
            goods_price,
            goods_number: 1,
            goods_checked: true
        })
        }
        // 存储本地
        mpvue.setStorageSync('carts', this.carts)

        // 提示用户成功
        mpvue.showToast({
          title:'加入成功'
        })

        // 延迟两秒
       await  sleep(2)

        mpvue.switchTab({
          url: '/pages/cart/main'
        })


      },

      // 获得列表数据
     async commodityDetails(id){
        const {message} = await request({
          url:'api/public/v1/goods/detail',
          data:{goods_id:id}
        })

        this.productData = message
      },

      // 跳转购物车
      goCart(){
        // 切换到 tabBar 中的页面，需要
        // 使用 switchTab
        mpvue.switchTab({
          url:'/pages/cart/main'
        })
      }
    },
    onLoad(query) {

      this.commodityDetails(query.id)

        // 将购物车中的数据，读出来，以保证数据正常追加
      this.carts = mpvue.getStorageSync('carts') || [];
    },
  }
</script>