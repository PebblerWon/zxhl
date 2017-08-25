import React from 'react'
import {Table,Button} from 'antd'
import TableTitle from '../../../components/Common/TableTitle'
import classnames from 'classnames'
import conStyle from '../../common.less'
import styles from './index.less'


const proDs = (ds)=>{
        let dataSource=[];
        if(ds&&ds.total){
            dataSource.push({
                'key':'total',
                ...ds.total
            })
        }
        if(ds&&ds.data&&ds.data.length>0){
            ds.data.map((item,index)=>{
                let findex = index
                if(item.dataSource){
                    item.dataSource.map((subItem,index)=>{
                        subItem.key = `sub${findex}-${index}`
                    })
                }
                dataSource.push({
                    key:`data${index}`,
                    ...item
                })
            })
        }
        return dataSource;
}
const columnsRender1 = (text,record,index)=>{
    //判断是否存在项目名称字段主要是为了区分子表
	if(record['序号']=='合计' || record.dataSource){
		return {
			children:text,
				props:{
					colSpan:6
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
    if(record['序号'] == '合计' || record.dataSource){
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
            title:'序号',
            dataIndex:'序号',
            key:'序号',
            render:columnsRender1,
        },
  		{
            title:'项目名称',
            dataIndex:'项目名称',
            key:'项目名称',
            width:200,
            render:columnsRender2,
        },
        {
        	title:'基本情况',
        	children:[
		        {
		        	title:'所在河流',
		        	children:[
		        		{
		        			title:'河流名称',
		        			key:'河流名称',
		        			dataIndex:'河流名称',
		        			width:100,
		        			render:columnsRender2
		        		},
		        		{
		        			title:'流域面积(Km2)',
		        			key:'流域面积',
		        			dataIndex:'流域面积',
		        			width:100,
		        			render:columnsRender2
		        		}
		        	]
		        },
		      
        		{
        			title:'所属流域',
        			key:'所属流域',
        			dataIndex:'所属流域',
        			width:100,
        			render:columnsRender2
        		},
        		{
        			title:'所在县级行政区',
        			key:'所在县级行政区',
        			dataIndex:'所在县级行政区',
        			width:100,
        			render:columnsRender2
        		},
        	]
        },
        {
            title:'建设任务(治理河长Km)',
            dataIndex:'治理河长',
            key:'治理河长',
            width:200,
        },
        {
            title:'投资(万元)',
            dataIndex:'投资',
            key:'投资',
            width:200,
        },
];
const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const Table3=({dataSource,exportProps,loading})=>{
	const a = proDs(dataSource);
    console.log(a)
    const tableProps={
        title:(text)=><TableTitle text={`河南省流域面积200～3000平方公里中小河流治理项目备案表`} />,
        bordered:true,
        scroll:{x:true,y:true},
        pagination:false,
        columns:columns,
        expandedRowRender:(record)=>{
            let res;
            res=record.dataSource? <Table {...subTableProps} dataSource={record.dataSource} className='subTable'/>:false
            return res;
        },
        dataSource:a,
        loading:loading
    }
	return (
        <div className={classnames(
                {[conStyle.table]:true,[styles.table]:true}
            )}>
            <div className={styles.export}>
                <Button type="primary"  {...exportProps}>导出</Button>
            </div>
            <Table {...tableProps} />
        </div>
    )
};

export default Table3;