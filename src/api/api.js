import {
  IS_DEV
} from '../../config'
// import { root } from 'postcss';
let DVE_URL = 'http://10.10.129.93:8080/prom-web';
console.log(IS_DEV)
const API = {
  ROOT: DVE_URL,

  // MCC
  ADD_MCC: '/mcc/save',
  FIND_MCC: '/mcc/find',
  FIND_MCC_BY_ID: '/mcc/findById',

  // PAYTYPE
  ADD_PAYTYPE: '/payType/save',
  FIND_PAYTYPE: '/payType/find',
  FIND_PAYTYPE_BY_ID: '/payType/findById',

  //RULE
  ADD_RULE: '/toolRule/save',
  ADD_RULE_DETAIL: '/toolRuleDetail/save',
  FIND_RULE: '/toolRule/find',

  FIND_RULE_DETAIL: '/toolRuleDetail/find',
  FIND_RULE_DETAIL_BY_ID: '/toolRuleDetail/findById',

  IMG_UPLOAD: DVE_URL + '/file/imgUpload',
  QUERY_USER_LIST: '/user/login',

}

export default API
