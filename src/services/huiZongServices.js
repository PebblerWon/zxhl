import qs from 'qs'
import { request, config } from '../utils'
import {HNCity} from '../utils/city'
import fakeRequest from '../utils/fakeRequest'
const { api } = config
const { huiZongXinXi ,baseSituation} = api
//const {useFakeData} = config;
const useFakeData = true;




export async function query (params) {
  console.log(params)
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
  const ds1 = {
        'total':{
          '治理河长':'178.3',
          '批复及初审投资':'40185.0',
          '测算投资':'37500',
          '中央资金':'15000',
          '省级资金':'5625',
          '备注':'无'
        },
        'data':[
          {
            '项目名称':'河南省洛阳市汝阳县靳村河牌路界至杨坪段河道治理工程',
            '地级行政区':'洛阳市',
            '县级行政区':'汝阳县',
            '治理河长':'178.3',
            '批复及初审投资':'40185.0',
            '测算投资':'37500',
            '中央资金':'15000',
            '省级资金':'5625',
            '备注':'无'
          },
        ]
  }
  const ds2 = {
      total:{
          key:`合计`,
          '备案长度':`550.9`,
          '批复投资':'131356.7'
      },
      data:[
        {
            '项目名称':'河南省荥阳市汜水镇至入黄河口段治理工程',
            '地级行政区':'郑州市',
            '县级行政区':'荥阳市',
            '备案长度':'6.68',
            '批复投资':'2861',
           
          },
      ]}
  const ds3 = {
    total:{
      '序号':'合计',
      '治理河长':'2350',
      '投资':'640428'
    },
    data:[
      {
        '序号':'一  原规划结转项目(含调整补充项目)，涉及河流68条 ',
        '治理河长':'769',
        '投资':'209567',
        dataSource:[
          {
            '序号':'1',
            '项目名称':'河南省信阳市光山县白露河白雀镇街区段治理工程',
            '河流名称':'白露河',
            '流域面积':'2211',
            '所属流域':'淮河流域',
            '所在县级行政区':'光山县',
            '治理河长':'5.6',
            '投资':'1995',
          }
        ]
      }
    ]
  }
  const ds4 = {
    total:{
      '序号':'河南（总计）',
      '治理河长':'768',
      '总投资':'211418',
      '中央原规划投资':'142504',
      '地方原规划投资':'68915',
      '中央已安排投资':'9782',
      '地方已安排投资':'9782',
      '中央剩余投资':'9782',
      '地方剩余投资':'9782',
    },
    data:[
      {
        '序号':'一  中央资金尚未安排完毕的项目，或中央资金尚未安排但能够继续实施的项目 ',
        '治理河长':'112',
        '总投资':'211418',
        '中央原规划投资':'17164',
        '地方原规划投资':'9782',
        '中央已安排投资':'9782',
        '地方已安排投资':'9782',
        '中央剩余投资':'9782',
        '地方剩余投资':'9782',
        dataSource:[
          {
            '序号':'1',
            '项目名称':'河南省信阳市光山县白露河白雀镇街区段治理工程',
            '省':'河南省',
            '市':'信阳市',
            '县':'光山县',
            '所在河流':'白露河',
            '流域面积':'2211',
            '所属流域机构':'淮河流域',
            '治理河长':'5.6',
            '保护人口':'3000',
            '保护耕地':'0.5',
            '排涝收益面积':'0.5',
            '总投资':'2500',
            '中央原规划投资':'2000',
            '地方原规划投资':'500',
            '中央已安排投资':'0',
            '地方已安排投资':'0',
            '中央剩余投资':'2000',
            '地方剩余投资':'500',
            '拟调整纳入的规划阶段':'',
            '是否属于享受特殊政策地区':'中部享受西部政策',
            '初步设计是否已批复':'否',
            '项目建设进展':'未开工',
          }
        ]
      }
    ]
  }
  const ds5 = {
    total:{
      '序号':'一 2017年度安排项目',
    },
    data:[
      {
        '序号':'（一）  中小河流现有规划项目 ',
        dataSource:[
          {
            '序号':'1',
            '项目名称':'光山县白露河白雀镇街区段治理工程',
            '省':'河南省',
            '市':'信阳市',
            '县':'光山县',
            '所属流域':'淮河流域',
            '所在河流':'白露河',
            
            '项目区个数':'',
            '批复或规划综合治理河长':'3000',
            '批复或估算总投资':'0.5',
            '中央投资':'0.5',
            '目前进展':'2500',
            '批复文号':'2000',
            '合计':'500',
            '一七年中央投资':'0',
            '省级投资':'0',
            '市县投资':'2000',
          }
        ]
      }
    ]
  };
  let resData;
  switch(params.type){
    case '灾后薄弱环节':{
      if(params.table == 'table1'){
        // resData = await fakeRequest({},ds1)
        resData = await request(`${huiZongXinXi.zaiHouXiangMu.table1}`)
      }else if(params.table == 'table2'){
        // resData = await fakeRequest({},ds2)
        resData = await request(`${huiZongXinXi.zaiHouXiangMu.table2}`)
      }else if(params.table == 'table3'){
        // resData = await fakeRequest({},ds3)
        resData = await request(`${huiZongXinXi.zaiHouXiangMu.table3}`)
      }else if(params.table == 'table4'){
        // resData = await fakeRequest({},ds4)
        resData = await request(`${huiZongXinXi.zaiHouXiangMu.table4}`)
      }else if(params.table == 'table5'){
        // resData = await fakeRequest({},ds5)
        resData = await request(`${huiZongXinXi.zaiHouXiangMu.table5}`)
      }
      break;
    }
    case '批复项目':{}
    case '验收项目':{}
    case '十二五项目':{
      if(params.table == 'table1'){
        resData = await request(`${huiZongXinXi.contable1}?${qs.stringify({proType:params.type})}`)
      }else if(params.table == 'table2'){
        resData = await request(`${huiZongXinXi.contable2}?${qs.stringify({proType:params.type})}`)
        //resData = await fakeRequest({},[])
      }else if(params.table == 'table3'){
        resData = await request(`${huiZongXinXi.contable3}?${qs.stringify({proType:params.type})}`)
      }
      break;
    }
  }
  return resData;
}

export async function exportExcel(params){
  let res;
  console.log(params)
  let resData;
  switch(params.type){
    case '灾后薄弱环节':{
      if(params.table == 'table1'){
        res = `${huiZongXinXi.zaiHouXiangMu.table1Download}`
      }else if(params.table == 'table2'){
        res = `${huiZongXinXi.zaiHouXiangMu.table2Download}`
      }else if(params.table == 'table3'){
        res = `${huiZongXinXi.zaiHouXiangMu.table3Download}`
      }else if(params.table == 'table4'){
        res = `${huiZongXinXi.zaiHouXiangMu.table4Download}`
      }else if(params.table == 'table5'){
        res = `${huiZongXinXi.zaiHouXiangMu.table5Download}`
      }
      break;
    }
    case '批复项目':{}
    case '验收项目':{}
    case '十二五项目':{
      if(params.table == 'table1'){
        res = `${huiZongXinXi.table1excelDownload}?${qs.stringify({proType:params.type})}`
      }else if(params.table == 'table2'){
        res = `${huiZongXinXi.table2excelDownload}?${qs.stringify({proType:params.type})}`
        //resData = await fakeRequest({},[])
      }else if(params.table == 'table3'){
        res = `${huiZongXinXi.table3excelDownload}?${qs.stringify({proType:params.type})}`
      }
      break;
    }
  }
  console.log(res);
  return res;
}
const huiZongServices = {
  query,
  exportExcel
}
export default huiZongServices