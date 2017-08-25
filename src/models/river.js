//查询信息 中小河流 MODEL
import {message} from 'antd'
import {query,update} from '../services/riverServices'

export default {

  namespace: 'river',

  state: {
    loading:true,
    tabs:'',
    huaiHeTable:{
      ds:[],
      fliter:'',
      originDs:[],
    },
    changJiangTable:{
      ds:[],
      fliter:'',
      originDs:[],
    },
    huangHeTable:{
      ds:[],
      fliter:'',
      originDs:[],
    },
    haiHeTable:{
      ds:[],
      fliter:'',
      originDs:[],
    },
    allTable:{
      ds:[],
      filter:'',
      originDs:[],
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
    },
    *update({payload},{call,put}){
      console.log(payload)
      const data = yield call(update,{...payload});
      console.log(data);
      if(data){
        yield put({
          type:'query'
        })
        yield put({
          type:'hideUpdateModal'
        })
        message.success('保存成功',3)
      }else{
        message.error('保存失败',3)
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
          filter:payload.filter,
            originDs:payload.ds,
        }
      }
    },
    changJiangTable(state,{payload}){
      return{
        ...state,
        changJiangTable:{
          ds:payload.ds,
          filter:payload.filter,
            originDs:payload.ds,
        }
      }
    },
    huangHeTable(state,{payload}){
      return{
        ...state,
        huangHeTable:{
          ds:payload.ds,
          filter:payload.filter,
            originDs:payload.ds,
        }
      }
    },
    haiHeTable(state,{payload}){
      return{
        ...state,
        haiHeTable:{
          ds:payload.ds,
          filter:payload.filter,
            originDs:payload.ds,
        }
      }
    },
    allTable(state,{payload}){
      return{
        ...state,
        allTable:{
          ds:payload.ds,
          filter:payload.filter,
            originDs:payload.ds,
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
    },
    browserQuery(state,{payload={tabs:'',filter:''}}){
      console.log(payload)
      const{tabs,filter,tree}=payload;
      const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}
      const targetTable =map[payload.tabs] 
      const targetOriginDs = state[map[payload.tabs]].originDs;
      console.log(targetOriginDs)
      const targetDs = []
      if(targetOriginDs.length>0){
          for(var i = 0;i<targetOriginDs.length;i++){
            var item = targetOriginDs[i];
            for(var key in item){
              if(item[key]){
                var a = item[key].toString();
                var b = a.indexOf(filter);
                var c = filter.indexOf(a);
                if(a.indexOf(filter)>-1||filter.indexOf(a)>-1){
                  find = true;
                  targetDs.push(item)
                  break;
                }
              }else{
                console.log(item)
              }
              
            }
            
          }
       
      }else{
        
      }
      console.log(payload)
      var newState =Object.assign({},state);
      newState[targetTable].ds = targetDs;
      newState[targetTable].filter = payload.filter;
      newState.tabs = payload.tabs;
      //newState.tree.selectedKeys= payload.tree;
      return{
          ...newState,
      }
    },
  },
  
}
