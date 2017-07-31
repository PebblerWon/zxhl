import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { baseSituation } = api



export async function query (params) {
  const fakeData1 = [];
  for (let i = 0; i < 20; i++) {
    fakeData1.push({
      key: i,
      '编码':Math.floor(Math.random()*100),
      '河流名称': `东沙河${i}`,
      '所属流域': `${params['所在流域']=='全部'?'黄河流域':params['所在流域']}`,
      '所在水系': `${params['所在流域']}`,
      '河流长度':31.60,
      '治理项目':20,
      '规划项目':30,
    });
  }
  const data =await fakeRequest({
    url: baseSituation,
    method: 'get',
    data: params,
  },fakeData1)
  return data;
}

/*export async function remove (params) {
  return request({
    url: projectQuery,
    method: 'delete',
    data: params,
  })
}
*/
const riverServices = {
  query
}
export default riverServices