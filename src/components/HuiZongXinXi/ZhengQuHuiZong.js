//按政区汇总表
import React from 'react'
import classnames from 'classnames'
import TableTitle from '../Common/TableTitle'
import {Table,Button} from 'antd'
import conStyle from '../../routes/common.less'
import styles from './table.less'

const columnsRender1 = (text,record,index)=>{
	if(record.dataSource){
		return {
			children:text,
				props:{
					colSpan:21
				}
		}
	}else{
		return{
			children:text,
			props:{}
		}
	}
	
}
const columnsRender2 = (text,record,index)=>{
	if(record.dataSource){
		return {
			children:text,
				props:{
					colSpan:0
				}
		}
	}else{
		return{
			children:text,
			props:{}
		}
	}
	
}

const columns = [
	{
		title:'项目名称',
		dataIndex:'项目名称',
		key:'项目名称',
		width:200,
		render:columnsRender1
	},
	{
		title:'基本情况',
		children:[
			{
				title:'河流水系',
				children:[
					{
						title:'所在水资源一级区',
						dataIndex:'所在水资源一级区',
						key:'所在水资源一级区',
						width:100,
						render:columnsRender2,
					},
					{
						title:'所属流域机构',
						dataIndex:'所属流域机构',
						key:'所属流域机构',
						width:100,
						render:columnsRender2,
					},
					{
						title:'所在水系',
						dataIndex:'所在水系',
						key:'所在水系',
						width:100,
						render:columnsRender2
					},
					{
						title:'所在河流',
						dataIndex:'所在河流',
						key:'所在河流',
						width:100,
						render:columnsRender2
					},
					{
						title:'所在河流流域面积Km²',
						dataIndex:'所在河流流域面积',
						key:'所在河流流域面积',
						width:100,
						render:columnsRender2
					},
					{
						title:'所在河流长度Km',
						dataIndex:'所在河流长度',
						key:'所在河流长度',
						width:100,
						render:columnsRender2
					}
				]
			},
			{
				title:'项目所在地点',
				children:[
					{
						title:'省级行政区',
						dataIndex:'省级行政区',
						key:'省级行政区',
						width:100,
						render:columnsRender2
					},{
						title:'地级行政区',
						dataIndex:'地级行政区',
						key:'地级行政区',
						width:100,
						render:columnsRender2
					},{
						title:'县级行政区',
						dataIndex:'县级行政区',
						key:'县级行政区',
						width:100,
						render:columnsRender2
					},
				]
			},
			{
				title:'项目起点',
				children:[
					{
						title:'东经',
						dataIndex:'东经1',
						key:'东经1',
						width:100,
						render:columnsRender2
					},{
						title:'北纬',
						dataIndex:'北纬1',
						key:'北纬1',
						width:100,
						render:columnsRender2
					},
				]
			},
			{
				title:'项目终点',
				children:[{
						title:'东经',
						dataIndex:'东经2',
						key:'东经2',
						width:100,
						render:columnsRender2
					},{
						title:'北纬',
						dataIndex:'北纬2',
						key:'北纬2',
						width:100,
						render:columnsRender2
					},]
			}
		]
	},
	{
		title:'项目分类',
		key:'项目分类',
		dataIndex:'项目分类',
		width:100,
        render:columnsRender2,
	},
	{
		title:'工程任务',
		key:'工程任务',
		dataIndex:'工程任务',
		width:100,
        render:columnsRender2,
	},
	{
		title:'主要建设内容',
		key:'主要建设内容',
		dataIndex:'主要建设内容',
		width:200,
        render:columnsRender2,
	},
	{
		title:'前期工作',
		children:[{
						title:'规划依据',
						dataIndex:'规划依据',
						key:'规划依据',
						width:100,
						render:columnsRender2
					},
					{
						title:'项目前期工作',
						dataIndex:'项目前期工作',
						key:'项目前期工作',
						width:100,
						render:columnsRender2
					},
					{
						title:'项目审批情况',
						dataIndex:'项目审批情况',
						key:'项目审批情况',
						width:100,
						render:columnsRender2
					},]
	},
	{
		title:'备注',
		dataIndex:'备注',
		key:'备注',
		width:100,
		render:columnsRender2
	}
];
const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const ZhengQuHuiZong=(props)=>{
    const {dataSource,title,scrollX,scrollY,exportProps,loading}=props
	//const title='河南省中小河流治理工程总体规划项目基本情况统计表(按所在地市划分)';
    const tableProps={
        title:(text)=><TableTitle text={title} />,
        bordered:true,
        scroll:{x:'1800px'},
        pagination:false,
        columns:columns,
        expandedRowRender:(record)=><Table {...subTableProps} dataSource={record.dataSource} className='subTable'/>,
        dataSource:dataSource
    }
    return (
    	<div className={classnames(
                {[conStyle.table]:true,[styles.table]:true}
            )}>
    		<div className={styles.export}>
    			<Button {...exportProps}>导出</Button>
    		</div>
    		<Table {...tableProps} />
    	</div>
	)
};

export default ZhengQuHuiZong;