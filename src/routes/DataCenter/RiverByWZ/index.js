import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs,
} from 'antd'
import {connect} from 'dva'
import {HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable} from './RiverInfo'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const RiverByWZ = ({river,dispatch,form})=>{
	let searchRef ;
	const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}
	const tabsProps={
		activeKey:river.tabs,
		onChange(activeKey){
			searchRef.input.refs.input.value=''
			if(river[map[activeKey]].ds.length==0){
				dispatch({
					type:'river/query',
					payload:{
						tabs:activeKey,
						filter:''
					}
				})
			}else{
				dispatch({
					type:'river/tabs',
					payload:activeKey
				})
			}
			
		},
	}
	const searchProps={
		onSearch(value){
			dispatch({
				type:'river/query',
				payload:{
					tabs:river.tabs,
					filter:value
				}
			})
		},
	}
	const huaiHeTableProps={
		ds:river.huaiHeTable.ds,
		loading:river.loading
	}
	const changJiangTableProps={
		ds:river.changJiangTable.ds,
		loading:river.loading
	}
	const huangHeTableProps={
		ds:river.huangHeTable.ds,
		loading:river.loading
	}
	const haiHeTableProps={
		ds:river.haiHeTable.ds,
		loading:river.loading
	}
	const allTableProps={
		ds:river.allTable.ds,
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
					<Content>
						<Tabs {...tabsProps} tabBarExtraContent={
							<div style={{paddingRight:'50px'}} ><Input.Search {...searchProps} ref={c=>searchRef=c}/></div>
						}>
							<TabPane tab='淮河流域' key='淮河流域'>
								<HuaiHeTable {...huaiHeTableProps}></HuaiHeTable>
							</TabPane>
							<TabPane tab='长江流域' key='长江流域'>
								<ChangJiangTable {...changJiangTableProps}></ChangJiangTable>
							</TabPane>
							<TabPane tab='黄河流域' key='黄河流域'>
								<HuangHeTable {...huangHeTableProps}></HuangHeTable>
							</TabPane>
							<TabPane tab='海河流域' key='海河流域'>
								<HaiHeTable {...haiHeTableProps}></HaiHeTable>
							</TabPane>
							<TabPane tab='全部' key='全部'>
								<AllTable {...allTableProps}></AllTable>
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