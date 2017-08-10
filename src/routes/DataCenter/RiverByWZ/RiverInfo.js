import React from 'react'
import { Row, Col,Table,Modal} from 'antd'
import classnames from 'classnames'
import TableTitle from '../../../components/Common/TableTitle'
import {HNCity} from '../../../utils/city'
import DropOption from '../../../components/DropOptions'

import coStyle from '../../common.less'
import styles from './index.less'



const HuaiHeTable=({ds,loading,onRowDoubleClick,columns})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small',
		onRowDoubleClick:onRowDoubleClick
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
const ChangJiangTable=({ds,loading,onRowDoubleClick,columns})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small',
		onRowDoubleClick:onRowDoubleClick
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
const HuangHeTable=({ds,loading,onRowDoubleClick,columns})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small',
		onRowDoubleClick:onRowDoubleClick
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
const HaiHeTable=({ds,loading,onRowDoubleClick,columns})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small',
		onRowDoubleClick:onRowDoubleClick
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

const AllTable=({ds,loading,onRowDoubleClick,columns})=>{
	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		loading,
		bordered:true,
		size:'small',
		onRowDoubleClick:onRowDoubleClick
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
