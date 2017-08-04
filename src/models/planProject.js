//首页规划项目model
import {HNCity} from '../utils/city'
import {query} from '../services/planProjectServices.js'

export default {

  namespace: 'planProject',

  state: {
    loading:true,
   
    table1:{
      ds:{}  
    },
    table2:{
      ds:{}  
    },
    test:''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'getDataByArea'})
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getDataByArea({payload},{call,put}){
      
      //data为根据树节点查询到的数据
      yield put({type:'isLoading'})
      const data = yield call(query,payload);
      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:'table',
        payload:data
      })

    }
  },

  reducers: {
    
    table(state,{payload}){
      return{
        ...state,
        table1:{
          ds:payload.ds1,
        },
        table2:{
          ds:payload.ds2,
        },
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
