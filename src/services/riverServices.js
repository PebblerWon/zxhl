//数据中心（查询信息）中小河流
import { request, config } from '../utils'
import request2 from '../utils/request2.js'
import qs from 'qs'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'

const { api } = config
const { dataCenter } = api
//const {useFakeData} = config;
const useFakeData = false


export async function query (params) {
  /*params{
    '所属流域':'',
    '查询字段':''
  }*/
  console.log(params)
  let resData;
  const fakeData1 = [];
  for (let i = 0; i < 20; i++) {
    fakeData1.push({
      key: i,
      '编码':Math.floor(Math.random()*100),
      '河流名称': `东沙河${i}`,
      '所属流域': `${params['所属流域']=='全部'?'黄河流域':params['所属流域']}`,
      '所在水系': `${params['所属流域']}`,
      '河流长度':31.60,
      '治理项目':20,
      '规划项目':30,
      '流经地':'商丘市梁园区、虞城县、夏邑县、永城县',
      '流域面积':1000
    });
  }
  if(useFakeData){
    resData = await fakeRequest({
      url: dataCenter.river,
      method: 'get',
    },fakeData1)
  }else{
    if(params['所属流域']=='全部'){
      resData = await request(`${dataCenter.river}?${qs.stringify({basin:''})}`)
    }else{
      resData = await request(`${dataCenter.river}?${qs.stringify({basin:params['所属流域']})}`)
    }
    
  }
  return resData;
}

export async function deleteItem (params) {
  const fakeData1 = Math.random()>0.5;
 /* const data = await request(`${dataCenter.river}?`)*/
  const data = await fakeRequest({
    url: dataCenter.river,
    method: 'delete',
  },fakeData1)
  console.log(data)
  return data;
}

export async function update(params){
  console.log(params)
  let b = JSON.stringify(params);
  var data = new FormData()
  data.append('json','1')
  // const a = await request(`${dataCenter.riverUpdate}`,{
  //   method:'POST',
  //   headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   /*body:JSON.stringify({
  //     json:b
  //   })*/
  //   body:data
  // })
  const  a = await request2(`${dataCenter.riverUpdate}`,{
    method:'post',
    data:{
      json:b
    }
  })
  return a ;
}
const riverServices = {
  query,
  deleteItem,
  update
}
export default riverServices