import Vue from 'vue'
import Router from 'vue-router'
import MCC from '@/views/customerCategory/queryMcc'
import PAYTYPE from '@/views/payType/queryPayType'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mcc',
      name: 'mcc',
      component: MCC
    }
    ,{
      path: '/payType',
      name: 'payType',
      component: PAYTYPE
    }
  ]
})
