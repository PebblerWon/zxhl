import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {Table1,Table2} from './Table'
import styles from './index.less'
const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const PlanProject = ({river,dispatch,form})=>{
	
	return(
		<div className={styles.planProject}>
			<Layout className='layout1'>
				<Content>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">首页</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">规划项目</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className='layout2'>
						<Content>
							<Tabs>
								<TabPane tab='按流域划分' key='1'>
									<Table1></Table1>
								</TabPane>
								<TabPane tab='按政区划分' key='2'>
									<Table2></Table2>
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
				</Content>
			</Layout>
		</div>
	)
}

export default PlanProject;