import modelExtend from 'dva-model-extend'
import {pageModel} from './common'

export default  modelExtend(pageModel,{

  namespace: 'river',

  state: {
    currentItem:{},
    modalVisible:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    showDetailModal(state,{payload}){
      return{
        ...state,
        ...payload,
        modalVisible:true,
      }
    },
    hideDetailModal(state){
      return {
        ...state,
        modalVisible:false
      }
    }
  },

})
