import {query} from '../services/projectServices'
import modelExtend from 'dva-model-extend'
import river from './river'

const project = modelExtend(river,{

  namespace: 'project',
  effects: {
    
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
    }
  },
})

export default project;