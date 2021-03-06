//灾后薄弱环节

import React from 'react'
import {Button,Input,Breadcrumb,Tree,Layout,Tabs,Modal} from 'antd'
import {connect} from 'dva'
import DropOption from '../../../components/DropOptions'
import {HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable} from './ProjectInfo'
import NewZaiHou from '../../MapC/NewZaiHou'
import UpdateZaiHou from '../../MapC/UpdateZaiHou'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'
import styles from './index.less'

const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane
const proDs = (ds)=>{
	for(let i = 0;i<ds.length;i++){
		ds[i].key = i;
	}
	return ds;
}
class ProjectByWZ extends React.Component{
	constructor(props){
		super(props)
		const {project,dispatch,projectType} = this.props
		if(project.needRefresh){
			dispatch({type:'project/query',
				payload:{
					tabs:project.tabs,
					filter:'',
					tree:project.tree.selectedKeys,
					type:projectType
			}})
			dispatch({type:'project/notNeedRefresh'})
		}
	}
	shouldComponentUpdate(){
		const {project,dispatch,projectType} = this.props
		if(project.needRefresh){
			dispatch({type:'project/query',
				payload:{
					tabs:project.tabs,
					filter:'',
					tree:project.tree.selectedKeys,
					type:projectType
			}})
			dispatch({type:'project/notNeedRefresh'})
			return false
		}
		return true
	}
	render(){
		//console.log('c: '+new Date().toLocaleString())
	//console.log(prop)
	const {projectType,project,dispatch} = this.props;
	//需要刷新
	

	const columns = [
		{ title: '项目名称',  dataIndex: '项目名称', key: '编码', width: 150,},
	   	{ title: '所在市',  dataIndex: '所在市', key: '所在市', width: 70,},
	   	{ title: '所在县',  dataIndex: '所在县', key: '所在县', width: 70,},
		{ title: '所属流域',  dataIndex: '所属流域', key: '所属流域',width: 100,},
		{ title: '所在河流', dataIndex: '所在河流', key: '所在河流', width: 100 },
		{ title: '治理年度', dataIndex: '治理年度', key: '治理年度', width: 70 ,
			render:(text,record)=>{
				let d = new Date(text)
				if(d.toString()==="Invalid Date"){
					return text
				}else{
					return d.getFullYear()
				}
			}
		},
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
							type:'project/showUpdateModal',
							payload:{
								currentItem:record,
							}
						})
				    } else if (e.key === 'delete') {
				      let deleteModalRef = Modal.confirm({
				        title: '你真的想删除该条记录吗?',
				        onOk (e) {
				        	dispatch({
				        		type:'project/remove',
				        		payload:record
				        	})
				        	deleteModalRef.destroy()
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
	
	let searchRef ;
	const map={'淮河流域':'huaiHeTable','黄河流域':'huangHeTable','长江流域':'changJiangTable','海河流域':'haiHeTable','全部':'allTable'}

	const tabsProps={
		activeKey:project.tabs,
		onChange(activeKey){
			searchRef.input.refs.input.value=''
			if(project[map[activeKey]].originDs.length==0){
				dispatch({
					type:'project/query',
					payload:{
						tabs:activeKey,
						filter:'',
						tree:project.tree.selectedKeys,
						type:projectType
					}
				})
			}else{
				dispatch({
					type:'project/browserQuery',
					payload:{
						tabs:activeKey,
						filter:'',
						tree:project.tree.selectedKeys,
						type:projectType
					}
				})
			}
		},
	}
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		selectedKeys:project.tree.selectedKeys,
		onSelect(selectedKeys){
			searchRef.input.refs.input.value=''
			const activeTab = project.tabs;
			if(project[map[activeTab]].originDs.length==0){
				dispatch({
					type:'project/query',
					payload:{
						tabs:activeTab,
						filter:'',
						tree:selectedKeys,
						type:projectType
					}
				})
			}else{
				dispatch({
					type:'project/browserQuery',
					payload:{
						tabs:project.tabs,
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
			const activeTab = project.tabs;
			if(project[map[activeTab]].originDs.length==0){
				dispatch({
					type:'project/query',
					payload:{
						tabs:activeTab,
						filter:value,
						tree:project.tree.selectedKeys,
						type:projectType
					}
				})
			}else{
				dispatch({
					type:'project/browserQuery',
					payload:{
						tabs:project.tabs,
						filter:value,
						tree:project.tree.selectedKeys,
						type:projectType
					}
				})
			}
			
		},
	}
	

	const tableProps={
		loading:project.loading,
		columns:columns,
		onRowDoubleClick(e){
			dispatch({
				type:'project/showUpdateModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	
	const newZaiHouProps={
		visible:project.newProjectModal.visible,
		riverInfo:project.riverInfo,
		submitSpin:project.newProjectModal.submitSpin,
		hideModal(e){
			dispatch({
				type:'project/hideNewModal'
			})
		},
		onSubmit(e){
			console.log('submit')
			dispatch({
				type:'project/newProjectSubmit',
				payload:e
			})
		}
	}
	const updateZaiHouProps={
		visible:project.updateModal.visible,
		riverInfo:project.riverInfo,
		item:project.updateModal.currentItem,
		submitSpin:project.updateModal.submitSpin,
		hideModal(e){
			dispatch({
				type:'project/hideUpdateModal'
			})
		},
		onSubmit(e){
			//提交
			dispatch({
				type:'project/updateProject',
				payload:e
			})
			
		}
	}

	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">查询信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">灾后薄弱环节</Breadcrumb.Item>
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
							<div style={{paddingRight:'50px'}}  className={styles.tabBarExtraContent}>
								<Input.Search {...searchProps} ref={c=>searchRef=c}/>
								<Button type='primary' style={{marginLeft:'10px'}} onClick={
									(e)=>{dispatch({type:'project/showNewModal'})}
								}>新建</Button>
							</div>
						}>
							<TabPane tab='淮河流域' key='淮河流域'>
								<HuaiHeTable ds={proDs(project.huaiHeTable.ds)}  {...tableProps}/>
							</TabPane>
							<TabPane tab='长江流域' key='长江流域'>
								<ChangJiangTable ds={proDs(project.changJiangTable.ds)}  {...tableProps}/>
							</TabPane>
							<TabPane tab='黄河流域' key='黄河流域'>
								<HuangHeTable ds={proDs(project.huangHeTable.ds)}  {...tableProps}/>
							</TabPane>
							<TabPane tab='海河流域' key='海河流域'>
								<HaiHeTable ds={proDs(project.haiHeTable.ds)}  {...tableProps}/>
							</TabPane>
							<TabPane tab='全部' key='全部'>
								<AllTable ds={proDs(project.allTable.ds)}  {...tableProps}/>
							</TabPane>
						</Tabs>
					</Content>
				</Layout>
			</Layout>

			{/*用一个随机数表示新添加的要素*/}
			{project.newProjectModal.visible && <NewZaiHou {...newZaiHouProps} type="newZaiHou" newFeatureName={`${Math.random()*1000}`}/>} 
			{project.updateModal.visible && <UpdateZaiHou {...updateZaiHouProps} type="updateZaiHou"/>} 
		</div>
	)
	}
}
export default connect(
	({project,river})=>({project})
)(ProjectByWZ);