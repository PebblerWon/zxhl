import { Tabs, Radio ,Button} from 'antd';
import {Link} from'dva/router'
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
        <TabPane tab="灾后薄弱环节" key="2">
          <PlanProject />
        </TabPane>
        {/*<TabPane tab={<Link to="/home/baseSituation">基本情况</Link>} key="1">*/}
        <TabPane tab="十二五项目" key="1">
          <BaseSituation />
        </TabPane>
        {/*<TabPane tab={<Link to="/home/PlanProject">规划项目</Link>} key="2">*/}
        
      </Tabs>
    </div>)
    
}

export default Home;