import Vue from 'vue'
import Router from 'vue-router'
import MCC from '@/views/customerCategory/queryMcc'
import PAYTYPE from '@/views/payType/queryPayType'
import RULE_QUERY from '@/views/rule/queryRule'
import RULE_ADD from '@/views/rule/addRule'
import RULE_DETAIL_ADD from '@/views/rule/addDetailRule'

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
    ,{
      path: '/ruleQuery',
      name: 'ruleQuery',
      component: RULE_QUERY
    }
    ,{
      path: '/ruleAdd',
      name: 'ruleAdd',
      component: RULE_ADD
    }
    ,{
      path: '/ruleDetailAdd',
      name: 'ruleDetailAdd',
      component: RULE_DETAIL_ADD
    }
  ]
})
