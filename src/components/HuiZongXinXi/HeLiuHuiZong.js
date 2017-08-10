//按河流汇总表
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
					colSpan:11
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
            title:'河流名称',
            dataIndex:'河流名称',
            key:'河流名称',
            width:100,
            render:columnsRender1,
        },{
            title:'河流基本情况',
            children:[
                {
                    title:'所在流域',
                    key:'所在流域',
                    dataIndex:'所在流域',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'流域面积',
                    key:'流域面积',
                    dataIndex:'流域面积',
                    width:100,
                    render:columnsRender2,
                },
            ]

        },{
            title:'总河长',
            dataIndex:'总河长',
            key:'总河长',
            width:100,
            render:columnsRender2,
        },/*{
            title:'已治理长度',
            dataIndex:'已治理长度',
            key:'已治理长度',
            width:100,
            render:columnsRender2,
        },{
            title:'未治理长度',
            dataIndex:'未治理长度',
            key:'未治理长度',
            width:100,
            render:columnsRender2,
        },{
            title:'“十二五”期间治理项目',
            children:[
                {
                    title:'地级行政区',
                    key:'十二五地级行政区',
                    dataIndex:'十二五地级行政区',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'县级行政区',
                    key:'十二五县级行政区',
                    dataIndex:'十二五县级行政区',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'治理段',
                    key:'十二五治理段',
                    dataIndex:'十二五治理段',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'治理长度(Km)',
                    key:'十二五治理长度',
                    dataIndex:'十二五治理长度',
                    width:100,
                    render:columnsRender2,
                }
            ]
        },*/{
            title:'总体规划治理项目',
            children:[
                {
                    title:'地级行政区',
                    key:'地级行政区',
                    dataIndex:'地级行政区',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'县级行政区',
                    key:'县级行政区',
                    dataIndex:'县级行政区',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'治理段',
                    key:'治理段',
                    dataIndex:'治理段',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'治理长度(Km)',
                    key:'治理长度',
                    dataIndex:'治理长度',
                    width:100,
                    render:columnsRender2,
                },{
                    title:'投资(万元)',
                    key:'投资',
                    dataIndex:'投资',
                    width:100,
                    render:columnsRender2,
                }
            ]
        },{
            title:'第一次水利普查序号',
            dataIndex:'第一次水利普查序号',
            key:'第一次水利普查序号',
            width:100,
            render:columnsRender2,
        },{
            title:'河流流经地',
            dataIndex:'河流流经地',
            key:'河流流经地',
            width:100,
            render:columnsRender2,
        }
];

const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const HeLiuHuiZong=(props)=>{
    const {dataSource,title,scrollX,scrollY,exportProps,loading}=props
    const tableProps={
        loading,
        title:(text)=><TableTitle text={title} />,
        bordered:true,
        //scroll:{x:'1800px'},
        pagination:false,
        columns:columns,
        expandedRowRender:(record)=>{
            let res;
            res=record.dataSource? <Table {...subTableProps} dataSource={record.dataSource} className='subTable'/>:false
            return res;
        },
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

export default HeLiuHuiZong;