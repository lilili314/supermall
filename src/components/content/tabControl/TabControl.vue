<template>
  <div class="tab-control">
    <div class="tab-control-item" 
        v-for="(item, index) in titles" 
        :class="{active: index === currentIndex}" 
        @click="itemClick(index)"
        :key="item.id">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  },
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 3px;
}

.active {
  color: rgb(245, 137, 155);
}

.active span {
  border-bottom: 3px solid rgb(245, 137, 155);
}

</style>