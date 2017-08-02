import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { baseSituation } = api



export async function query (params) {
  const ds1 = {
        'total':{
          '条数':'242',
          '所占百分比':'100.00',
          '总河长':'15886'
        },
        'data':[
          {
          '所在流域':'淮河流域',
          '条数':'134',
          '所占百分比':'55.37',
          '总河长':'9332'
          },
          {
          '所在流域':'黄河流域',
          '条数':'38',
          '所占百分比':'15.70',
          '总河长':'2056'
          },{
          '所在流域':'长江流域',
          '条数':'46',
          '所占百分比':'19.01',
          '总河长':'3026'
          },{
          '所在流域':'海河流域',
          '条数':'24',
          '所占百分比':'9.92',
          '总河长':'1472'
          },
        ]
  }
  const ds2 = {
    'total':{
      '总计河流条数':'242',
      '已治理河流数':'221',
      '已治理项目数':'376',
      '总河长':'15886',
      '已治理长度':'3365.73',
      '已治理河长占总河长的比例':'21.19',
      '未治理长度':'12520.27'
    },
    'data':[
      {
      '所在流域':'淮河流域',
      '总计河流条数':'134',
      '已治理河流数':'107',
      '已治理项目数':'176',
      '总河长':'9332',
      '已治理长度':'1866.35',
      '已治理河长占总河长的比例':'20.00',
      '未治理长度':'7465.64'
      },
      {
      '所在流域':'黄河流域',
      '总计河流条数':'242',
      '已治理河流数':'221',
      '已治理项目数':'376',
      '总河长':'15886',
      '已治理长度':'3365.73',
      '已治理河长占总河长的比例':'21.19',
      '未治理长度':'12520.27'
      },{
      '所在流域':'长江流域',
      '总计河流条数':'242',
      '已治理河流数':'221',
      '已治理项目数':'376',
      '总河长':'15886',
      '已治理长度':'3365.73',
      '已治理河长占总河长的比例':'21.19',
      '未治理长度':'12520.27'
      },{
      '所在流域':'海河流域',
      '总计河流条数':'242',
      '已治理河流数':'221',
      '已治理项目数':'376',
      '总河长':'15886',
      '已治理长度':'3365.73',
      '已治理河长占总河长的比例':'21.19',
      '未治理长度':'12520.27'
      },
    ]
  }
  const ds3 = {
    'total':{
      '项目个数':'376',
      '治理长度':'4330.62',
      '投资':'837861.43'
    },
    'data':[],
    'tableTitle':``
  }
  HNCity.map(item=>{
    ds3.data.push({
      '所在地市':item,
      '项目个数':'25',
      '治理长度':'249.273',
      '投资':'56238'
    })
  })
  switch(params.table){
    case 'table1':{
      const data = await request(`${baseSituation.table1}`)
      // const data =await fakeRequest({
      //   url: baseSituation.table1,
      //   method: 'get',
      //   data: params,
      // },ds1)
      return data;
      break;
    }
    case 'table2':{
      const data = await request(`${baseSituation.table2}`)
     /* const data =await fakeRequest({
        url: baseSituation.table2,
        method: 'get',
        data: params,
      },ds2)*/
      return data;
      break;
    }
    case 'table3':{
      /*const data = await request(`${baseSituation.table3}?${qs.stringify({id:1})}`)*/
      /*console.log(params)*/
      const area = params.payload[0];
      const data =await fakeRequest({
        url: baseSituation,
        method: 'get',
        data: params,
      },ds3)
      return data;
      break;
    }
    default:{
      const fakeData = {ds1:ds1,ds2:ds2,ds3:ds3};
      const data =await fakeRequest({
        url: baseSituation,
        method: 'get',
        data: params,
      },fakeData)
      return data;
    }
  }
}

/*export async function remove (params) {
  return request({
    url: projectQuery,
    method: 'delete',
    data: params,
  })
}
*/
const baseSituationServices = {
  query
}
export default baseSituationServices