import Vue from 'vue'
import App from './App'
import router from './router'
import plugin from './common/Bus';
// 全局引入vant
import vant from "vant";
import "vant/lib/index.css";
// 全局引入懒加载
import { Lazyload } from "vant";

Vue.use(vant);
Vue.use(plugin);

Vue.config.productionTip = false

Vue.prototype.bus = new Vue()

// 使用懒加载
Vue.use(Lazyload, {
  // 未加载的占位图片
  loading: require("@/assets/img/common/placeholder.png")
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
