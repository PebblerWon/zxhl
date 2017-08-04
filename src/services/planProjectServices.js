//首页规划项目

import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { homeGuiHuaXiangMu } = api



export async function query (params) {
  //console.log(params)
  const ds1 = {
		'total':{
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
		},
		'data':[
			{
			'所在流域':'淮河流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},
			{
			'所在流域':'黄河流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},{
			'所在流域':'长江流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},{
			'所在流域':'海河流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},
		],
		'tableTitle':'全省规划项目治理情况表(按流域划分)'
	}
  let ds2 = {
		'total':{
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
		},
		'data':[
			
		],
		'tableTitle':'全省河流流域面积在200~3000平方公里河流治理情况统计表(按流域汇总)'
	}
	HNCity.map(item=>{
		ds2.data.push({
			'所在政区':item,
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
		})
	})
  const fakeData = {ds1:ds1,ds2:ds2};
  /*const data1 = await request(`${homeGuiHuaXiangMu.table1}`);
  const data2 = await request(`${homeGuiHuaXiangMu.table2}`);
  const data = {ds1:data1,ds2:data2};*/
  const data =await fakeRequest({
    url: '',
    method: 'get',
    data: params,
  },fakeData)
  return data;
}


const baseSituationServices = {
  query
}
export default baseSituationServices