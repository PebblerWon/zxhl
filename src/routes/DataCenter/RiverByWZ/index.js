import React from 'react'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs,Modal
} from 'antd'
import {connect} from 'dva'
import DropOption from '../../../components/DropOptions'
import {HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable} from './RiverInfo'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane



const RiverByWZ = ({river,dispatch,form})=>{
	let searchRef ;
	let deleteModalRef;
	const columns = [
		{ title: '编码',  dataIndex: '编码', key: '编码',width:50, },
	   	{ title: '河流名称',  dataIndex: '河流名称', key: '河流名称'},
		{ title: '所属流域',  dataIndex: '所属流域', key: '所属流域' },
		{ title: '所在水系', dataIndex: '所在水系', key: '所在水系', },
		{ title: '河流长度(Km)', dataIndex: '河流长度', key: '河流长度',width:120 },
		{ title: '治理项目', dataIndex: '治理项目', key: '治理项目',width:100, },
		{ title: '规划项目', dataIndex: '规划项目', key: '规划项目', width:100,},
		{ title: '流经地', dataIndex: '流经地', key: '流经地',width:200, },
		{
			title: '操作',
			key: 'operation',
		 	width:50,
			render: (text,record) => {
				const handleMenuClick = (record, e) => {
					//console.log(record)
					//console.log(e)
				    if (e.key === 'update') {
				      dispatch({type:'river/showDetailModal'})
				    } else if (e.key === 'delete') {
				      deleteModalRef = Modal.confirm({
				        title: '你真的想删除该条记录吗?',
				        visible:'',
				        onOk (e) {
				        	console.log(e)
				        	deleteModalRef.destroy();
				        },
				        onCancel(e){
				        	console.log(e)
				        	deleteModalRef.destroy();
				        },
				      })
				    }
			  	}
			  	return <DropOption 
					onMenuClick={e => handleMenuClick(record,e)}
					menuOptions={[
						{ key: 'update', name: '编辑' }, 
						{ key: 'delete', name: '删除' }, 
					]}/>
			}
		},
	];
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
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const changJiangTableProps={
		ds:river.changJiangTable.ds,
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const huangHeTableProps={
		ds:river.huangHeTable.ds,
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const haiHeTableProps={
		ds:river.haiHeTable.ds,
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const allTableProps={
		ds:river.allTable.ds,
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const detailModalProps={
		visible:river.detailModal.visible,
		handleOk(e){
			dispatch({
				type:'river/hideDetailModal'
			})
		},
		handleCancel(e){
			dispatch({
				type:'river/hideDetailModal'
			})
		}
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
					<DetailModal {...detailModalProps} />

				</Layout>
			</Layout>
		</div>
	)
}
const DetailModal=({visible,handleOk,handleCancel})=>{
	return(
		<Modal
          title="河流详细信息"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width='700px'
        >
          <Card>
          	<img width="100%" src="./resource/效果图/7查询信息-中小河流-河流详细信息.jpg" />
          </Card>
        </Modal>
	)
}

export default connect(
	({river})=>({river})
)(RiverByWZ);