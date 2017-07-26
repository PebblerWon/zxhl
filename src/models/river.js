import modelExtend from 'dva-model-extend'
import {pageModel} from './common'
import {query} from '../services/river'

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
          },
          {
            description:"预览并提交",
            title:"未填写"
          }
        ],
      }
    }
  },
  //获取河流数据
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      //console.log(query)
      /*dispatch({
        type:'query',
        payload:{}
      })*/
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload={}},{call,put}){
      console.log(payload)
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    }
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
    },
  },

})
