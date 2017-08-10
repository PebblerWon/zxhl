import { Tabs, Radio ,Button} from 'antd';
import ZhongXiaoHeLiu from './ZhongXiaoHeLiu'
import StasticGraph from './StasticGraph'
import GuiHuaXiangMu from './GuiHuaXiangMu'
import PiFuXiangMu from './PiFu'
import YanShouXiangMu from './YanShou'
import ShiErWuXiangMu from './ShiErWu'
import coStyle from '../common.less'

const TabPane = Tabs.TabPane;

const DataCenter=()=>{
  return(
     <div className={coStyle.tabsContainer}>
      <Tabs
        tabPosition='left'
      >
        <TabPane tab="中小河流" key="中小河流">
          <ZhongXiaoHeLiu />
        </TabPane>
        <TabPane tab="规划项目" key="规划项目">
          <GuiHuaXiangMu />
        </TabPane>
        <TabPane tab="批复项目" key="批复项目">
          <PiFuXiangMu />
        </TabPane>
        <TabPane tab="验收项目" key="验收项目">
          <YanShouXiangMu />
        </TabPane>
         <TabPane tab="十二五项目" key="十二五项目">
          <ShiErWuXiangMu />
        </TabPane>
      </Tabs> 
    </div>)
}

export default DataCenter;