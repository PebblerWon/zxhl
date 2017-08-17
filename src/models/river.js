//查询信息 中小河流 MODEL

import {query} from '../services/riverServices'

export default {

  namespace: 'river',

  state: {
    loading:true,
    tabs:'',
    huaiHeTable:{
      ds:[],
      fliter:''
    },
    changJiangTable:{
      ds:[],
      fliter:''
    },
    huangHeTable:{
      ds:[],
      fliter:''
    },
    haiHeTable:{
      ds:[],
      fliter:''
    },
    allTable:{
      ds:[],
      filter:''
    },
    detailModal:{
      item:{},
      visible:false,
    },
    deleteModal:{
      item:{},
      visible:false,
    },
    updateModal:{
      currentItem:{},
      visible:false,
    }
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
    *query({payload={tabs:'淮河流域',fliter:''}},{call,put}){
      const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}
      yield put({type:'isLoading'})
      
      yield put({
        type:'tabs',
        payload:payload.tabs
      })
      const data = yield call(query, {
        '查询字段':payload.fliter,
        '所属流域':payload.tabs
      })
      yield put({type:'notLoading'})

      if (data) {
        yield put({
          type: map[payload.tabs],
          payload: {
            ds:data,
            filter:payload.fliter
          },
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
    tabs(state,{payload}){
      return{
        ...state,
        tabs:payload
      }
    },
    huaiHeTable(state,{payload}){
      return{
        ...state,
        huaiHeTable:{
          ds:payload.ds,
          filter:payload.filter
        }
      }
    },
    changJiangTable(state,{payload}){
      return{
        ...state,
        changJiangTable:{
          ds:payload.ds,
          filter:payload.filter
        }
      }
    },
    huangHeTable(state,{payload}){
      return{
        ...state,
        huangHeTable:{
          ds:payload.ds,
          filter:payload.filter
        }
      }
    },
    haiHeTable(state,{payload}){
      return{
        ...state,
        haiHeTable:{
          ds:payload.ds,
          filter:payload.filter
        }
      }
    },
    allTable(state,{payload}){
      return{
        ...state,
        allTable:{
          ds:payload.ds,
          filter:payload.filter
        }
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
    },
    showDetailModal(state,{payload}){
      return{
        ...state,
        detailModal:{
          item:payload.item,
          visible:true
        }
      }
    },
    hideDetailModal(state){
      return{
        ...state,
        detailModal:{
          ...state.detailModal,
          visible:false
        }
      }
    },
    showDeleteModal(state,{payload}){
      return{
        ...state,
        deleteModal:{
          item:payload.item,
          visible:true
        }
      }
    },
    hideDeleteModal(state){
      return{
        ...state,
        deleteModal:{
          ...state.deleteModal,
          visible:false
        }
      }
    },
    showUpdateModal(state,{payload}){
      return{
        ...state,
        updateModal:{
          currentItem:payload.currentItem,
          visible:true,
        }
      }
    },
    hideUpdateModal(state){
       return{
        ...state,
        updateModal:{
          ...state.updateModal,
          visible:false,
        }
      }
    }
  },

}
