import {HNCity} from '../utils/city'
import {query} from '../services/baseSituationServices.js'
export default {

  namespace: 'baseSituation',

  state: {
    loading:true,
    tree:{
      selectedKeys:[]
    },
    table1:{
      ds:{}  
    },
    table2:{
      ds:{}  
    },
    table3:{
      ds:{}
    },
    test:''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({
        type:'getDataByArea',
        payload:['河南省']
      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getDataByArea({payload},{call,put}){
      //payload保存点击的树节点信息
      yield put({
        type:'tree',
        payload:payload
      })
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
    tree(state,{payload}){
      return{
        ...state,
        tree:{
          selectedKeys:payload
        }
      }
    },
    table(state,{payload}){
      return{
        ...state,
        table1:{
          ds:payload.ds1,
        },
        table2:{
          ds:payload.ds2,
        },
        table3:{
          ds:payload.ds3,
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
    }
  },

};
