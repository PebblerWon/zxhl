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
        	title:'建设地点',
        	children:[
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
	        		}
                ]
		},
        {
            title:'所在河流',
            dataIndex:'所在河流',
            key:'所在河流',
            width:50,
            render:columnsRender2,
        },
        {
            title:'流域面积',
            dataIndex:'流域面积',
            key:'流域面积',
            width:50,
            render:columnsRender2,
        },
        {
            title:'所属流域机构',
            dataIndex:'所属流域机构',
            key:'所属流域机构',
            width:60,
            render:columnsRender2,
        },
        {
            title:'治理河长(Km)',
            dataIndex:'治理河长',
            key:'治理河长',
            width:50,
        },
        {
            title:'治理效益',
            children:[
                    {
                        title:'保护人口(人)',
                        key:'保护人口',
                        dataIndex:'保护人口',
                        width:50,
                        //render:columnsRender2
                    },
                    {
                        title:'保护耕地(万亩)',
                        key:'保护耕地',
                        dataIndex:'保护耕地',
                        width:50,
                        //render:columnsRender2
                    },
                    {
                        title:'排涝收益面积(万亩)',
                        key:'排涝收益面积',
                        dataIndex:'排涝收益面积',
                        width:50,
                        //render:columnsRender2
                    }
            ]
        },
        {
            title:'投资情况',
            children:[
                {
                    title:'原规划投资',
                    children:[
                        {
                            title:'总投资',
                            key:'总投资',
                            dataIndex:'总投资',
                            width:100,
                        },
                        {
                            title:'中央',
                            key:'中央原规划投资',
                            dataIndex:'中央原规划投资',
                            width:100,
                        },
                        {
                            title:'地方',
                            key:'地方原规划投资',
                            dataIndex:'地方原规划投资',
                            width:100,
                        },
                    ]
                },
                {
                    title:'已安排投资',
                    children:[
                        {
                            title:'中央',
                            key:'中央已安排投资',
                            dataIndex:'中央已安排投资',
                            width:100,
                        },
                        {
                            title:'地方',
                            key:'地方已安排投资',
                            dataIndex:'地方已安排投资',
                            width:100,
                        },
                    ]
                },
                {
                    title:'剩余投资',
                    children:[
                        {
                            title:'中央',
                            key:'中央剩余投资',
                            dataIndex:'中央剩余投资',
                            width:100,
                        },
                        {
                            title:'地方',
                            key:'地方剩余投资',
                            dataIndex:'地方剩余投资',
                            width:100,
                        },
                    ]
                },
            ]
        },
        {
            title:'拟调整纳入的规划阶段(试点项目/2011-2012年项目/2013-2015年项目)',
            key:'拟调整纳入的规划阶段',
            dataIndex:'拟调整纳入的规划阶段',
            width:150,
            //render:columnsRender2
        },
        {
            title:'是否属于享受特殊政策地区',
            key:'是否属于享受特殊政策地区',
            dataIndex:'是否属于享受特殊政策地区',
            width:150,
            //render:columnsRender2
        },
        {
            title:'初步设计是否已批复',
            key:'初步设计是否已批复',
            dataIndex:'初步设计是否已批复',
            width:150,
            //render:columnsRender2
        } ,
        {
            title:'项目建设进展',
            key:'项目建设进展',
            dataIndex:'项目建设进展',
            width:150,
            //render:columnsRender2
        }
];
const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const Table4=({dataSource,exportProps,loading})=>{
	const a = proDs(dataSource);
    console.log(a)
    const tableProps={
        title:(text)=><TableTitle text={`原规划内中小河流治理结转项目表（不含调整和补充项目）`} />,
        bordered:true,
        scroll:{x:2210,y:true},
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

export default Table4;