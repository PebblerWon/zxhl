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
    showModal(state,{payload}){
      return{
        ...state,
        ...payload,
        modalVisible:true,
      }
    },
    hideModal(state){
      return {
        ...state,
        modalVisible:false
      }
    },
  },

})
