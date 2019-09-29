
<template>
  <div>
    <!-- 筛选 -->
    <div class="filter">
      <span class="active">综合</span>
      <span>销量</span>
      <span>价格</span>
    </div>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y @scrolltolower="getMoreGoods">
      <div class="item" v-for="item in productlist" :key="item.goods_id"
      @click="goDetail(item.goods_id)">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <div class="meta">
          <p class="name">{{item.goods_name}}</p>
          <p class="price" v-if="item.goods_price"><span>￥</span>{{item.goods_price}}<span>.00</span></p>
          <p class="price" v-else>售空</p>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<style scoped lang="less">

  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    span {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

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
  }

</style>

<script>
  import request from '@/utils/request'
  export default {
    data() {
      return {
        // 商品列表
        productlist :[],
        // 页数索引
        pagenum:1,
        // 每页长度
        pageSize:5,
        // 列表长度
        total: 1
      }
    },
    methods: {
      // 跳转
      goDetail(id){
        mpvue.navigateTo({
           url: '/pages/goods/main?id=' + id
        })
      },

        // 下拉滚动
      getMoreGoods(){

        // 页数加1
          this.pagenum ++

        // 重新获取数据
        this.getProductlist(this.query)
      },

      // 商品列表数据
      async getProductlist(data){

        if(this.total == this.productlist.length) return;

        // 分页参数
        data.pagenum = this.pagenum
        data.pagesize = this.pageSize

        const { message } = await request({
            url:'api/public/v1/goods/search',
            data
        })
        // 数组合并
        this.productlist = this.productlist.concat(message.goods)

        // 记录列表长度
        this.total = message.total

      },
  



    },
    onLoad( query){
      // 将获得到的地址参数记录下来
      this.query = query

      this.getProductlist(query)
    },

  }
</script>