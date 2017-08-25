import React from 'react'
//import props from
import {Table,Layout,Tree} from 'antd'
import TableTitle from '../../../components/Common/TableTitle'
import coStyle from '../../common.less'
import {HNCity} from '../../../utils/city'

const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
//处理数据源的函数
const proDs = (ds)=>{
		let dataSource=[];
		if(ds&&ds.total){
			dataSource.push({
				'序号':'合计',
				'key':'total',
				...ds.total
			})
		}
		if(ds&&ds.data&&ds.data.length>0){
			ds.data.map((item,index)=>{
				dataSource.push({
					'序号':index+1,
					key:`data${index}`,
					...item
				})
			})
		}
		return dataSource;
}
const Table1 = ({ds,filter,loading})=>{
	/*console.log(ds)*/
	const columns=[{
		  title:'序号',
		  key:'序号',
		  dataIndex:'序号',
		  width:50,
		  render:(text,record,index)=>{
		  	let obj={
		  		children:text,
		  		props:{}
		  	}
		  	if(index==0){
		  		obj.props.colSpan=2
		  	}
		  	return obj;
		  }
		},{
			title:'所在流域',
			key:'所在流域',
			dataIndex:'所在流域',
			width:100,
			render:(text,record,index)=>{
				let obj={
			  		children:text,
			  		props:{}
			  	}
			  	if(index==0){
			  		obj.props.colSpan=0
			  	}
			  	return obj;
			}
		},{
			title:'条数',
			key:'条数',
			dataIndex:'条数',
			width:100,
		},{
			title:'所占百分比',
			key:'所占百分比',
			dataIndex:'所占百分比',
			width:100,
			render:(text)=>`${text}`
		},{
			title:'总河长(Km)',
			key:'总河长',
			dataIndex:'总河长',
			width:100,
		}
	]
	const tableProps={
		title:()=><TableTitle text={`河南省河流流域面积在200~3000平方公里河流汇总表(按流域划分)`} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		size:'small',
		loading:loading
	}
	return(
		<div className={coStyle.table}  style={{/*width:'700px',marginLeft:'100px'*/}}>
			<Table {...tableProps}></Table>
		</div>
	)
}

const Table2 = ({ds,filter,loading})=>{
	const columns=[{
		  title:'序号',
		  key:'序号',
		  dataIndex:'序号',
		  /*width:10,*/
		  render:(text,record,index)=>{
		  	let obj={
		  		children:text,
		  		props:{}
		  	}
		  	if(index==0){
		  		obj.props.colSpan=2
		  		//console.log(obj)
		  	}
		  	return obj;
		  }
		},{
			title:'所在流域',
			key:'所在流域',
			dataIndex:'所在流域',
			width:100,
			render:(text,record,index)=>{
				let obj={
			  		children:text,
			  		props:{}
			  	}
			  	if(index==0){
			  		obj.props.colSpan=0
			  	}
			  	return obj;
			}
		},{
			title:'河流条数',
			children:[
				{
					title:'总计',key:'总计',dataIndex:'总计河流条数',widht:50,
				},{
					title:'已治理河流数(条)',key:'已治理河流数',dataIndex:'已治理河流数',/*width:80,*/
				},{
					title:'已治理项目数(个)',key:'已治理项目数',dataIndex:'已治理项目数',/*width:80,*/
				},
			]
		},{
			title:'总河长(Km)',
			key:'总河长',
			dataIndex:'总河长',
			/*width:100,*/
		},{
			title:'200~3000平方公里已治理河流总长(Km)',
			key:'已治理长度',
			dataIndex:'已治理长度',
			width:150,
		},{
			title:'已治理河长占总河长的比例',
			key:'已治理河长占总河长的比例',
			dataIndex:'已治理河长占总河长的比例',
			/*width:150,*/
			render:(text)=>`${text}`
		},{
			title:'200~3000平方公里河流未治理长度(Km)',
			key:'未治理长度',
			dataIndex:'未治理长度',
			width:150,
		}
	]
	
	const proDs = (ds)=>{
		let dataSource=[];
		if(ds&&ds.total){
			dataSource.push({
				'序号':'合计',
				'key':'total',
				...ds.total
			})
		}
		if(ds.data&&ds.data.length>0){
			ds.data.map((item,index)=>{
				dataSource.push({
					'序号':index+1,
					key:`data${index}`,
					...item
				})
			})
		}
		return dataSource;
	}
	const tableProps={
		title:()=><TableTitle text={`河南省河流流域面积在200~3000平方公里河流治理情况统计表(按流域汇总)`} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		loading:loading,
	}
	return(
		<div className={coStyle.table} style={{}}>
			<Table {...tableProps}></Table>
		</div>
	)
}
const Table3 = ({ds,treeProps,loading})=>{
	const columns=[{
		  title:'序号',
		  key:'序号',
		  dataIndex:'序号',
		  width:50,
		  render:(text,record,index)=>{
		  	let obj={
		  		children:text,
		  		props:{}
		  	}
		  	if(index==0){
		  		obj.props.colSpan=2
		  		//console.log(obj)
		  	}
		  	return obj;
		  }
		},{
			title:'所在地市',
			key:'所在地市',
			dataIndex:'所在地市',
			width:100,
			render:(text,record,index)=>{
				let obj={
			  		children:text,
			  		props:{}
			  	}
			  	if(index==0){
			  		obj.props.colSpan=0
			  	}
			  	return obj;
			}
		},{
			title:'项目个数',
			key:'项目个数',
			dataIndex:'项目个数',
			width:100,
		},{
			title:'治理长度(Km)',
			key:'治理长度',
			dataIndex:'治理长度',
			width:100,
			render:(text)=>`${text}`
		},{
			title:'投资(万元)',
			key:'投资',
			dataIndex:'投资',
			width:100,
		}
	]
	
	const tableProps={
		title:()=><TableTitle text={`${treeProps['selectedKeys'][0]}中小河流治理项目已批复项目情况统计表`} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		size:'small',
		loading:loading
	}
	return(
		<Layout className='layout2'>
			<Sider width={130} className='sider'>
				<div className={coStyle.tree}>
					<Tree {...treeProps}>
						<TreeNode title='河南省' key='河南省'>
							{HNCity.map(item=><TreeNode title={item} key={item}/>)}
						</TreeNode>
					</Tree>
				</div>
				
			</Sider>
			<Content>
				<div className={coStyle.table} style={{/*width:'880px'*/}}>

					<Table {...tableProps}/>
				</div>
				
			</Content>
		</Layout>
	)
}

export default {Table1,Table2,Table3};