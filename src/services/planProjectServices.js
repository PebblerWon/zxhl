//首页规划项目

import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { homeGuiHuaXiangMu } = api
const {useFakeData} = config;



export async function query (params) {
  //console.log(params)
  const ds1 = {
		'total':{
			'项目个数':'397',
			'河流条数':'167',
			'治理长度':'3959.54',
			'投资':'1070142',
		},
		'data':[
			{
			'所在流域':'淮河流域',
			'项目个数':'225',
			'河流条数':'89',
			'治理长度':'2572.75',
			'投资':'611108',
			},
			{
			'所在流域':'黄河流域',
			'项目个数':'58',
			'河流条数':'167',
			'治理长度':'3959.54',
			'投资':'1070142',
			},{
			'所在流域':'长江流域',
			'项目个数':'78',
			'河流条数':'167',
			'治理长度':'3959.54',
			'投资':'1070142',
			},{
			'所在流域':'海河流域',
			'项目个数':'56',
			'河流条数':'167',
			'治理长度':'3959.54',
			'投资':'1070142',
			},
		],
		'tableTitle':'河南省中小河流治理工程规划治理项目情况一览表(按流域划分)'
	}
  let ds2 = {
		'total':{
			'项目个数':'397',
			'河流条数':'190',
			'治理长度':'3959.54',
			'投资':'1070142',
		},
		'data':[
			
		],
		'tableTitle':'全省河流流域面积在200~3000平方公里河流治理情况统计表(按流域汇总)'
	}
	HNCity.map(item=>{
		ds2.data.push({
			'所在地市':item,
			'项目个数':'10',
			'河流条数':'4',
			'治理长度':'67.49',
			'投资':'30318',
		})
	})
  let redData;
  if(useFakeData){
  	const fakeData = {ds1:ds1,ds2:ds2};
  	redData =await fakeRequest({
	  url: '',
	  method: 'get',
	  data: params,
	},fakeData)
  }
  else{
  	const data1 = await request(`${homeGuiHuaXiangMu.table1}`);
  	const data2 = await request(`${homeGuiHuaXiangMu.table2}`);
  	redData = {ds1:data1,ds2:data2};
  }
  return redData;
}


const baseSituationServices = {
  query
}
export default baseSituationServices