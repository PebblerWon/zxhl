import {query} from '../services/headerServices.js'
import {routerRedux } from 'dva/router'
import {config,queryURL} from '../utils'
import {getCookie,setCookie} from '../utils/cookie'
const {api} = config;
const {sign} = api
export default {

  namespace: 'login',

  state: {
    loginLoading: false,
    alert:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *query({ payload }, { call, put }) {  // eslint-disable-line
      
      yield put({ type: 'showLoginLoading' })
      const data = yield call(query,{
        userName:payload.userName,
        password:payload.password
      })
      
      if(data.status){
        if(window.sessionStorage){
          window.sessionStorage.setItem('curuser',JSON.stringify(data))
          window.sessionStorage.setItem('userInfo',JSON.stringify({
            userName:data.user['密码'],
            password:data.user['用户名']
          }))
        }else{
          setCookie({name:'curuser',value:JSON.stringify(data)})
          setCookie({name:'userInfo',value:JSON.stringify({
            userName:data.user['密码'],
            password:data.user['用户名']
          })})
        }
        
        yield put({type:'hideAlert'})
        //const from = queryURL('from')
        //if (from) {
          //yield put(routerRedux.push(from))
        //} else {
        yield put(routerRedux.push('/home'))
        //}
      }else{
        yield put({type:'showAlert'})
      }
      yield put({ type: 'hideLoginLoading' })
    },
  },

  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
    showAlert (state) {
      return {
        ...state,
        alert: true,
      }
    },
    hideAlert (state) {
      return {
        ...state,
        alert: false,
      }
    },
  },

};
