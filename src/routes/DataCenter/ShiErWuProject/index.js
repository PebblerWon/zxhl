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

class ShiErWuProject extends React.Component{
	constructor(props){
		super(props)
		const{shierwuproject,dispatch,projectType} = this.props
		if(shierwuproject.needRefresh){
			dispatch({type:'shierwuproject/query',
					payload:{
						tabs:shierwuproject.tabs,
						filter:'',
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
			}})
			dispatch({type:'shierwuproject/notNeedRefresh'})
		}
	}
	shouldComponentUpdate(){
		const{shierwuproject,dispatch,projectType} = this.props
		if(shierwuproject.needRefresh){
			dispatch({type:'shierwuproject/query',
					payload:{
						tabs:shierwuproject.tabs,
						filter:'',
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
			}})
			dispatch({type:'shierwuproject/notNeedRefresh'})
			return false
		}
		return true
	}
	render(){
		//console.log(prop)
		const {projectType,shierwuproject,dispatch} = this.props;
		//需要刷新
		

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
					      let deleteModalRef = Modal.confirm({
					        title: '你真的想删除该条记录吗?',
					        onOk (e) {
					        	dispatch({
					        		type:'shierwuproject/remove',
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
		

		const tableProps={
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

		const newProjectProps={
			visible:shierwuproject.newProjectModal.visible,
			riverInfo:shierwuproject.riverInfo,
			submitSpin:shierwuproject.newProjectModal.submitSpin,
			hideModal(e){
				dispatch({
					type:'shierwuproject/hideNewModal'
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
			riverInfo:shierwuproject.riverInfo,
			item:shierwuproject.updateModal.currentItem,
			submitSpin:shierwuproject.updateModal.submitSpin,
			hideModal(e){
				dispatch({
					type:'shierwuproject/hideUpdateModal'
				})
			},
			onSubmit(e){
				//提交
				dispatch({
					type:'shierwuproject/updateProject',
					payload:e
				})
				/*//更新数据源
				dispatch({
					type:'shierwuproject/query',
					payload:{
						tabs:shierwuproject.tabs,
						filter:'',
						tree:shierwuproject.tree.selectedKeys,
						type:projectType
					}
				})*/
			}
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
									<HuaiHeTable ds={proDs(shierwuproject.huaiHeTable.ds)}  {...tableProps}/>
								</TabPane>
								<TabPane tab='长江流域' key='长江流域'>
									<ChangJiangTable ds={proDs(shierwuproject.changJiangTable.ds)}  {...tableProps}/>
								</TabPane>
								<TabPane tab='黄河流域' key='黄河流域'>
									<HuangHeTable ds={proDs(shierwuproject.huangHeTable.ds)}  {...tableProps}/>
								</TabPane>
								<TabPane tab='海河流域' key='海河流域'>
									<HaiHeTable ds={proDs(shierwuproject.haiHeTable.ds)}  {...tableProps}/>
								</TabPane>
								<TabPane tab='全部' key='全部'>
									<AllTable ds={proDs(shierwuproject.allTable.ds)}  {...tableProps}/>
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
				</Layout>
				{shierwuproject.newProjectModal.visible && <NewProject {...newProjectProps} type="shiErWu" newFeatureName={`${Math.random()*1000}`}/>} 
				{shierwuproject.updateModal.visible && <UpdateProject {...updateProjectProps} type="shiErWu"/>} 
			</div>
		)
	}
}


export default connect(
	({shierwuproject,river})=>({shierwuproject})
)(ShiErWuProject);