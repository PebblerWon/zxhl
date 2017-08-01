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
			'项目名称':`伊源河新南至汤营段河道治理工程${i}`,
			'所在市': `洛阳`,
			'所在县': '栾川',
			'所属流域': `黄河`,
			'所在河流':'伊源河',
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