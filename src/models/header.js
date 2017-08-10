//标题栏model
import {routerRedux } from 'dva/router'
import {query} from '../services/headerServices.js'
import {config} from '../utils'
import {getCookie,setCookie} from '../utils/cookie'
export default {

  namespace: 'header',

  state: {
    current:'',
    isNavbar: document.body.clientWidth<769,
    menuPopoverVisible:false,
    user:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      //判断用户是否登录
      console.log('header')
      dispatch({type:'query'});
      let tid
      window.onresize=()=>{
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload},{call,put}){
      //const data2 = yield call(query);
      //console.log(data2)
      let data;
      if(window.sessionStorage){
        data =JSON.parse(window.sessionStorage.getItem('curuser'))
      }else{
        data = JSON.parse(getCookie('curuser'))
      }
      //console.log(data)
      if (data.status && data.user) {
        //console.log(true)
        yield put({
          type: 'querySuccess',
          payload: data.user,
        })
        let getFromReg = /^#\/(\w+)\?/i;
        const current =getFromReg.exec(location.hash)
        yield put({
          type: 'test',
          action:{key: current?current[1]:'home'},
        })
        //if (location.pathname === '/login') {
          //yield put(routerRedux.push('/home'))
        //}
      } else {
        //if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          //let from = location.pathname
          //window.location = `${location.origin}/#/login?from=${from}`
          //window.location = `${location.origin}`
        //}
      }
    },
    *logout ({payload,}, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },
    *changeNavbar ({payload,}, { put, select }) {
      const { header } = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      // console.log(header)
      if (isNavbar !== header.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    }
  },

  reducers: {
    querySuccess (state, { payload}) {
      return {
        ...state,
        user: payload ,
      }
    },
    test(state,{action}){
      const key = action.key;
      return {
        ...state,
        current:key,
      };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
    switchMenuPopover (state) {
      //console.log('switchMenuPopver')
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    }, 
    handleNavbar (state, { payload }) {
      // console.log('handleNavbar')
      return {
        ...state,
        isNavbar: payload,
      }
    },
  },
};
