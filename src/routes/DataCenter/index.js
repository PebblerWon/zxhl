import { Tabs, Radio ,Button} from 'antd';
import coStyle from '../common.less'
//import RiverInfo from './RiverInfo'
//import ProjectInfo from './ProjectInfo'
import RiverByWZ from './RiverByWZ'
import ProjectByWZ from './ProjectByWZ'
import ShiErWuProject from './ShiErWuProject'

const TabPane = Tabs.TabPane;

const DataCenter=()=>{
  //规划项目和十二五项目总体样式一样，用type属性区分
  return(
    <div className={coStyle.tabsContainer}>
      <Tabs
        tabPosition='left'
      >
        <TabPane tab="中小河流" key="1" className='tabPanel'>
          <RiverByWZ />
        </TabPane>
        <TabPane tab="规划项目" key="2" className='tabPanel'>
          <ProjectByWZ projectType='规划项目'/>
        </TabPane>
        <TabPane tab="十二五项目" key="3" className='tabPanel'>
          <ShiErWuProject projectType='十二五项目'/>
        </TabPane>
        {/*<TabPane tab="资金信息1231rw1f3w1" key="3" className='tabPanel'>资金信息</TabPane>*/}
      </Tabs>
    </div>)
}

export default DataCenter;