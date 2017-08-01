import React from 'react'
import {Table} from 'antd'
import TableTitle from '../../../components/Common/TableTitle'
import coStyle from '../../common.less'
import {HNCity} from '../../../utils/city'

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
const Table1 = ({ds,loading})=>{
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
		  		console.log(obj)
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
			title:'项目总个数',
			key:'项目总个数',
			dataIndex:'项目总个数',
			width:100,
		},{
			title:'已治理项目数',
			key:'已治理项目数',
			dataIndex:'已治理项目数',
			width:100,
			render:(text)=>`${text}%`
		},{
			title:'未治理项目数',
			key:'未治理项目数',
			dataIndex:'未治理项目数',
			width:100,
			render:(text)=>`${text}%`
		},,{
			title:'已审批项目数',
			key:'已审批项目数',
			dataIndex:'已审批项目数',
			width:100,
			render:(text)=>`${text}%`
		},{
			title:'未审批项目数',
			key:'未审批项目数',
			dataIndex:'未审批项目数',
			width:100,
			render:(text)=>`${text}%`
		}
	]
	
	
	
	const tableProps={
		title:()=><TableTitle text={ds.tableTitle} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		size:'small',
		loading,
	}
	return(
		<div className={coStyle.table}  style={{width:'700px',marginLeft:'150px'}}>
			<Table {...tableProps}></Table>
		</div>
	)
}

const Table2 = ({ds,loading})=>{
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
		  		console.log(obj)
		  	}
		  	return obj;
		  }
		},{
			title:'所在政区',
			key:'所在政区',
			dataIndex:'所在政区',
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
			title:'项目总个数',
			key:'项目总个数',
			dataIndex:'项目总个数',
			width:100,
		},{
			title:'已治理项目数',
			key:'已治理项目数',
			dataIndex:'已治理项目数',
			width:100,
			render:(text)=>`${text}`
		},{
			title:'未治理项目数',
			key:'未治理项目数',
			dataIndex:'未治理项目数',
			width:100,
			render:(text)=>`${text}`
		},,{
			title:'已审批项目数',
			key:'已审批项目数',
			dataIndex:'已审批项目数',
			width:100,
			render:(text)=>`${text}`
		},{
			title:'未审批项目数',
			key:'未审批项目数',
			dataIndex:'未审批项目数',
			width:100,
			render:(text)=>`${text}`
		}
	]
	
	const tableProps={
		title:()=><TableTitle text={ds.tableTitle} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		loading
	}
	return(
		<div className={coStyle.table} style={{width:'880px',marginLeft:'100px'}}>
			<Table {...tableProps}></Table>
		</div>
	)
}

export default {Table1,Table2};