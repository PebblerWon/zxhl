import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {connect} from 'dva'
import RiverInfo from './RiverInfo'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'


const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const RiverByWZ = ({river,dispatch,form})=>{
	const tabsProps={
		activeKey:river.tabs,
		onChange(activeKey){
			dispatch({
				type:'river/query',
				payload:{
					tree:river.tree,
					tabs:activeKey
				}
			})
		},
	}
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		selectedKeys:river.tree,
		onSelect(selectedKeys){
			dispatch({
				type:'river/query',
				payload:{
					tree:selectedKeys,
					tabs:river.tabs
				}
			})
		},
	}
	const riverInfoProps={
		ds:river.data,
		loading:river.loading
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">查询信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">河流信息</Breadcrumb.Item>
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
								<RiverInfo {...riverInfoProps} />
								{/*<RiverInfo  ds={{'所属流域':'淮河流域','河流名称':'东沙河'}}/>*/}
							</TabPane>
							<TabPane tab='长江流域' key='长江流域'>
								<RiverInfo {...riverInfoProps} />
								{/*<RiverInfo  ds={{'所属流域':'长江流域','河流名称':'湍河'}} />*/}
							</TabPane>
							<TabPane tab='黄河流域' key='黄河流域'>
								<RiverInfo {...riverInfoProps} />
								{/*<RiverInfo  ds={{'所属流域':'黄河流域','河流名称':'洪阳河'}} />*/}
							</TabPane>
							<TabPane tab='海河流域' key='海河流域'>
								<RiverInfo {...riverInfoProps} />
								{/*<RiverInfo  ds={{'所属流域':'海河流域','河流名称':'山门河'}} />*/}
							</TabPane>
							<TabPane tab='全部' key='全部'>
								<RiverInfo {...riverInfoProps} />
								{/*<RiverInfo  ds={{}} />*/}
							</TabPane>
						</Tabs>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({river})=>({river})
)(RiverByWZ);