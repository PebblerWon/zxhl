//数据中心（查询信息）规划项目、十二五项目
import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { dataCenter } = api
const {useFakeData} = config;



export async function query (params) {
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
			'项目名称':`伊源河新南至汤营段河道治理工程${i}`,
			'所在市': `洛阳`,
			'所在县': '栾川',
			'所属流域': `黄河`,
			'所在河流':'伊源河',
		});
	}
  //if(useFakeData){
    resData =await fakeRequest({
      url: dataCenter.project,
      method: 'get',
      data: params,
    },fakeData1)
  //}else{
  //  resData = await request(`${dataCenter.project}?`)
  //}
  return resData;
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