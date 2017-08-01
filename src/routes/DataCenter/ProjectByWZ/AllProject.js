import React from 'react'
import { Row, Col,Table,Modal} from 'antd'
import classnames from 'classnames'
import TableTitle from '../../../components/Common/TableTitle'
import coStyle from '../../common.less'
import styles from './index.less'
import {HNCity} from '../../../utils/city'
import DropOption from '../../../components/DropOptions'

const RiverInfo = ({ds,loading})=>{
	
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
					console.log(record)
					console.log(e)
				    if (e.key === 'update') {
				      //onEditItem(record)
				    } else if (e.key === 'delete') {
				      Modal.confirm({
				        title: '你真的想删除该条记录吗?',
				        onOk () {
				        },
				      })
				    }
			  	}
			  	return <DropOption 
					onMenuClick={e => handleMenuClick(record,e)}
					menuOptions={[
						{ key: 'update', name: '编辑' }, 
						{ key: 'delete', name: '删除' }, 
						{ key: 'detail', name: '详情' }
					]}/>
			}
		},
	];
	
	

	const tableProps={
		columns:columns, 
		dataSource:ds,
		pagination:false,
		size:'small',
		bordered:true,
		loading,
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	
	return(
		
		<div className={
			classnames(
				{[coStyle.table]:true,[styles.allProject]:true}
			)
		}>
	    	<Table {...tableProps}/>
	    </div>
	)
}

export default RiverInfo
