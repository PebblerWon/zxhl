//查询信息 规划项目MODEL，更新为灾后薄弱环节
import {message} from 'antd'
import {query,remove} from '../services/projectServices'
import riverServices from '../services/riverServices'

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
    updateModal:{
      visible:false,
      currentItem:null,
    },
    detailModal:{
      visible:false,
    },
    newProjectModal:{
      visible:false,
      submitSuccess:{},
    },
    riverInfo:[],//保存表单填写过程中用到的所有河流列表信息
    deleteItem:null
  },
  //获取项目数据
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'query'})
      dispatch({type:'getRiverInfo'})
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *query({payload={tabs:'淮河流域',filter:'',tree:['河南省'],type:'灾后薄弱环节'}},{call,put}){
      const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}
      yield put({type:'isLoading'})
      
      yield put({type:'tabs',payload:payload.tabs})
      yield put({type:'tree',payload:payload.tree})
      const data = yield call(query, {
        '查询字段':payload.filter,
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
            filter:payload.filter,
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
    },
    *getRiverInfo({payload},{call,put}){
      const data = yield call(riverServices.query,{'所属流域':'全部'})
      const riverNames = data.map((item)=>item['河流名称'])
      yield put({type:'riverInfo',payload:riverNames})
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
    },
    browserQuery(state,{payload={tabs:'',filter:'',tree:['河南省']}}){
      const{tabs,filter,tree}=payload;
      const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}
      const targetTable =map[payload.tabs] 
      const targetOriginDs = state[map[payload.tabs]].originDs;
      const targetDs = []
      if(targetOriginDs.length>0){
        if(payload.tree[0]!='河南省'){
            for(var i = 0;i<targetOriginDs.length;i++){
              var item = targetOriginDs[i];
              var a = item['所在市'].toString();
              var b = a.indexOf(tree[0])
              var c = tree[0].indexOf(a)
              if(item['所在市'].indexOf(tree[0])>-1||tree[0].indexOf(item['所在市'])>-1){

                for(var key in item){
                  if(item[key]){
                    var a = item[key].toString();
                    var b = a.indexOf(filter);
                    var c = filter.indexOf(a);
                    if(a.indexOf(filter)>-1||filter.indexOf(a)>-1){
                      targetDs.push(item)
                      break;
                    }
                  }
                  
                }
              }
            }
        }else{
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
              }
              
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
      newState.tree.selectedKeys= payload.tree;
      return{
          ...newState,
      }
    },
    riverInfo(state,{payload}){
      return{
        ...state,
        riverInfo:payload
      }
    }
  },

}
