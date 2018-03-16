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
	if(isNaN(parseInt(record['序号'])) || record.dataSource){
		return {
			children:text,
				props:{
					colSpan:8
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
    if(isNaN(parseInt(record['序号'])) || record.dataSource){
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
            width:50,
            render:columnsRender1,
        },
  		{
            title:'项目名称',
            dataIndex:'项目名称',
            key:'项目名称',
            width:300,
            render:columnsRender2,
        },
      
		{
			title:'省',
			key:'省',
			dataIndex:'省',
			width:50,
			render:columnsRender2
		},
		{
			title:'市',
			key:'市',
			dataIndex:'市',
			width:50,
			render:columnsRender2
		},
		{
			title:'县',
			key:'县',
			dataIndex:'县',
			width:50,
			render:columnsRender2
		},   
        {
            title:'所属流域',
            dataIndex:'所属流域',
            key:'所属流域',
            width:50,
            render:columnsRender2,
        },
        {
            title:'所在河流',
            dataIndex:'所在河流',
            key:'所在河流',
            width:50,
            render:columnsRender2,
        },
        
        {
            title:'项目区个数',
            dataIndex:'项目区个数',
            key:'项目区个数',
            width:100,
            render:columnsRender2,
        },
        {
            title:'批复或规划综合治理河长(Km)',
            dataIndex:'批复或规划综合治理河长',
            key:'批复或规划综合治理河长',
            width:100,
        },
        {
            title:'项目投资',
            children:[
                {
                    title:'批复或估算总投资',
                    key:'批复或估算总投资',
                    dataIndex:'批复或估算总投资',
                    width:100,
                    //render:columnsRender2
                },
                {
                    title:'中央投资',
                    key:'中央投资',
                    dataIndex:'中央投资',
                    width:100,
                    //render:columnsRender2
                },
            ]
        },
        {
            title:'初步设计或实施方案编制、审查、批复情况',
            children:[
                {
                    title:'目前进展',
                    key:'目前进展',
                    dataIndex:'目前进展',
                    width:100,
                },
                {
                    title:'批复文号',
                    key:'批复文号',
                    dataIndex:'批复文号',
                    width:100,
                    //render:columnsRender2
                },
            ]
        },
        {
            title:'2017年投资落实情况',
            children:[
                {
                    title:'合计',
                    key:'合计',
                    dataIndex:'合计',
                    width:100,
                },
                {
                    title:'中央投资',
                    key:'一七年中央投资',
                    dataIndex:'2017年中央投资',
                    width:100,
                },
                {
                    title:'省级投资',
                    key:'省级投资',
                    dataIndex:'省级投资',
                    width:100,
                },
                {
                    title:'市县投资',
                    key:'市县投资',
                    dataIndex:'市县投资',
                    width:100,
                },
            ]
        },
];
const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const Table5=({dataSource,exportProps,loading})=>{
	const a = proDs(dataSource);
    console.log(a)
    const tableProps={
        title:(text)=><TableTitle text={`原规划内中小河流治理结转项目表（不含调整和补充项目）`} />,
        bordered:true,
        scroll:{x:1650,y:window.innerHeight-360},
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

export default Table5;