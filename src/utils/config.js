const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
module.exports = {
  useFakeData:false,
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    baseSituation:{
      table1:`${APIV1}/RiverInfoWS.asmx/RiverStatistics`,
      table2:`${APIV1}/RiverInfoWS.asmx/Government125`,
      table3:`${APIV1}/RiverInfoWS.asmx/IsGovernPro`,
      table1Excel:`${APIV1}/RiverInfoWS.asmx/RiverStatisticsDownload`,
      //http://172.66.16.190:6500/api/RiverInfoWS.asmx/Government125Download
      table2Excel:`${APIV1}/RiverInfoWS.asmx/Government125Download`,
    },
    homeGuiHuaXiangMu:{
      table1:`${APIV1}/RiverInfoWS.asmx//PlanProByRiver`,
      table2:`${APIV1}/RiverInfoWS.asmx/PlanProByCity`,
    },
    dataCenter:{
      river:`${APIV1}/baseSituation/table1.asmx`,
      project:`${APIV1}/baseSituation/table1.asmx`,
    },
    sign:{
      SignIn:`${APIV1}/RiverInfoWS.asmx/Login`,
      SignOut:`${APIV1}/baseSituation/table1.asmx`,
    },
    huiZongXinXi:{
      guiHuaXiangMu:``,
      piFuXiangMu:``,
      yanShouXiangMu:``,
      shiErWuXiangMu:``,
    }
  },
}
