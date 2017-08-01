import {query} from '../services/riverServices'

export default {

  namespace: 'river',

  state: {
    loading:true,
    tree:[],
    tabs:'',
    data:[],
  },
  //获取河流数据
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'query'})
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload={tree:['河南省'],tabs:'淮河流域'}},{call,put}){
      yield put({type:'isLoading'})
      yield put({
        type:'tree',
        payload:payload.tree
      })
      yield put({
        type:'tabs',
        payload:payload.tabs
      })
      const data = yield call(query, {
        '行政区':payload.tree,
        '所在流域':payload.tabs
      })
      if (data) {
        yield put({type:'notLoading'})
        yield put({
          type: 'data',
          payload: data,
        })
      }
    },
    *deleteItem({payload},{call,put}){
      if(payload){
        const res = yield call(deleteItem,{...payload})
        if(res){
          
        }
      }
    }
  },

  reducers: {
    tree(state,{payload}){
      return{
        ...state,
        tree:payload,
      }
    },
    tabs(state,{payload}){
      return{
        ...state,
        tabs:payload
      }
    },
    data(state,{payload}){
      return{
        ...state,
        data:payload
      }
    },
    isLoading(state){
      return{
        ...state,
        loading:true
      }
    },
    notLoading(state){
      return{
        ...state,
        loading:false
      }
    }
  },

}
