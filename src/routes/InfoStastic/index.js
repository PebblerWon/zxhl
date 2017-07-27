import { Tabs, Radio ,Button} from 'antd';
import ProjectAll from './ProjectAll'
import StasticGraph from './StasticGraph'
import coStyle from '../common.less'

const TabPane = Tabs.TabPane;

const DataCenter=()=>{
  return(
     <div className={coStyle.tabsContainer}>
      <Tabs
        tabPosition='left'
      >
        <TabPane tab="项目汇总" key="1">
          <ProjectAll />
        </TabPane>
        <TabPane tab="统计图表" key="2">
          <StasticGraph />
        </TabPane>
      </Tabs> 
    </div>)
}

export default DataCenter;