import modelExtend from 'dva-model-extend'
import {pageModel} from './common'

export default  modelExtend(pageModel,{

  namespace: 'river',

  state: {
    currentItem:{},
    modalVisible:false,
    riverInput:{
      currentForm:0,
      stepState:{
        current:0,
        items:[
          {
            description:"河流基本信息",
            title:"填写中"
          },
          {
            description:"编辑河流位置",
            title:"未填写"
          }
        ],
      }
    }
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
    },
    changeInputForm(state,{payload}){
      console.log('changeForm')
      console.log(state)
      console.log(payload)
      return{
        ...state,
        riverInput:{
          ...payload
        }
      }
    }
  },

})
