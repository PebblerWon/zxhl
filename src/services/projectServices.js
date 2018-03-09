//数据中心（查询信息）规划项目、十二五项目
import * as esriLoader from 'esri-loader'
import qs from 'qs'
import { request, config } from '../utils'
import { HNCity } from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
import request2 from '../utils/request2'

const { api } = config
const { dataCenter } = api
//const { useFakeData } = config;
const useFakeData = false;


export async function query(params) {
  console.log(params)
  /* params= {
         '查询字段':'',
         '所属流域':'',
         '所属地市':'',
         '项目类型':''
   }*/
  let resData;
  const fakeData1 = [];
  for (let i = 0; i < 20; i++) {
    fakeData1.push({
      key: i,
      '项目名称': `伊源河新南至汤营段河道治理工程${i}`,
      '所在市': `洛阳`,
      '所在县': '栾川',
      '所属流域': `黄河`,
      '所在河流': '伊源河',
    });
  }
  if(params['所属流域']=='全部'){
    if(params['项目类型']=='十二五项目'){
      resData = await request(`${dataCenter.shiErWuproject}?${qs.stringify({'proType':params['项目类型'],'basin':'','city':params['所属地市']})}`)
      //resData = fakeData1
    }else if(params['项目类型']=='灾后薄弱环节'){
      resData = await request(`${dataCenter.shiErWuproject}?${qs.stringify({'proType':params['项目类型'],'basin':'','city':params['所属地市']})}`)
    }
  }else{
    if(params['项目类型']=='十二五项目'){
      resData = await request(`${dataCenter.shiErWuproject}?${qs.stringify({'proType':params['项目类型'],'basin':params['所属流域'],'city':params['所属地市']})}`)
      //resData = fakeData1
    }else if(params['项目类型']=='灾后薄弱环节'){
      resData = await request(`${dataCenter.shiErWuproject}?${qs.stringify({'proType':params['项目类型'],'basin':params['所属流域'],'city':params['所属地市']})}`)
    }
  }
  
  //console.log(resData)
  return resData;
}


export async function update(params) {
  let data = JSON.stringify(params)
  return await request2(`${dataCenter.updateZaiHou}`,{
    method:'POST',
    data:{
      json:data
    }
  })
}
export async function remove(params) {
  console.log(params)
  let deleteFeature,deleteData;
  const esri = await loadEsri();
  if(esri){
    //删除要素
    console.log('删除要素...')
    deleteFeature = await removeFeature(3)
    console.log('要素删除成功...')
    if(deleteFeature){
      //发送从数据库删除记录的请求
      console.log('从数据库删除记录...')
      deleteData = await fakeRequest({},true)
      console.log('从数据库删除记录成功')
      if(deleteFeature&&deleteData){
        return true
      }else{
        return false
      }
    }
  }else{
    return false
  }
}

function loadEsri() {
  return new Promise((resolve, reject) => {
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      }, {
        // use a specific version instead of latest 4.x
        url: 'https://js.arcgis.com/3.21/'
      });
    } else {
      resolve(true)
    }
  })
}

function removeFeature(id) {
  return new Promise(function(resolve, reject) {
    esriLoader.dojoRequire(
      [
        "esri/map",
        "esri/toolbars/edit",

        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/tasks/query"
      ],
      (
        Map, Edit,
        ArcGISDynamicMapServiceLayer, FeatureLayer,
        Query
      ) => {
        let featureLayer1 = new FeatureLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/FeatureServer/30", {
          mode: FeatureLayer.MODE_SNAPSHOT,
          //definitionExpression:`id=${this.state.deleteId}`
        });
        let query = new Query();
        query.outFields = ["*"];
        query.where = `id=${id}`;
        //Query for the features with the given object ID
        featureLayer1.queryFeatures(query, function(featureSet) {
          console.log(featureSet)
          featureLayer1.applyEdits(null, null, featureSet.features, (suc) => {
            resolve(true)
          }, (err) => {
            resolve(false)
          });
        });
      }
    )
  });
}
const projectServices = {
  query,
  update,
  remove
}
export default projectServices
