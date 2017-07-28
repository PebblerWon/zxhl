import React from 'react'
import {Table} from 'antd'
import TableTitle from '../../../components/Common/TableTitle'
import coStyle from '../../common.less'

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
			title:'条数',
			key:'条数',
			dataIndex:'条数',
			width:100,
		},{
			title:'所占百分比',
			key:'所占百分比',
			dataIndex:'所占百分比',
			width:100,
			render:(text)=>`${text}%`
		},{
			title:'总河长(Km)',
			key:'总河长',
			dataIndex:'总河长',
			width:100,
		}
	]
	const ds = {
		'total':{
			'条数':'242',
			'所占百分比':'100.00',
			'总河长':'15886'
		},
		'data':[
			{
			'所在流域':'淮河流域',
			'条数':'134',
			'所占百分比':'55.37',
			'总河长':'9332'
			},
			{
			'所在流域':'黄河流域',
			'条数':'38',
			'所占百分比':'15.70',
			'总河长':'2056'
			},{
			'所在流域':'长江流域',
			'条数':'46',
			'所占百分比':'19.01',
			'总河长':'3026'
			},{
			'所在流域':'海河流域',
			'条数':'24',
			'所占百分比':'9.92',
			'总河长':'1472'
			},
		],
		'tableTitle':'全省河流流域面积在200~3000平方公里河流汇总表(按流域划分)'
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
		  width:10,
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
			title:'河流条数',
			width:220,
			children:[
				{
					title:'总计',key:'总计',dataIndex:'总计河流条数',widht:60,
				},{
					title:'已治理河流数(条)',key:'已治理河流数',dataIndex:'已治理河流数',width:80,
				},{
					title:'已治理项目数(个)',key:'已治理项目数',dataIndex:'已治理项目数',width:80,
				},
			]
		},{
			title:'总河长(Km)',
			key:'总河长',
			dataIndex:'总河长',
			width:100,
		},{
			title:'200~3000平方公里已治理河流总长(Km)',
			key:'已治理长度',
			dataIndex:'已治理长度',
			width:130,
		},{
			title:'已治理河长占总河长的比例',
			key:'已治理河长占总河长的比例',
			dataIndex:'已治理河长占总河长的比例',
			width:150,
			render:(text)=>`${text}%`
		},{
			title:'200~3000平方公里河流未治理长度(Km)',
			key:'未治理长度',
			dataIndex:'未治理长度',
			width:150,
		}
	]
	const ds = {
		'total':{
			'总计河流条数':'242',
			'已治理河流数':'221',
			'已治理项目数':'376',
			'总河长':'15886',
			'已治理长度':'3365.73',
			'已治理河长占总河长的比例':'21.19',
			'未治理长度':'12520.27'
		},
		'data':[
			{
			'所在流域':'淮河流域',
			'总计河流条数':'134',
			'已治理河流数':'107',
			'已治理项目数':'176',
			'总河长':'9332',
			'已治理长度':'1866.35',
			'已治理河长占总河长的比例':'20.00',
			'未治理长度':'7465.64'
			},
			{
			'所在流域':'黄河流域',
			'总计河流条数':'242',
			'已治理河流数':'221',
			'已治理项目数':'376',
			'总河长':'15886',
			'已治理长度':'3365.73',
			'已治理河长占总河长的比例':'21.19',
			'未治理长度':'12520.27'
			},{
			'所在流域':'长江流域',
			'总计河流条数':'242',
			'已治理河流数':'221',
			'已治理项目数':'376',
			'总河长':'15886',
			'已治理长度':'3365.73',
			'已治理河长占总河长的比例':'21.19',
			'未治理长度':'12520.27'
			},{
			'所在流域':'海河流域',
			'总计河流条数':'242',
			'已治理河流数':'221',
			'已治理项目数':'376',
			'总河长':'15886',
			'已治理长度':'3365.73',
			'已治理河长占总河长的比例':'21.19',
			'未治理长度':'12520.27'
			},
		],
		'tableTitle':'全省河流流域面积在200~3000平方公里河流治理情况统计表(按流域汇总)'
	}
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
const Table3 = ()=>{
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
}

export default {Table1,Table2,Table3};