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
      <TabPane tab="河流信息" key="1" style={{paddingRight:'20px'}}>
        <RiverInfo />
      </TabPane>
      <TabPane tab="项目信息" key="2"><ProjectInfo /></TabPane>
      <TabPane tab="资金信息" key="3">资金信息</TabPane>
    </Tabs>)
}

export default DataCenter;