import React from 'react'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {Table1,Table2} from './Table'
import styles from './index.less'
import conStyle from '../../common.less'
const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const PlanProject = ({planProject,dispatch})=>{
	const table1Props={
		loading:planProject.loading,
		ds:planProject.table1.ds,
	}
	const table2Props={
		loading:planProject.loading,
		ds:planProject.table2.ds,
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">首页</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">规划项目</Breadcrumb.Item>
					</Breadcrumb>

				</Header>
					<Layout className='layout2'>
						<Content>
							<Tabs>
								<TabPane tab='按流域划分' key='1'>
									<Table1 {...table1Props} />
								</TabPane>
								<TabPane tab='按政区划分' key='2'>
									<Table2  {...table2Props} />
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({planProject})=>({planProject})
)(PlanProject);