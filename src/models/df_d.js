/*InfoStastic>ZhongXiaoHeLiu>Table1的model*/
//这个表和首页的表一样，所以请求的地址是一样的
import {query} from '../services/baseSituationServices.js'
export default {

  namespace: 'df_d',

  state: {
    loading:true,
    ds:{},
    test:''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     
      dispatch({type:'fetchTable1'})
      
    },

  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    
    *fetchTable1({payload},{call,put}){
      yield put({type:'isLoading'})
      const data = yield call(query,{table:`table2`});

      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:'table',
        payload:data,
      })
    },
    *export({payload},{call,put}){
      
    }
  },

  reducers: {
    table(state,{payload}){
      return {
        ...state,
        ds:payload
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
    }
  },

};
