import {
  IS_DEV
} from '../../config'
// import { root } from 'postcss';
let DVE_URL = 'http://localhost:8082';
console.log(IS_DEV)
const API = {
  ROOT: DVE_URL,
  // 以下四个地址是mock地址
  // ROOT: '/api',
  // USER_ADD: '/user/add',
  // RECORD_LIST: '/user/getRecords',
  // QUERY_LIST: '/user/getRecordsBy',

  // ====================正式的地址
  
  USER_LOGIN: '/user/login',
  // 银行卡
  ADD_BANK: '/toolsBank/save',
  FIND_BANK: '/toolsBank/find',
  FIND_BANK_BY_ID: '/toolsBank/findById',

  // MCC
  ADD_MCC: '/mcc/save',
  FIND_MCC: '/mcc/find',
  FIND_MCC_BY_ID: '/mcc/findById',

  IMG_UPLOAD: DVE_URL + '/file/imgUpload',
  QUERY_USER_LIST: '/user/login',

}

export default API
