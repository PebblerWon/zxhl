import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {connect} from 'dva'
import {HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable} from '../ProjectByWZ/ProjectInfo'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const ShiErWuProject = (prop)=>{
	const {projectType,shiErWuProject,dispatch} = prop;
	let searchRef ;
	const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}

	const tabsProps={
		activeKey:shiErWuProject.tabs,
		onChange(activeKey){
			searchRef.input.refs.input.value=''
			
			dispatch({
				type:'shiErWuProject/query',
				payload:{
					tabs:activeKey,
					filter:'',
					tree:shiErWuProject.tree.selectedKeys,
					type:shiErWuProjectType
				}
			})
			
		},
	}
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		selectedKeys:shiErWuProject.tree.selectedKeys,
		onSelect(selectedKeys){
			searchRef.input.refs.input.value=''
			dispatch({
				type:'shiErWuProject/query',
				payload:{
					tabs:shiErWuProject.tabs,
					filter:'',
					tree:selectedKeys,
					type:shiErWuProjectType
				}
			})
		},
	}
	
	const searchProps={
		onSearch(value){
			dispatch({
				type:'shiErWuProject/query',
				payload:{
					tabs:shiErWuProject.tabs,
					filter:value,
					tree:shiErWuProject.tree.selectedKeys,
					type:projectType
				}
			})
		},
	}
	const huaiHeTableProps={
		ds:shiErWuProject.huaiHeTable.ds,
		loading:shiErWuProject.loading
	}
	const changJiangTableProps={
		ds:shiErWuProject.changJiangTable.ds,
		loading:shiErWuProject.loading
	}
	const huangHeTableProps={
		ds:shiErWuProject.huangHeTable.ds,
		loading:shiErWuProject.loading
	}
	const haiHeTableProps={
		ds:shiErWuProject.haiHeTable.ds,
		loading:shiErWuProject.loading
	}
	const allTableProps={
		ds:shiErWuProject.allTable.ds,
		loading:shiErWuProject.loading
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
						<Tabs {...tabsProps} tabBarExtraContent={
							<div style={{paddingRight:'50px'}} ><Input.Search {...searchProps} ref={c=>searchRef=c}/></div>
						}>
							<TabPane tab='淮河流域' key='淮河流域'>
								<HuaiHeTable  {...huaiHeTableProps}/>
							</TabPane>
							<TabPane tab='长江流域' key='长江流域'>
								<ChangJiangTable  {...changJiangTableProps}/>
							</TabPane>
							<TabPane tab='黄河流域' key='黄河流域'>
								<HuangHeTable  {...huangHeTableProps}/>
							</TabPane>
							<TabPane tab='海河流域' key='海河流域'>
								<HaiHeTable  {...haiHeTableProps}/>
							</TabPane>
							<TabPane tab='全部' key='全部'>
								<AllTable  {...allTableProps}/>
							</TabPane>
						</Tabs>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({shiErWuProject})=>({shiErWuProject})
)(ShiErWuProject);