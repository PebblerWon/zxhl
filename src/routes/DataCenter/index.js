import { Tabs, Radio ,Button} from 'antd';
import coStyle from '../common.less'
import RiverInfo from './RiverInfo'
import ProjectInfo from './ProjectInfo'
const TabPane = Tabs.TabPane;

const DataCenter=()=>{
  return(
    <div className={coStyle.tabsContainer}>
      <Tabs
        tabPosition='left'
      >
        <TabPane tab="中小河流" key="1" className='tabPanel'>
          <RiverInfo />
        </TabPane>
        <TabPane tab="规划项目" key="2" className='tabPanel'><ProjectInfo /></TabPane>
        {/*<TabPane tab="资金信息1231rw1f3w1" key="3" className='tabPanel'>资金信息</TabPane>*/}
      </Tabs>
    </div>)
}

export default DataCenter;