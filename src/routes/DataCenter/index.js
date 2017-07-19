import { Tabs, Radio } from 'antd';
import styles from './index.less'
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

const DataCenter=()=>{
  return(
    <Tabs
      tabPosition='left'
      className={styles.container}
    >
      <TabPane tab="河流信息" key="1">河流信息</TabPane>
      <TabPane tab="项目信息" key="2">项目信息</TabPane>
      <TabPane tab="资金信息" key="3">资金信息</TabPane>
    </Tabs>)
}

export default DataCenter;