<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <tab-control class="tab-control"
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
            ref="tabControl1"
            v-show="isTabFixed" />
    <scroll class="contents"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- <home-swiper :banners="banners"
                  @swiperImageLoad="swiperImageLoad" />  -->
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
            ref="tabControl2" />
      <goods-list :goods="GoodsShow" />
    </scroll>

    <back-top @click.native="backClick" 
            v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
// components
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backTop/BackTop'
import Scroll from '@/components/common/scroll/Scroll'

//
// import HomeSwiper from './childComps/HomeSwiper'
import Swiper from "@/components/common/swiper/Swiper";
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import { getHomeMultidata, getHomeGoods } from '@/network/home'
import { debounce } from '@/common/utils'

export default {
  name: "Home",
  components: {
    NavBar,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    Swiper
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    GoodsShow() {
      return this.goods[this.currentType].list
    }
  },

  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  // mounted() {
  //   const refresh = debounce(this.$refs.scroll.refresh, 50)
  //   this.bus.$on('itemImageLoad', () => {
  //     refresh();
  //   })
  //   console.log(refresh);
  // },
  destroyed() {
    console.log('1');
    this.bus.$off('itemImageLoad')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 刷新scroll
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
       }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 590;
      // console.log(this.isShowBackTop);
      // 2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 调用scroll里面的finishPullUp方法
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
</script>

<style>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    /* position: fixed;
    top: 0;
    right: 0;
    left: 0; */
    z-index: 9;

    background-color: rgb(250, 150, 167);
    color: #fff;
  }

  .contents {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
