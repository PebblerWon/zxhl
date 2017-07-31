import React from 'react'
import { Row, Col,Table,Modal} from 'antd'

import TableTitle from '../../../components/Common/TableTitle'
import coStyle from '../../common.less'
import {HNCity} from '../../../utils/city'
import DropOption from '../../../components/DropOptions'

const RiverInfo = ({ds,loading})=>{
	
	const columns = [
		{ title: '编码',  dataIndex: '编码', key: '编码', },
	   	{ title: '河流名称',  dataIndex: '河流名称', key: '河流名称'},
		{ title: '所属流域',  dataIndex: '所属流域', key: '所属流域' },
		{ title: '所在水系', dataIndex: '所在水系', key: '所在水系', },
		{ title: '河流长度(Km)', dataIndex: '河流长度', key: '河流长度' },
		{ title: '治理项目', dataIndex: '治理项目', key: '治理项目', },
		{ title: '规划项目', dataIndex: '规划项目', key: '规划项目', },
		{
			title: '操作',
			key: 'operation',
		 
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
		
		<div className={coStyle.table}>
	    	<Table {...tableProps}/>
	    </div>
	)
}

export default RiverInfo
