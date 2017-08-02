import React from 'react'
import { Row, Col,Table,Modal} from 'antd'
import classnames from 'classnames'
import TableTitle from '../../../components/Common/TableTitle'
import {HNCity} from '../../../utils/city'
import DropOption from '../../../components/DropOptions'

import coStyle from '../../common.less'
import styles from './index.less'


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
					console.log(record)
					console.log(e)
				    if (e.key === 'update') {
				      //onEditItem(record)
				    } else if (e.key === 'delete') {
				      Modal.confirm({
				        title: '你真的想删除该条记录吗?',
				        onOk (e) {
				        	console.log(e)
				        },
				        onCancel(e){
				        	console.log(e)
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
const HuaiHeTable=({ds,loading})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small'
		/*onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}*/
	}
	return(
		<div className={
			classnames(
				{[coStyle.table]:true,[styles.riverTable]:true}
			)
		}>
	    	<Table {...tableProps}/>
	    </div>
	)
}
const ChangJiangTable=({ds,loading})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small'
		/*onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}*/
	}
	return(
		
		<div className={
			classnames(
				{[coStyle.table]:true,[styles.riverTable]:true}
			)
		}>
	    	<Table {...tableProps}/>
	    </div>
	)
}
const HuangHeTable=({ds,loading})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small'
		/*onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}*/
	}
	return(
		
		<div className={
			classnames(
				{[coStyle.table]:true,[styles.riverTable]:true}
			)
		}>
	    	<Table {...tableProps}/>
	    </div>
	)
}
const HaiHeTable=({ds,loading})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small'
		/*onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}*/
	}
	return(
		
		<div className={
			classnames(
				{[coStyle.table]:true,[styles.riverTable]:true}
			)
		}>
	    	<Table {...tableProps}/>
	    </div>
	)
}

const AllTable=({ds,loading})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small'
		/*onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}*/
	}
	return(
		
		<div className={
			classnames(
				{[coStyle.table]:true,[styles.riverTable]:true}
			)
		}>
	    	<Table {...tableProps}/>
	    </div>
	)
}

export default {
	HuaiHeTable,ChangJiangTable,HuangHeTable,HaiHeTable,AllTable
}
