import React from 'react'
import classnames from 'classnames'
import TableTitle from '../../../components/Common/TableTitle'
import {Table,Button} from 'antd'
import conStyle from '../../common.less'
import styles from './index.less'

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


const Table1 = ({dataSource,exportProps,loading})=>{
	const columns=[
		{
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
		  		obj.props.colSpan=4
		  	}
		  	return obj;
		  }
		},
		{
			title:'项目名称',
			key:'项目名称',
			dataIndex:'项目名称',
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
		},
		{
			title:'地级行政区',
			key:'地级行政区',
			dataIndex:'地级行政区',
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
		},
		{
			title:'县级行政区',
			key:'县级行政区',
			dataIndex:'县级行政区',
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
		},
		{
			title:'治理河长(Km)',
			key:'治理河长',
			dataIndex:'治理河长',
			width:100,
		},
		{
			title:'批复及初审投资(万元)',
			key:'批复及初审投资',
			dataIndex:'批复及初审投资',
			width:100,
		},
		{
			title:'测算投资(万元)',
			key:'测算投资',
			dataIndex:'测算投资',
			width:100,
		},
		{
			title:'中央资金(万元)',
			key:'中央资金',
			dataIndex:'中央资金',
			width:100,
		},
		{
			title:'省级资金(万元)',
			key:'省级资金',
			dataIndex:'省级资金',
			width:100,
		},
		{
			title:'备注(万元)',
			key:'备注',
			dataIndex:'备注',
			width:100,
		}
	]
	const tableProps={
		title:()=><TableTitle text={`河南省2017年后续中小河流治理项目名单`} />,
		bordered:true,
		scroll:{y:window.innerHeight-360},
		pagination:false,
		dataSource:proDs(dataSource),
		columns:columns,
		size:'small',
		loading:loading
	}
	return(
		<div className={classnames(
                {[conStyle.table]:true,[styles.table]:true}
            )}>
			<div className={styles.export}>
    			<Button {...exportProps}>导出</Button>
    		</div>
			<Table {...tableProps}></Table>
		</div>
	)
}

export default Table1;