<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import { getDetaildata } from '@/network/detail.js'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求数据
    getDetaildata(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages;
    }) 
  }
}
</script>

<style>

</style>