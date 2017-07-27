import { Tabs, Radio ,Button} from 'antd';
import BaseSituation from './BaseSituation/'
import PlanProject from './PlanProject'
import coStyle from '../common.less'

const TabPane = Tabs.TabPane;

const Home=()=>{
  return(
    <div className={coStyle.tabsContainer}>
      <Tabs
        tabPosition='left'
      >
        <TabPane tab="基本情况" key="1">
          <BaseSituation />
        </TabPane>
        <TabPane tab="规划项目" key="2"><PlanProject /></TabPane>
      </Tabs>
    </div>)
    
}

export default Home;