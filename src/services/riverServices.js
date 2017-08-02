import { request, config } from '../utils'
import qs from 'qs'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'

const { api } = config
const { dataCenter } = api



export async function query (params) {
  /*params{
    '所属流域':'',
    '查询字段':''
  }*/
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
      '流经地':'商丘市梁园区、虞城县、夏邑县、永城县'
    });
  }
  /* const data = await request(`${dataCenter.river}?`)*/
  const data = await fakeRequest({
    url: dataCenter.river,
    method: 'get',
  },fakeData1)
  return data;
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

const riverServices = {
  query,
  deleteItem,
}
export default riverServices