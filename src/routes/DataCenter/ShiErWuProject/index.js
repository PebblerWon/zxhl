import React from 'react'
import {Button,Input,Breadcrumb,Tree,Layout,Tabs,Modal} from 'antd'
import {connect} from 'dva'
import DropOption from '../../../components/DropOptions'
import {HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable} from '../ProjectByWZ/ProjectInfo'
import NewProject from '../../MapC/NewProject'
import UpdateProject from '../../MapC/UpdateProject'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'
import styles from '../ProjectByWZ/index.less'

const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane
const proDs = (ds)=>{
	for(let i = 0;i<ds.length;i++){
		ds[i].key = i;
	}
	return ds;
}
const ShiErWuProject = (prop)=>{
	console.log(prop)
	const columns = [
		{ title: '项目名称',  dataIndex: '项目名称', key: '编码', width: 150,},
	   	{ title: '所在市',  dataIndex: '所在市', key: '所在市', width: 70,},
	   	{ title: '所在县',  dataIndex: '所在县', key: '所在县', width: 70,},
		{ title: '所属流域',  dataIndex: '所属流域', key: '所属流域',width: 100,},
		{ title: '所在河流', dataIndex: '所在河流', key: '所在河流', width: 100 },
		{
			title: '操作',
			key: 'operation',
			width: 100,
			render: (text,record) => {
				const handleMenuClick = (record, e) => {
					//console.log(record)
					//console.log(e)
				    if (e.key === 'update') {
				      	dispatch({
							type:'shierwuproject/showUpdateModal',
							payload:{
								currentItem:record,
							}
						})
				    } else if (e.key === 'delete') {
				      window.deleteModalRef = Modal.confirm({
				        title: '你真的想删除该条记录吗?',
				        onOk (e) {
				        	dispatch({
				        		type:'shierwuproject/remove',
				        		payload:record
				        	})
				        },
				        onCancel(){
				        	deleteModalRef.destroy()
				        }
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
	const {projectType,shierwuproject,dispatch} = prop;
	let searchRef ;
	const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}

	const tabsProps={
		activeKey:shierwuproject.tabs,
		onChange(activeKey){
			searchRef.input.refs.input.value=''
			if(shierwuproject[map[activeKey]].originDs.length==0){
				dispatch({
					type:'shierwuproject/query',
					payload:{
						tabs:activeKey,
						filter:'',
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
					}
				})
			}else{
				dispatch({
					type:'shierwuproject/browserQuery',
					payload:{
						tabs:activeKey,
						filter:'',
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
					}
				})
			}
		},
	}
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		selectedKeys:shierwuproject.tree.selectedKeys,
		onSelect(selectedKeys){
			searchRef.input.refs.input.value=''
			const activeTab = shierwuproject.tabs;
			if(shierwuproject[map[activeTab]].originDs.length==0){
				dispatch({
					type:'shierwuproject/query',
					payload:{
						tabs:activeTab,
						filter:'',
						tree:selectedKeys,
						type:projectType
					}
				})
			}else{
				dispatch({
					type:'shierwuproject/browserQuery',
					payload:{
						tabs:shierwuproject.tabs,
						filter:'',
						tree:selectedKeys,
						type:projectType
					}
				})
			}
		},
	}
	
	const searchProps={
		onSearch(value){
			const activeTab = shierwuproject.tabs;
			if(shierwuproject[map[activeTab]].originDs.length==0){
				dispatch({
					type:'shierwuproject/query',
					payload:{
						tabs:activeTab,
						filter:value,
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
					}
				})
			}else{
				dispatch({
					type:'shierwuproject/browserQuery',
					payload:{
						tabs:shierwuproject.tabs,
						filter:value,
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
					}
				})
			}

		},
	}
	const huaiHeTableProps={
		ds:proDs(shierwuproject.huaiHeTable.ds),
		loading:shierwuproject.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'shierwuproject/showUpdateModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const changJiangTableProps={
		ds:proDs(shierwuproject.changJiangTable.ds),
		loading:shierwuproject.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'shierwuproject/showUpdateModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const huangHeTableProps={
		ds:proDs(shierwuproject.huangHeTable.ds),
		loading:shierwuproject.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'shierwuproject/showUpdateModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const haiHeTableProps={
		ds:proDs(shierwuproject.haiHeTable.ds),
		loading:shierwuproject.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'shierwuproject/showUpdateModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const allTableProps={
		ds:proDs(shierwuproject.allTable.ds),
		loading:shierwuproject.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'shierwuproject/showUpdateModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	const detailModalProps={
		visible:shierwuproject.detailModal.visible,
		handleOk(e){
			dispatch({
				type:'shierwuproject/hideDetailModal'
			})
		},
		handleCancel(e){
			dispatch({
				type:'shierwuproject/hideDetailModal'
			})
		}
	}
	const newProjectProps={
		visible:shierwuproject.newProjectModal.visible,
		handleOk(e){
			dispatch({
				type:'shierwuproject/hideNewModal'
			})
		},
		handleCancel(e){
			let a = Modal.error({
		        title:'你的操作不会被保存，是否继续？',
				onOk(e){
					a.destroy();
					dispatch({
						type:'shierwuproject/hideNewModal'
					})
				},
				onCancel(){
					a.destroy()
				}
			})
			
		},
		onSubmit(e){
			dispatch({
				type:'shierwuproject/newProjectSubmit',
				payload:e
			})
		}
	}
	const updateProjectProps={
		visible:shierwuproject.updateModal.visible,
		currentItem:shierwuproject.updateModal.currentItem,
		handleCancel(e){
			let a = Modal.confirm({
				title:'你的操作不会被保存，是否继续？',
				onOk(e){
					a.destroy();
					dispatch({
						type:'shierwuproject/hideUpdateModal'
					})
				},
				onCancel(){
					a.destroy()
				}
			})
			
		},
		onSubmit(e){
			dispatch({
				type:'shierwuproject/updateProject',
				payload:e
			})
		}
	}

	const UpdateProjectModal=({handleCancel,visible,onSubmit,currentItem})=>{
		return(
			<Modal
	            title=""
	            visible={visible}
	            style={{ top: 20 }}
	            onCancel={handleCancel}
	            width='calc(~"100vw - 60px")'
	            height='calc(~"100vh - 90px")'
	            footer={null}
	        >
	        	<UpdateProject item={currentItem}  onCancel={handleCancel} onSubmit={onSubmit} type='shiErWu'/>
	        	{/*<div style={{width:'100vw',height:'100vh',background:'red'}}></div>*/}
	        </Modal>
		)
	}

	const DetailModal=({visible,handleOk,handleCancel})=>{
		return(
			<Modal
	          title=""
	          visible={visible}
	          onOk={handleOk}
	          onCancel={handleCancel}
	          width='1200px'
	        >
	          	<img width="100%" src="./resource/效果图/11查询信息-中小河流-项目详细信息编辑.jpg" />    
	        </Modal>
		)
	}

	const NewProjectModal=({visible,handleOk,handleCancel,onSubmit})=>{
		return(
			<Modal
	          title=""
	          style={{ top: 20 }}
	          visible={visible}
	          onOk={handleOk}
	          onCancel={handleCancel}
	          width='calc(~"100vw - 60px")'
	          height='calc(~"100vh - 90px")'
	          footer={null}
	        >
	        	<NewProject item={null} onSubmit={onSubmit} type='shiErWu'/>
	        </Modal>
		)
	}
	
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">查询信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">十二五项目</Breadcrumb.Item>
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
					<Content className='contentWithoutTree'>
						<Tabs {...tabsProps} tabBarExtraContent={
							<div style={{paddingRight:'50px'}} className={styles.tabBarExtraContent}>
								<Input.Search {...searchProps} ref={c=>searchRef=c}/>
								<Button type='primary' style={{marginLeft:'10px'}} onClick={
									(e)=>{
										dispatch({type:'shierwuproject/showNewModal'})
									}
								}>新建</Button>
							</div>
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
			{/*<DetailModal {...detailModalProps}/>*/}
			<NewProjectModal  {...newProjectProps}/>
			<UpdateProjectModal {...updateProjectProps} />
		</div>
	)
}


export default connect(
	({shierwuproject})=>({shierwuproject})
)(ShiErWuProject);