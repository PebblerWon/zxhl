//数据中心（查询信息）规划项目、十二五项目
import * as esriLoader from 'esri-loader'
import qs from 'qs'
import $ from 'jquery'
import { request, config } from '../utils'
import { HNCity } from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
import request2 from '../utils/request2'
import {FeatureLayerUrl,GiSApiUrl} from '../routes/MapC/mapConfig'

const { api,PROJECTTYPE } = config
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
    if(params['项目类型']==PROJECTTYPE.ShiErWuProjectType){
      resData = await request(`${dataCenter.shiErWuproject}?${qs.stringify({'proType':params['项目类型'],'basin':'','city':params['所属地市']})}`)
      //resData = fakeData1
    }else if(params['项目类型']==PROJECTTYPE.ZaiHouProjectType){
      resData = await request(`${dataCenter.project}?${qs.stringify({'proType':params['项目类型'],'basin':'','city':params['所属地市']})}`)
    }
  }else{
    if(params['项目类型']==PROJECTTYPE.ShiErWuProjectType){
      resData = await request(`${dataCenter.shiErWuproject}?${qs.stringify({'proType':params['项目类型'],'basin':params['所属流域'],'city':params['所属地市']})}`)
      //resData = fakeData1
    }else if(params['项目类型']==PROJECTTYPE.ZaiHouProjectType){
      resData = await request(`${dataCenter.project}?${qs.stringify({'proType':params['项目类型'],'basin':params['所属流域'],'city':params['所属地市']})}`)
    }
  }
  
  console.log(resData)
  return resData;
}


export async function update(params) {
  console.log(params.data)
  let data = JSON.stringify(params.data)
  if(params['项目类型']==PROJECTTYPE.ZaiHouProjectType){
   return await request2(`${dataCenter.updateZaiHou}`,{
      method:'POST',
      data:{
        json:data
      }
    })
  }else if(params['项目类型']==PROJECTTYPE.ShiErWuProjectType){
    return await request2(`${dataCenter.updateShiErWu}`,{
      method:'POST',
      data:{
        json:data
      }
    })
  }
  
}

export async function newProject(params){
  console.log('submit from services')
  console.log(params)
  if(params['项目类型']==PROJECTTYPE.ZaiHouProjectType){
    
    const res = await withFileRequest(`${api.dataCenter.newZaiHou}`,{
      method:'POST',
      data:params.data,
    });
   console.log(res)
   return res
  }else if(params['项目类型']==PROJECTTYPE.ShiErWuProjectType){
    return await withFileRequest(`${api.dataCenter.newShiErWu}`,{
      method:'POST',
      data:params.data,
    })
  }
}

export async function remove(params) {
  console.log(params)
  let deleteFeature,deleteData;
  const esri = await loadEsri();
  //const esri=true;
  if(esri){
    //删除要素
    console.log('删除要素...')
    //删除成功 deleteFeature为true
    deleteFeature = await removeFeature(params.id)
    console.log('要素删除成功...')
    if(deleteFeature){
      //发送从数据库删除记录的请求
      console.log('从数据库删除记录...')
      if(params['项目类型']==PROJECTTYPE.ZaiHouProjectType){
          deleteData = await request2(`${dataCenter.deleteZaiHou}`,{
            method:'POST',
            data:{id:params.id}
          })
      }else if(params['项目类型']==PROJECTTYPE.ShiErWuProjectType){
          deleteData = await request2(`${dataCenter.deleteShiErWu}`,{
            method:'POST',
            data:{id:params.id}
          })
      }
      //deleteData = await fakeRequest({},true)
      console.log(deleteData)
      if(deleteFeature&&deleteData=="true"){
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
        url: GiSApiUrl
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
        "esri/layers/FeatureLayer",
        "esri/tasks/query"
      ],
      (FeatureLayer,Query
      ) => {
        let featureLayer1 = new FeatureLayer(FeatureLayerUrl, {
          mode: FeatureLayer.MODE_SNAPSHOT
        });
        let query = new Query();
        query.outFields = ["*"];
        query.where = `id=${id}`;
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

async function withFileRequest(url, options) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url:url,
      method:options.method,
      data:options.data,
      contentType:false,
      processData:false,
      success(data){
        resolve(data)
      },
      error(err){
        reject(err)
      }
    })

  })
  
}
const projectServices = {
  query,
  update,
  remove
}
export default projectServices
