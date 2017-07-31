import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import HuaiHeProject from './HuaiHeProject'
import ChangJiangProject from './ChangJiangProject'
import AllProject from './AllProject'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const ProjectByWZ = ({river,dispatch,form})=>{
	
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">查询信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">规划项目</Breadcrumb.Item>
					</Breadcrumb>
				</Header>
				<Layout className='layout2'>
					<Sider width={130} className='sider'>
						<div className={conStyle.tree}>
							<Tree showLine defaultExpandAll={true} defaultSelectedKeys={['河南省']}>
								<TreeNode title='河南省' key='河南省'>
									{HNCity.map(item=><TreeNode title={item} key={item}/>)}
								</TreeNode>
							</Tree>
						</div>
						
					</Sider>
					<Content>
						<Tabs>
							<TabPane tab='淮河流域' key='1'>
								<AllProject />
							</TabPane>
							<TabPane tab='长江流域' key='2'>
								<AllProject />
							</TabPane>
							<TabPane tab='黄河流域' key='3'>
								<AllProject />
							</TabPane>
							<TabPane tab='海河流域' key='4'>
								<AllProject />
							</TabPane>
							<TabPane tab='全部' key='5'>
								<AllProject />
							</TabPane>
						</Tabs>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default ProjectByWZ;