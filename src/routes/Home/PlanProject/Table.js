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
const Table1 = ()=>{
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
	const ds = {
		'total':{
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
		},
		'data':[
			{
			'所在流域':'淮河流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},
			{
			'所在流域':'黄河流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},{
			'所在流域':'长江流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},{
			'所在流域':'海河流域',
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
			},
		],
		'tableTitle':'全省规划项目治理情况表(按流域划分)'
	}
	
	
	const tableProps={
		title:()=><TableTitle text={ds.tableTitle} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		size:'small',
	}
	return(
		<div className={coStyle.table}  style={{width:'700px'}}>
			<Table {...tableProps}></Table>
		</div>
	)
}

const Table2 = ()=>{
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
	let ds = {
		'total':{
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
		},
		'data':[
			
		],
		'tableTitle':'全省河流流域面积在200~3000平方公里河流治理情况统计表(按流域汇总)'
	}
	HNCity.map(item=>{
		ds.data.push({
			'所在政区':item,
			'项目总个数':'242',
			'已治理项目数':'100',
			'未治理项目数':'42',
			'已审批项目数':'50',
			'未审批项目数':'50',
		})
	})
	const tableProps={
		title:()=><TableTitle text={ds.tableTitle} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
	}
	return(
		<div className={coStyle.table} style={{width:'880px'}}>
			<Table {...tableProps}></Table>
		</div>
	)
}
/*const Table3 = ()=>{
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
			render:(text)=>`${text}%`
		},{
			title:'投资(万元)',
			key:'投资',
			dataIndex:'投资',
			width:100,
		}
	]
	const ds = {
		'total':{
			'项目个数':'376',
			'治理长度':'4330.62',
			'投资':'837861.43'
		},
		'data':[
			{
			'所在地市':'郑州市',
			'项目个数':'25',
			'治理长度':'249.273',
			'投资':'56238'
			},
			{
			'所在地市':'郑州市',
			'项目个数':'25',
			'治理长度':'249.273',
			'投资':'56238'
			},{
			'所在地市':'郑州市',
			'项目个数':'25',
			'治理长度':'249.273',
			'投资':'56238'
			},{
			'所在地市':'郑州市',
			'项目个数':'25',
			'治理长度':'249.273',
			'投资':'56238'
			},{
			'所在地市':'郑州市',
			'项目个数':'25',
			'治理长度':'249.273',
			'投资':'56238'
			},{
			'所在地市':'郑州市',
			'项目个数':'25',
			'治理长度':'249.273',
			'投资':'56238'
			},
		],
		'tableTitle':'河南省中小河流治理项目已批复项目情况统计表'
	}
	const tableProps={
		title:()=><TableTitle text={ds.tableTitle} />,
		bordered:true,
		pagination:false,
		dataSource:proDs(ds),
		columns:columns,
		size:'small',
	}
	return(
		<div className={coStyle.table} style={{width:'880px'}}>
			<Table {...tableProps}/>
		</div>
	)
}*/

export default {Table1,Table2};