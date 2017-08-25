import React from 'react'
import {Input,Breadcrumb,Layout,Tabs,Button,Modal} from 'antd'
import {connect} from 'dva'
import DropOption from '../../../components/DropOptions'
import {HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable} from './RiverInfo'
import DetailModal from './DetailModal'
import UpdateModal from './UpdateModal'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'
import styles from './index.less'

const {Header,Content,Footer,Sider} = Layout
const TabPane = Tabs.TabPane
const proDs = (ds)=>{
	for(let i = 0;i<ds.length;i++){
		ds[i].key = i;
	}
	return ds;
}


const RiverByWZ = ({river,dispatch})=>{
	console.log(river)
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
				      dispatch({type:'river/showUpdateModal',payload:{
				      	currentItem:record,
				      }})
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
			if(river[map[activeKey]].originDs.length==0){
				dispatch({
					type:'river/query',
					payload:{
						tabs:activeKey,
						filter:''
					}
				})
			}else{
				dispatch({
					type:'river/browserQuery',
					payload:{
						tabs:activeKey,
						filter:'',
					}
				})
			}
			
		},
	}
	const searchProps={
		onSearch(value){
			dispatch({
				type:'river/browserQuery',
				payload:{
					tabs:river.tabs,
					filter:value
				}
			})
		},
	}
	const huaiHeTableProps={
		ds:proDs(river.huaiHeTable.ds),
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			console.log(e)
			dispatch({
				type:'river/showDetailModal',
				payload:{
					item:e
				}
			})
		}
	}
	const changJiangTableProps={
		ds:proDs(river.changJiangTable.ds),
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					item:e
				}
			})
		}
	}
	const huangHeTableProps={
		ds:proDs(river.huangHeTable.ds),
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					item:e
				}
			})
		}
	}
	const haiHeTableProps={
		ds:proDs(river.haiHeTable.ds),
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					item:e
				}
			})
		}
	}
	const allTableProps={
		ds:proDs(river.allTable.ds),
		loading:river.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					item:e
				}
			})
		}
	}
	const detailModalProps={
		visible:river.detailModal.visible,
		item:river.detailModal.item,
		onOk(e){
			dispatch({
				type:'river/hideDetailModal'
			})
		},
		onCancel(e){
			dispatch({
				type:'river/hideDetailModal'
			})
		}
	}
	const updateRiverModalProps={
		visible:river.updateModal.visible,
		item:river.updateModal.currentItem,
		onSubmit(e){
			dispatch({
				type:'river/update',
				payload:e
			})
		},
		handleCancel(e){
			dispatch({
				type:'river/hideUpdateModal'
			})
		}
	}
	const UpdateRiverModal=({visible,handleCancel,onSubmit,item})=>{
		return(
			<Modal
		        visible={visible}
		        onCancel={handleCancel}
		        width='700px'
		        footer={null}
	        >
	        	<UpdateModal item={item} onCancel={handleCancel} onSubmit={onSubmit} />
	        </Modal>
		)
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
							<div style={{paddingRight:'50px'}} className={styles.tabBarExtraContent}>
								<Input.Search {...searchProps} ref={c=>searchRef=c}/>
							</div>
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
					<UpdateRiverModal {...updateRiverModalProps} />
				</Layout>
			</Layout>
		</div>
	)
}


export default connect(
	({river})=>({river})
)(RiverByWZ);