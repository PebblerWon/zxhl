//查询信息 规划项目MODEL
import {message} from 'antd'
import {query,remove} from '../services/projectServices'

export default {

  namespace: 'project',

  state: {
    loading:true,
    tabs:'',
    tree:{
        selectedKeys:[]
    },
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
    updateModal:{
      visible:false,
      currentItem:null,
    },
    detailModal:{
      visible:false,
    },
    newProjectModal:{
      visible:false,
    },
    deleteItem:null
  },
  //获取项目数据
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'query'})
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload={tabs:'淮河流域',fliter:'',tree:['河南省']}},{call,put}){
      const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}
      yield put({type:'isLoading'})
      
      yield put({type:'tabs',payload:payload.tabs})
      yield put({type:'tree',payload:payload.tree})
      const data = yield call(query, {
        '查询字段':payload.fliter,
        '所属流域':payload.tabs,
        '所属地市':payload.tree[0],
        '项目类型':payload.type
      })
      yield put({type:'notLoading'})

      if (data) {
        yield put({
          type: map[payload.tabs],
          payload: {
            ds:data,
            filter:payload.fliter,
          },
        })
      }
    },
    *remove({payload},{call,put}){
        const res = yield call(remove,{...payload})
        console.log(message)
        if(res){
          message.success('删除成功')
        }else{
          message.error('删除失败')
        }
        window.deleteModalRef.destroy()
    },
    *updateProject({payload},{call,put}){
      console.log('model project')
      console.log(payload)

      yield put({type:'hideUpdateModal'})
    }
  },

  reducers: {
    tabs(state,{payload}){
      return{
        ...state,
        tabs:payload
      }
    },
    tree(state,{payload}){
      return{
        ...state,
        tree:{
          selectedKeys:payload
        }
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
    showDetailModal(state){
      return{
        ...state,
        detailModal:{
          visible:true
        }
      }
    },
    hideDetailModal(state){
      return{
        ...state,
        detailModal:{
          visible:false
        }
      }
    },
    showUpdateModal(state,{payload}){
      return{
        ...state,
        updateModal:{
          visible:true,
          currentItem:payload.currentItem
        }
      }
    },
    hideUpdateModal(state){
      return{
        ...state,
        updateModal:{
          visible:false,
          currentItem:null,
        }
      }
    },
    showNewModal(state){
      return{
        ...state,
        newProjectModal:{
          visible:true
        }
      }
    },
    hideNewModal(state){
      return{
        ...state,
        newProjectModal:{
          visible:false
        }
      }
    },
    newProjectSubmit(state){
      return{
        ...state,
        newProjectModal:{
          visible:false
        }
      }
    },
    updateProject(state){
      return{...state}
    },
    setDeleteItem(state,{payload}){
      return{
        ...state,
        deleteItem:payload
      }
    },
    clearDeleteItem(state){
      console.log('重置删除项成功！')
      return{
        ...state,
        deleteItem:null
      }
    }
  },

}
