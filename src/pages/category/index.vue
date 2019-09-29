<template>
  <div>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="category">
      <!-- 顶级分类 -->
      <ul class="sup">
        <scroll-view scroll-y>
          <!-- <li class="active">大家电</li> -->
          <li v-for="item in classify" :key="item.cat_id" 
          :class="{active:currentIndex === index}"
          @click="getChildCagegories(index)"
          >{{item.cat_name}}</li>

        </scroll-view>
      </ul>
      <!-- 子级分类 -->
      <div class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="/static/uploads/category.png" class="thumb"></image>
          <div class="children" v-for="(item,index) in childCategories" :key="index">
            <div class="title">{{item.cat_name}}</div>
            <!-- 品牌 -->
            <div class="brands">
              <navigator :url="'/pages/list/main?query=' + e.cat_name" 
              v-for="(e,key) in item.children" :key="key">
                <image :src="e.cat_icon"></image>
                <span>{{e.cat_name}}</span>
              </navigator>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search';
  // 引入 mpvue.request 的 Promise 版本
import request from '../../utils/request';
export default {
    data() {
      return {
        // 分类数据
        classify: [],
        // 当前一级分类
        currentIndex: 0
      }
    },
    computed: {
     // 根据一级分类的索引值，获取相应的二级分类
     childCategories(){
       return this.classify.length && this.classify[this.currentIndex].children
     }
    },

    components: {
      search
    },
  methods:{

  async getClassify(){

    // 分类接口
    const {message} = await request({
      url:'api/public/v1/categories'
    })

    this.classify = message
    },
          // 根据一级分类的索引值，获取相应的二级分类
    getChildCagegories(index){
      this.currentIndex = index
    }
    
  },

  mounted() {
  this.getClassify()
},
}
</script>


<style scoped lang="less">

  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      li {
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        span {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>

