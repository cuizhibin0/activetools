// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import N3 from 'N3-components'
import 'N3-components/dist/index.min.css'
import App from './App'
import router from './router'
import axios from './utils/axios'
import layer from 'vue-layer'
import 'babel-polyfill'


Vue.config.productionTip = false

Vue.prototype.$layer = layer(Vue, {
  msgtime: 1
});

Vue.use(N3)
Vue.use(axios)
// Vue.use(Assign)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
