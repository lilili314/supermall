<template>
  <div id="home">

    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <scroll class="contents"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" />
      <goods-list :goods="GoodsShow" @itemImgLoad="itemImgLoad" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
// components
import NavBar from '@/components/common/navBar/navBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backTop/BackTop'
import Scroll from '@/components/common/scroll/Scroll'

//
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata, getHomeGoods} from '@/network/home'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
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
      isShowBackTop: false
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

  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
       }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 590
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    itemImgLoad() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    //   this.$refs.$on('itemImgLoad', () => {
    //     this.$refs.scroll.refrsh()
    //   })
    },

    // debounce 防抖函数
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if(timer) clearTimeout('timer');
        timer = setTimeout(() => {
          func.apply(this.args)
        }, delay);
      }
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
      getHomeGoods('pop', page).then(res => {
        // console.log(res);
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
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;

    background-color: rgb(250, 150, 167);
    color: #fff;
  }

  /* .tab-control {
    top: 44px;
    z-index: 9;
  } */

  .contents {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

</style>
