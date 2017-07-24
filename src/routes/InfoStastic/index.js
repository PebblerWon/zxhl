import { Tabs, Radio ,Button} from 'antd';
import ProjectAll from './ProjectAll'
import styles from './index.less'
const TabPane = Tabs.TabPane;

const DataCenter=()=>{
  return(
    <Tabs
      tabPosition='left'
      className={styles.container}
    >
      <TabPane tab="项目汇总" key="1">
        <ProjectAll />
      </TabPane>
      <TabPane tab="对比分析" key="2">对比</TabPane>
      <TabPane tab="资金信息1231rw1f3w1" key="3">资金信息</TabPane>
    </Tabs>)
}

export default DataCenter;