import Vue from 'vue'
import Router from 'vue-router'
import MCC from '@/views/customerCategory/queryMcc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: MCC
    }
  ]
})
