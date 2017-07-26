import { Tabs, Radio ,Button} from 'antd';
import styles from './index.less'
import RiverInfo from './RiverInfo'
import ProjectInfo from './ProjectInfo'
const TabPane = Tabs.TabPane;

const DataCenter=()=>{
  return(
    <Tabs
      tabPosition='left'
      className={styles.container}
    >
      <TabPane tab="河流信息" key="1" className='tabPanel'>
        <RiverInfo />
      </TabPane>
      <TabPane tab="项目信息" key="2" className='tabPanel'><ProjectInfo /></TabPane>
      {/*<TabPane tab="资金信息1231rw1f3w1" key="3" className='tabPanel'>资金信息</TabPane>*/}
    </Tabs>)
}

export default DataCenter;