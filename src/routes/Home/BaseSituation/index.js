import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {HNCity} from '../../../utils/city'
import {Table1,Table2,Table3} from './Table' 
import styles from './index.less'
import conStyle from '../../common.less'
const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const BaseSituation = ({river,dispatch,form})=>{
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		defaultSelectedKeys:['河南省'],
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">首页</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">基本情况</Breadcrumb.Item>
					</Breadcrumb>

				</Header>
					<Layout className='layout2'>
						<Sider width={130} className='sider'>
							<div className={conStyle.tree}>
								<Tree {...treeProps}>
									<TreeNode title='河南省' key='河南省'>
										{HNCity.map(item=><TreeNode title={item} key={item}/>)}
									</TreeNode>
								</Tree>
							</div>
							
						</Sider>
						<Content>
							<Tabs>
								<TabPane tab='中小河流统计' key='1'>
									<Table1 />
								</TabPane>
								<TabPane tab='十二五治理情况统计' key='2'>
									<Table2 />
								</TabPane>
								<TabPane tab='十二五已治理项目' key='3'>
									<Table3 />
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
			</Layout>
		</div>
	)
}

export default BaseSituation;