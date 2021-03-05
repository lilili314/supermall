<template>
  <div>
    <swiper v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
    </swiper>
  </div>
</template>

<script>
import swiper from '@/components/common/swiper/Swiper'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default: {
        return: []
      }
    }
  },
  components: {
    swiper
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoad', true);
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>