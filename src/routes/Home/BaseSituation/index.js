import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {Table1,Table2,Table3} from './Table' 
import styles from './index.less'
import conStyle from '../../common.less'
const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const BaseSituation = ({river,dispatch,form})=>{
	
	return(
		<div className={styles.baseSituation}>
			<Layout className='layout1'>
				<Content>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">首页</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">基本情况</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className='layout2'>
						<Sider width={150} className='sider'>
							<div className={conStyle.tree}>
								<Tree showLine defaultExpandAll={true} >
									<TreeNode title='河南省'>
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
										<TreeNode title="郑州市" />
									</TreeNode>
								</Tree>
							</div>
							
						</Sider>
						<Content>
							<Tabs>
								<TabPane tab='中小河流统计' key='1'>
									<Table1></Table1>
								</TabPane>
								<TabPane tab='十二五治理情况统计' key='2'>
									<Table2></Table2>
								</TabPane>
								<TabPane tab='十二五已治理项目' key='3'>
									<Table3></Table3>
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
				</Content>
			</Layout>
		</div>
	)
}

export default BaseSituation;