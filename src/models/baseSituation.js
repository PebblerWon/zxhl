import {HNCity} from '../utils/city'
import {query} from '../services/baseSituationServices.js'
export default {

  namespace: 'baseSituation',

  state: {
    loading:true,
    table1:{
      ds:{}  
    },
    table2:{
      ds:{}  
    },
    table3:{
      ds:{},
      tree:{
        selectedKeys:[]
      },
    },
    test:''
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     
      dispatch({type:'fetchAllTable'})
      
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *fetchAllTable({payload},{call,put}){
      yield put({type:'isLoading'})
      //const data = yield call(query,{table:`all`});
      const data1 = yield call(query,{table:`table1`});
      const data2 = yield call(query,{table:`table2`});
      const data3 = yield call(query,{table:`table3`,payload:['河南省']});
      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:'table',
        payload:{
          ds1:data1,
          ds2:data2,
          ds3:data3,
          selectedKeys:['河南省']
        }
      })
    },
    *fetchTable1({payload},{call,put}){
      yield put({type:'isLoading'})
      const data = yield call(query,{table:`table1`});
      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:'table1',
        payload:data,
      })
    },
    *fetchTable2({payload},{call,put}){
      yield put({type:'isLoading'})
      const data = yield call(query,{table:`table2`});
      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:'table2',
        payload:data,
      })
    },
    *fetchTable3({payload},{call,put}){
      //payload保存点击的树节点信息
      yield put({type:'isLoading'})
      const data = yield call(query,{table:`table3`,payload:payload});
      yield put({type:'notLoading'})
      //console.log(data);
      yield put({
        type:'table3',
        payload:{
          ds:data,
          tree:{
            selectedKeys:payload
          }
        }
      })

    }
  },

  reducers: {
    tree(state,{payload}){
      return{
        ...state,
        table3:{
          ...state.table3,
          tree:{
             selectedKeys:payload
          }
        }
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
        table3:payload
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
