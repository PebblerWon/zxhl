//查询信息 规划项目MODEL，更新为灾后薄弱环节
import {message} from 'antd'
import {query,remove,update,newProject} from '../services/projectServices'
import riverServices from '../services/riverServices'
import {config } from '../utils'

const { api,PROJECTTYPE } = config
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const TYPE = PROJECTTYPE.ZaiHouProjectType

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
      submitSpin:false,
    },
    detailModal:{
      visible:false,
    },
    newProjectModal:{
      visible:false,
      submitSuccess:{},
      submitSpin:false,
    },
    riverInfo:[],//保存表单填写过程中用到的所有河流列表信息
    deleteItem:null,
    needRefresh:false,
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
    *query({payload={tabs:'淮河流域',filter:'',tree:['河南省'],type:TYPE}},{call,put}){
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
        console.log(payload)
        yield put({type:'isLoading'})
        const res = yield call(remove,{
          id:payload.id,
          '项目类型':TYPE,
        })
        if(res){
          message.success('删除成功')
        }else{
          message.error('删除失败')
        }
        yield put({type:'needRefresh'})
        yield put({type:'notLoading'})
    },
    *updateProject({payload},{call,put}){
      yield put({type:'showUpdateModalSubmitSpin'})
      yield call(delay,500)
      let data = payload;
      data['所在市'] = payload['市行政区'][0]
      data['所在县'] = payload['市行政区'][1]
      data['所属流域']  = payload['流域河流'][0]
      data['所在河流']  = payload['流域河流'][1]
      delete payload['市行政区']
      const res = yield call(update,{
        '项目类型':TYPE,
        data:data
      })
      if(res=='true'){
        message.success("修改成功",3)
        yield put({type:'hideUpdateModal'})
        yield put({type:'needRefresh'})
      }else{
        message.error("修改失败",3)
      }
      yield put({type:'hideUpdateModalSubmitSpin'})
    },
    *getRiverInfo({payload},{call,put}){
      const data = yield call(riverServices.query,{'所属流域':'全部'})
      console.log(data)
      let rivers=[
        {value: '淮河流域',label: '淮河流域',children:[]},
        {value: '黄河流域',label: '黄河流域',children:[]},
        {value: '长江流域',label: '长江流域',children:[]},
        {value: '海河流域',label: '海河流域',children:[]},
      ];
      data.forEach((item)=>{
        let riverName = item['河流名称']
        let liuYu = item['所属流域']
        rivers.forEach(item=>{
          if(item.value == liuYu){
            var notHas = item.children.every(item=>{
              return(item.value!=riverName)
            })

            if(notHas){
              item.children.push({
                'value':riverName,
                'label':riverName
              })
            }
          }
        })
        
      })
      //const riverNames = data.map((item)=>item['河流名称'])
      yield put({type:'riverInfo',payload:rivers})
    },
    *newProjectSubmit({payload},{call,put}){
      console.log('submit from model')
      console.log(payload)
      yield put({type:'showNewModalSubmitSpin'})
      yield call(delay,500)
      let {formData,values} = payload
      for(let key in values){
        if(key=='市行政区'){
          formData.append('所在市',values['市行政区']?values['市行政区'][0]:"")
          formData.append('所在县',values['市行政区']?values['市行政区'][1]:"")
        }else if (key=='流域河流'){
          formData.append('所属流域',values['流域河流']?values['流域河流'][0]:"")
          formData.append('所在河流',values['流域河流']?values['流域河流'][1]:"")
        }else if(key=="开工时间"||key=="治理年度"||key=="竣工时间"){
            let a = new Date(values[key])
            if(a.toString()!="Invalid Date"){
              formData.append(key,a.format("yyyy/MM/dd"))
            }else{
              formData.append(key,values[key])
            }
        }else{
          formData.append(key,values[key])
        }
      }
      formData.append("项目类型","灾后水利薄弱环节项目")
      const a = yield call(newProject,{
        '项目类型':TYPE,
        data:formData
      })
      //const a = 'true'
      console.log(a)
      if(a=='true'){
        message.success("修改成功",3)
        yield put({type:'hideNewModal'})
        yield put({type:'needRefresh'})
      }else{
        message.error("修改失败",3)
        //yield put({type:'hideNewModal'})
      }
      yield put({type:'hideNewModalSubmitSpin'})
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
          ...state.detailModal,
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
    showUpdateModal(state,{payload}){
      return{
        ...state,
        updateModal:{
          ...state.updateModal,
          visible:true,
          currentItem:payload.currentItem
        }
      }
    },
    hideUpdateModal(state){
      return{
        ...state,
        updateModal:{
          ...state.updateModal,
          visible:false,
          currentItem:null,
        }
      }
    },
    showNewModal(state){
      return{
        ...state,
        newProjectModal:{
          ...state.newProjectModal,
          visible:true
        }
      }
    },
    hideNewModal(state){
      return{
        ...state,
        newProjectModal:{
          ...state.newProjectModal,
          visible:false
        }
      }
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
                    //if(a.indexOf(filter)>-1||filter.indexOf(a)>-1){
                    if(a.indexOf(filter)>-1){
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
                //if(a.indexOf(filter)>-1||filter.indexOf(a)>-1){
                if(a.indexOf(filter)>-1){
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
      //newState.tree.selectedKeys= payload.tree;
      return{
          ...newState,
      }
    },
    riverInfo(state,{payload}){
      return{
        ...state,
        riverInfo:payload
      }
    },
    showUpdateModalSubmitSpin(state){
      return{
        ...state,
        updateModal:{
          ...state.updateModal,
          submitSpin:true,
        }
      }
    },
    hideUpdateModalSubmitSpin(state){
      return{
        ...state,
        updateModal:{
          ...state.updateModal,
          submitSpin:false,
        }
      }
    },
    showNewModalSubmitSpin(state){
      return{
        ...state,
        newProjectModal:{
          ...state.newProjectModal,
          submitSpin:true,
        }
      }
    },
    hideNewModalSubmitSpin(state){
      return{
        ...state,
        newProjectModal:{
          ...state.newProjectModal,
          submitSpin:false,
        }
      }
    },
    needRefresh(state){
      return {
        ...state,
        needRefresh:true
      }
    },
    notNeedRefresh(state){
      return{
        ...state,
        needRefresh:false
      }
    }
  },

}
