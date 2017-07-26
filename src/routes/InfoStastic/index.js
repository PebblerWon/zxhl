import { Tabs, Radio ,Button} from 'antd';
import ProjectAll from './ProjectAll'
import StasticGraph from './StasticGraph'
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
      <TabPane tab="统计图表" key="2">
        <StasticGraph />
      </TabPane>
    </Tabs>)
}

export default DataCenter;