//汇总信息十二五项目

import download from '../utils/download'
import {query,exportExcel} from '../services/huiZongServices.js'
export default {

  namespace: 'huizongshierwu',

  state: {
    loading:true,
    tabs:'',
    table1:{
      ds:[]  
    },
    table2:{
      ds:[]  
    },
    table3:{
      ds:[],
    },
    test:'',
    table1ExcelUrl:'',
    table2ExcelUrl:'',
    table3ExcelUrl:''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     
      dispatch({type:'query'})
      
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload={tabs:'按政区汇总',fliter:''}},{call,put}){
      const map={'按政区汇总':'table1','按河流汇总':'table2','按主要工程措施':'table3'}
      yield put({type:'isLoading'})
      yield put({
        type:'tabs',
        payload:payload.tabs
      })
      const data = yield call(query,{table:map[payload.tabs],type:'十二五项目'});
      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:map[payload.tabs],
        payload:data,
      })
    },
    *exportExcel({payload},{call,put}){
      yield put({type:'isLoading'})
      const data = yield call(exportExcel,{table:payload,type:'十二五项目'});
      //yield call(exportExcel,{table:payload});
      console.log(data);
      yield put({type:'notLoading'})
      if(payload=='table1'){
        yield put ({type:'table1ExcelUrl',payload:data})
      }else if(payload=='table2'){
        yield put({type:'table2ExcelUrl',payload:data})
      }
      yield put({type:'downLoadExcel',payload:data})
    }
  },

  reducers: {
    tabs(state,{payload}){
      return{
        ...state,
        tabs:payload
      }
    },
    table(state,{payload}){
      return {
        ...state,
        table1:{ds:payload.ds1},
        table2:{ds:payload.ds2},
        table3:{ds:payload.ds3,tree:{selectedKeys:payload.selectedKeys}},
      }
    },
    table1(state,{payload}){
      return{
        ...state,
        table1:{
          ds:payload,
        },
      }
    },
    table2(state,{payload}){
      return{
        ...state,
        table2:{
          ds:payload,
        }
      }
    },
    table3(state,{payload}){
      return{
        ...state,
        table3:{
          ds:payload,
        }
      }
    },
    test(state, {payload}) {
      return { 
        ...state, 
        test:payload
      };
    },
    isLoading(state){
      return {
        ...state,
        loading:true,
      }
    },
    notLoading(state){
      return {
        ...state,
        loading:false,
      }
    },
    table1ExcelUrl(state,{payload}){
      return {
        ...state,
        table1ExcelUrl:payload
      }
    },
    table2ExcelUrl(state,{payload}){
      return {
        ...state,
        table2ExcelUrl:payload
      }
    },
    downLoadExcel(state,{payload}){
      download(payload);
      return{
        ...state
      }
    }
  },

};
