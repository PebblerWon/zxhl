import qs from 'qs'
import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { baseSituation } = api
//const {useFakeData} = config;
const useFakeData = true;




export async function query (params) {
  let data ={
    '郑州市':[],
    '焦作市':[],
  };
  for(let i = 0;i<10;i++){
    let item = {
      'key':`伊源河新南至汤营段河道治理工程${i}`,
      '项目名称':`伊源河新南至汤营段河道治理工程${i}`,
      '所在水资源一级区':`黄河区`,
      '所属流域机构':`黄委`,
      '所在水系':`伊洛河水系`,
      '所在河流':`伊源河`,
      '所在河流流域面积':782.00,
      '所在河流长度':48.00,
      '省级行政区':`河南`,
      '地级行政区':`洛阳`,
      '县级行政区':`栾川`,
      '东经1':`111.36.17`,
      '北纬1':`33.54.28`,
      '东经2':`111.48.11`,
      '北纬2':`33.59.15`,
          '项目分类':'乡镇防洪',
          '工程任务':'防洪',
          '主要建设内容':'清淤疏浚、堤防加固，险工护砌，重建生产桥',
      '规划依据':`河南省中小河流治理工程总体规划`,
          '项目前期工作':'2',
      '项目审批情况':`未审批`,
      '备注':`水利普查序号为12345678`,
    }
    data['郑州市'].push(item)
  }
  for(let i = 0;i<9;i++){
    let item = {
      'key':`武陟县共产主义渠圪当店至获嘉县界段治理工程${i}`,
      '项目名称':`武陟县共产主义渠圪当店至获嘉县界段治理工程${i}`,
      '所在水资源一级区':`海河区`,
      '所属流域机构':`海委`,
      '所在水系':`卫河水系`,
      '所在河流':`共产主义渠上端`,
      '所在河流流域面积':500.40,
      '所在河流长度':50.00,
      '省级行政区':`河南`,
      '地级行政区':`焦作`,
      '县级行政区':`武陟`,
      '东经1':`无`,
      '北纬1':`无`,
      '东经2':`无`,
      '北纬2':`无`,
      '规划依据':`河南省中小河流治理工程总体规划`,
      '项目审批情况':`未审批`,
      '备注':`无`,
    }
    data['焦作市'].push(item)
  }
  const ds1 = [
    {
      'key':`郑州市`,
      '项目名称':`郑州市(10)`,
      'dataSource':data['郑州市'],
    },
    {
      'key':`焦作市`,
      '项目名称':`焦作市(9)`,
      'dataSource':data['焦作市'],
    },
  ]


  data ={
    '淮河流域':[],
    '海河流域':[],
    '黄河流域':[],
    '长江流域':[],
  };
  for(let i = 0;i<10;i++){
    let item = {
      'key':`白沟河${i}`,
      '河流名称':`白沟河`,
      '所在流域':`淮河`,
      '流域面积':`960.20`,
      '总河长':`83.00`,
          '已治理长度':'42.5',
          '未治理长度':'40.5',
      '十二五地级行政区':`/`,
      '十二五县级行政区':`鹿邑`,
      '十二五治理段':`1`,
      '十二五治理长度':`8.00`,
          '地级行政区':`/`,
          '县级行政区':`鹿邑`,
          '治理段':`1`,
          '治理长度':`8.00`,

      '投资':`1260.00`,
      '第一次水利普查序号':`784`,
      '河流流经地':`鹿邑县`,
    }
    data['淮河流域'].push(item)
  }
  for(let i = 0;i<9;i++){
    let item = {
      'key':`白沟河${i}`,
          '河流名称':`白沟河`,
          '所在流域':`淮河`,
          '流域面积':`960.20`,
          '总河长':`83.00`,
          '已治理长度':'42.5',
          '未治理长度':'40.5',
          '十二五地级行政区':`/`,
          '十二五县级行政区':`鹿邑`,
          '十二五治理段':`1`,
          '十二五治理长度':`8.00`,
          '地级行政区':`/`,
          '县级行政区':`鹿邑`,
          '治理段':`1`,
          '治理长度':`8.00`,
          '投资':`1260.00`,
          '第一次水利普查序号':`784`,
          '河流流经地':`鹿邑县`,
    }
    data['海河流域'].push(item)
  }
  const ds2 = [
      {
          key:`合计`,
          '河流名称':`合计：治理段(397) 治理长度(3959.54) 投资(1070141.93)`,
          'dataSource':[]
      },
    {
      'key':`淮河流域`,
      '河流名称':`淮河流域：治理段(225) 治理长度(2572.76) 投资(611107.59)`,
      'dataSource':data['淮河流域'],
    },
    {
      'key':`海河流域`,
      '河流名称':`海河流域：治理段(36) 治理长度(355.80) 投资(97673.00)`,
      'dataSource':data['海河流域'],
    },
  ]


  data ={
    '郑州市':[],
  };
  for(let i = 0;i<9;i++){
    let item = {
      'key':`河南省登封市双洎河井湾水库至玉台段河道治理工程${i}`,
          '项目名称':`河南省登封市双洎河井湾水库至玉台段河道治理工程${i}`,
          '所在河流名称':`双洎河`,
          '河道治理长度':`6.10`,
          '堤防新建':`0.00`,
          '堤防加固':'6.10',
          '护岸新建':'6.10',
          '护岸加固':`0.00`,
          '清淤河长':`6.10`,
          '清淤量':`24.40`,
          '新建或加固穿堤建筑物':`0`,
          '滨岸待整治面积':`0.00`,
          '整治入河排污':`0`,
          '现状防洪标准':`10`,
          '现状除涝标准':`3`,
          '设计防洪标准':`20`,
          '设计除涝标准':`5`,
          '项目保护城镇':`/`,
          '项目保护人口':`5.00`,
          '项目保护耕地':`4.00`,
          '排涝收益面积':`0.00`,
          '移民人数':`0.00`,
          '永久占地':`0.00`,
    }
    data['郑州市'].push(item)
  }
  const ds3 = [
      {
          key:`合计`,
          '项目名称':`01郑州(11)`,
          'dataSource':data['郑州市']
      },
  ]
  
  let resData;
  switch(params.table){
    case 'table1':{
      if(useFakeData){
       resData =await fakeRequest({
          url: baseSituation.table1,
          method: 'get',
          data: params,
        },ds1)
      }else{
       resData = await request(`${baseSituation.table1}`)
      }
      break;
    }
    case 'table2':{
      if(useFakeData){
       resData =await fakeRequest({
          url: baseSituation.table2,
          method: 'get',
          data: params,
        },ds2)
      }else{
       resData = await request(`${baseSituation.table2}`)
      }
      break;
    }
    case 'table3':{
      //console.log(params)
      if(useFakeData){
        resData =await fakeRequest({
          url: baseSituation,
          method: 'get',
          data: params,
        },ds3)
      }else{
        const area = params.payload[0];
        resData = await request(`${baseSituation.table3}?${qs.stringify({city:area})}`)
      }
      break;
    }
    default:{
      if(useFakeData){
        const fakeData = {ds1:ds1,ds2:ds2,ds3:ds3};
        resData =await fakeRequest({
          url: '',
          method: 'get',
          data: params,
        },fakeData)
      }else{
        resData =await fakeRequest({
          url: '',
          method: 'get',
          data: params,
        },fakeData)
      }
    }
  }
   return resData;
}

export async function exportExcel(params){
  let res;
  console.log(params)
  switch(params.table){
    case 'table1':{
      //res = await fakeRequest({},`${baseSituation.table1Excel}`)
      res = `${baseSituation.table1Excel}`
      break;
    }
    case'table2':{
      //res = await fakeRequest({},'http://jcxx.hnslkc.com/ExcelTemp/%E7%9C%81%E5%8D%97%E6%B0%B4%E5%8C%97%E8%B0%83%E5%8A%9E20170412082343%E5%AF%BC%E5%87%BA%E6%8A%A5%E8%A1%A8.xls')
      res = await request(`${baseSituation.table1Excel}`)
      break;
    }
    default:{
      res = await fakeRequest({},'http://jcxx.hnslkc.com/ExcelTemp/%E7%9C%81%E5%8D%97%E6%B0%B4%E5%8C%97%E8%B0%83%E5%8A%9E20170412082343%E5%AF%BC%E5%87%BA%E6%8A%A5%E8%A1%A8.xls')
      break;
    }
  }
  return res;
}
const huiZongServices = {
  query,
  exportExcel
}
export default huiZongServices