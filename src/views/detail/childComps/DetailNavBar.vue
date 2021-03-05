<template>
  <div>
    <nav-bar>
      <div slot="left" class="backHome" @click="backHomeClick">
        <img src="@/assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
            :class="{active: index === currentIndex}"
            @click="itemClick(index)"
            class="title-item"
            :key='index'>
            {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    backHomeClick() {
      this.$router.back(-1);
    }
  },
}
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1
  }
  .active {
    color: pink;
  }
  .backHome {
    margin-top: 7px;
  }
</style>