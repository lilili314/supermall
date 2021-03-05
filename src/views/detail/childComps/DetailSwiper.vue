<template>
  <div class="swiper-list">
    <van-swipe :autoplay="4000" indicator-color="#ff0000" class="swiper">
      <van-swipe-item :key="index" v-for="(item, index) in topImages">
        <img :src="item" @load="swiperImageLoad" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: true
    };
  },
  methods: {
    swiperImageLoad() {
      if (this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style scoped>
.swiper-list /deep/ .van-swipe__indicator {
  width: 10px;
  height: 10px;
  opacity: 0.8;
  border-radius: 100%;
  background-color: white;
}

.swiper-list {
  overflow: hidden;
  width: 100%;
}

.swiper-list img {
  display: block;
  width: 100%;
}

.swiper {
  height: 300px;
}
</style>
