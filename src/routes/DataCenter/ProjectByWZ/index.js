import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {connect} from 'dva'
import AllProject from './AllProject'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const ProjectByWZ = ({project,dispatch,form})=>{
	const tabsProps={
		activeKey:project.tabs,
		onChange(activeKey){
			dispatch({
				type:'project/query',
				payload:{
					tree:project.tree,
					tabs:activeKey
				}
			})
		},
	}
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		selectedKeys:project.tree,
		onSelect(selectedKeys){
			dispatch({
				type:'project/query',
				payload:{
					tree:selectedKeys,
					tabs:project.tabs
				}
			})
		},
	}
	const allProjectProps={
		ds:project.data,
		loading:project.loading
	}
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
							<Tree {...treeProps}>
								<TreeNode title='河南省' key='河南省'>
									{HNCity.map(item=><TreeNode title={item} key={item}/>)}
								</TreeNode>
							</Tree>
						</div>
						
					</Sider>
					<Content>
						<Tabs {...tabsProps}>
							<TabPane tab='淮河流域' key='淮河流域'>
								<AllProject  {...allProjectProps}/>
							</TabPane>
							<TabPane tab='长江流域' key='长江流域'>
								<AllProject  {...allProjectProps}/>
							</TabPane>
							<TabPane tab='黄河流域' key='黄河流域'>
								<AllProject  {...allProjectProps}/>
							</TabPane>
							<TabPane tab='海河流域' key='海河流域'>
								<AllProject  {...allProjectProps}/>
							</TabPane>
							<TabPane tab='全部' key='全部'>
								<AllProject  {...allProjectProps}/>
							</TabPane>
						</Tabs>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({project})=>({project})
)(ProjectByWZ);