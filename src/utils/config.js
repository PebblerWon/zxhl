const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
module.exports = {
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
      //http://172.66.16.190:6500/RiverInfoWS.asmx/RiverStatistics
      table1:`${APIV1}/RiverInfoWS.asmx/RiverStatistics`,
      //http://172.66.16.190:6500/RiverInfoWS.asmx/Government125
      table2:`${APIV1}/RiverInfoWS.asmx/Government125`,
      table3:`${APIV1}/RiverInfoWS.asmx/IsGovernPro`,
    },
    homeGuiHuaXiangMu:{
      table1:`${APIV1}/RiverInfoWS.asmx/RiverStatistics`,
      table2:`${APIV1}/RiverInfoWS.asmx/Government125`,
    },
    dataCenter:{
      river:`${APIV1}/baseSituation/table1.asmx`,
      project:`${APIV1}/baseSituation/table1.asmx`,
    }
  },
}
