const APIV1 = '/api'
//const APIV1 = 'http://zxhl2.hnslkc.com:81/api'
const APIV2 = '/api'
module.exports = {
  useFakeData:false,
  name: '',
  noimage:'/resource/noimage.jpg',
  prefix: 'antdAdmin',
  //footerText: 'Ant Design Admin  © 2017 zuiidea',
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
      table1:`${APIV1}/RiverInfoWS.asmx/PlanProByRiver`,
      table2:`${APIV1}/RiverInfoWS.asmx/PlanProByCity`,
    },
    dataCenter:{
      river:`${APIV1}/RiverInfoWS.asmx/SearchRiverInfo`,
      riverUpdate:`${APIV1}/InfoDataPostWS.asmx/UpdateRiverInfo`,
      project:`${APIV1}/RiverInfoWS.asmx/SearchInfoByTypeAndBasinAndCity`,
      shiErWuproject:`${APIV1}/RiverInfoWS.asmx/SearchInfoByTypeAndBasinAndCity`,
      

      updateZaiHou:`${APIV1}/InfoDataPostWS.asmx/UpdatePostDisasterInfo`,
      updateShiErWu:`${APIV1}/InfoDataPostWS.asmx/UpdatePro125Info_New`,
      projectDeleteFeature:'http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/FeatureServer/30/deleteFeatures',
    
      newZaiHou:`${APIV1}/NewZaiHou.ashx`,
      newShiErWu:`${APIV1}/NewShiErWu.ashx`,

      deleteZaiHou:`${APIV1}/DeleteZaiHou.ashx`,
      deleteShiErWu:`${APIV1}/DeleteShiErWu.ashx`,
    },
    sign:{
      SignIn:`${APIV1}/RiverInfoWS.asmx/Login`,
      SignOut:`${APIV1}/baseSituation/table1.asmx`,
    },
    huiZongXinXi:{
      guiHuaXiangMu:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainPro`,
      zhengqu:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainPro`,
      heliu:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainPro`,
      gongchengcuoshi:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainPro`,
      table1excelDownload:`${APIV1}/RiverInfoWS.asmx/CollectInfoByCityDownload`,
      table2excelDownload:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainProDownload`,
      table3excelDownload:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainProDownload`,
      contable1:`${APIV1}/RiverInfoWS.asmx/CollectInfoByCity`,
      contable2:`${APIV1}/RiverInfoWS.asmx/CollectInfoByRiver`,
      contable3:`${APIV1}/RiverInfoWS.asmx/CollectInfoByMainPro`,
      
      zaiHouXiangMu:{
        table1:`${APIV1}/RiverInfoWS.asmx/CollectInfoOfPostDisaster_B1`,
        table2:`${APIV1}/RiverInfoWS.asmx/CollectInfoOfPostDisaster_B2`,
        table3:`${APIV1}/RiverInfoWS.asmx/CollectInfoOfPostDisaster_B3`,
        table4:`${APIV1}/RiverInfoWS.asmx/CollectInfoOfPostDisaster_B4`,
        table5:`${APIV1}/RiverInfoWS.asmx/CollectInfoOfPostDisaster_B5`,
        //table1Download:`http://172.36.16.2:6500/api/TempExcel/2017年后续治理项目名单.xls`,
        //table2Download:`http://172.36.16.2:6500/api/TempExcel/2017年申报治理项目名录.xls`,
        //table3Download:`http://172.36.16.2:6500/api/TempExcel/河南省200到3000平方公里项目备案表.xls`,
        //table4Download:`http://172.36.16.2:6500/api/TempExcel/原规划内中小河流结转项目.xls`,
        //table5Download:`http://172.36.16.2:6500/api/TempExcel/2017年度投资落实情况及2018项目储备情况.xls`,
        table1Download:`http://zxhl.hnslkc.com/api/TempExcel/2017年后续治理项目名单.xls`,
        table2Download:`http://zxhl.hnslkc.com/api/TempExcel/2017年申报治理项目名录.xls`,
        table3Download:`http://zxhl.hnslkc.com/api/TempExcel/河南省200到3000平方公里项目备案表.xls`,
        table4Download:`http://zxhl.hnslkc.com/api/TempExcel/原规划内中小河流结转项目.xls`,
        table5Download:`http://zxhl.hnslkc.com/api/TempExcel/2017年度投资落实情况及2018项目储备情况.xls`,
      }
    },
    map:{
      getInfoById:`${APIV1}/InfoDataPostWS.asmx/returnProAndPostDisasterInfo`,
      //projectSource:`http://172.36.16.2:6500/项目照片和视频/`
      //projectSource:`http://zxhl2.hnslkc.com:81/项目照片和视频/`
      projectSource:`http://172.36.16.2:6500/`
    },
    fileUpload:`${APIV1}/NewZaiHou.ashx`,
  },
  PROJECTTYPE:{
      ShiErWuProjectType:'十二五项目',
      ZaiHouProjectType:'灾后薄弱环节'
  },
}
