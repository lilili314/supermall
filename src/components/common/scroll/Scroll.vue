<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // import ObserveDOM from '@better-scroll/observe-dom'
  // BScroll.use(ObserveDOM)

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true,
      })

      // 2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      // 1.封装scrollTo方法
      scrollTo(x, y, time = 300 ) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      // 2.封装refresh方法
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 3.封装finishPullUp方法
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // 4.封装getScrollY方法
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },

  }
</script>

<style scoped>

</style>
