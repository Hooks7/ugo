<template>
  <div :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll"></search>
    <!-- 焦点图 -->
    <swiper
      class="banner"
      indicator-dots
      circular
      indicator-color="rgba(255, 255, 255, 0.6)"
      indicator-active-color="#fff"
    >
      <swiper-item v-for="item in Slideshow" :key="item.goods_id">
        <a href>
          <img :src="item.image_src" />
        </a>
      </swiper-item>
    </swiper>
    <!-- 导航条 -->
    <!-- 使用 navigator 跳转页面时，需要指定新页面打开的方式 -->
    <!-- 即通过 open-type 属性设置 -->
    <!-- 如果跳转的页面为 tabBar open-type 值只能为 switchTab -->
    <div class="navs">
      <a
        :href="item.navigator_url ||'/pages/list/main?query=' + item.name"
        :open-type="item.open_type || 'navigate'"
        v-for="(item,index) in pageSplit"
        :key="index"
      >
        <img :src="item.image_src" />
      </a>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="(item,index) in floor" :key="index">
        <div class="title">
          <img :src="item.floor_title.image_src" />
        </div>
        <div class="items">
          <a
            v-for="(e,key) in item.product_list"
            :key="key"
            :href="'/pages/list/main?query=' + e.name"
          >
            <img :src="e.image_src" />
          </a>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="top" @click="goTop" v-if="scrollTop>180"></div>
  </div>
</template>

<script>
import search from "@/components/search";
// 导入 mpvue.request 的 Promise 版本
import request from "@/utils/request";
export default {
  data() {
    return {
      pageHeight: "auto",
      // 轮播图
      Slideshow: [],
      // 首页分页
      pageSplit: [],
      // 楼层数据
      floor: [],
      // 回到顶部
      scrollTop: ""
    };
  },

  components: {
    search
  },

  methods: {
    disableScroll(ev) {
      this.pageHeight = ev.pageHeight + "px";
    },
    // 轮播图数据
    async getSlideshow() {
      const { message } = await request({
        url: "api/public/v1/home/swiperdata"
      });
      this.Slideshow = message;
    },

    // 首页分类
    async homepageSplit() {
      const { message } = await request({
        url: "api/public/v1/home/catitems"
      });
      this.pageSplit = message;
    },

    // 首页楼层数据
    async getFloor() {
      const { message } = await request({
        url: "api/public/v1/home/floordata"
      });
      this.floor = message;
    },
    // 回到顶部
    goTop() {
      // 通过 api 可以设置页面的滚动高度
      // 当滚动高度为 0 时，即为回到顶部
      mpvue.pageScrollTo({ scrollTop: 0 });
    }
  },

  mounted() {
    this.getSlideshow();
    this.homepageSplit();
    this.getFloor();
  },

  // 监听页面的滚动
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  // 用户下拉
  async onPullDownRefresh() {
    await this.getSlideshow();
    await this.homepageSplit();
    await this.getFloor();

    mpvue.stopPullDownRefresh();
  },
  // 转发触发回调
  onShareAppMessage() {
    return {
      title: "和我一起学习小程序",
      path: "/pages/index/main",
      imageUrl:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569672080944&di=4096b3b19485ca0fa468c9c9fac258ae&imgtype=0&src=http%3A%2F%2Fwww.999zx.cn%2Fadm_file%2Ffck%2Fimages%2F2018%2F4%2FImage%2F20184386447866.jpg"
    };
  }
};
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 340rpx;

  img {
    width: 100%;
    height: 340rpx;
  }
}

.navs {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 44rpx;

  img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floors {
  .title {
    width: 750rpx;
    height: 60rpx;
    padding-top: 20rpx;
    background-color: #f4f4f4;
  }

  .items {
    padding: 20rpx 16rpx;
    overflow: hidden;

    a {
      width: 232rpx;
      height: 188rpx;
      margin-right: 10rpx;
      margin-bottom: 10rpx;
      float: left;
    }

    a:nth-child(2n + 1) {
      margin-right: 0;
    }

    a:first-child {
      height: 386rpx;
      margin-right: 10rpx;
    }
  }
}
.top {
  background-color: rgb(255, 0, 55);
  border-radius: 50%;
  opacity: 0.3;
  width: 100rpx;
  height: 100rpx;
  position: fixed;
  right: 25rpx;
  bottom: 50rpx;
}
</style>
