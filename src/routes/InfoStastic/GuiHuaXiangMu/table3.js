//按主要工程措施表
//按河流汇总表
import React from 'react'
import {Table,Button} from 'antd'
import TableTitle from '../../../components/Common/TableTitle'
import classnames from 'classnames'
import conStyle from '../../common.less'
import styles from './index.less'

const columnsRender1 = (text,record,index)=>{
	if(record.dataSource){
		return {
			children:text,
				props:{
					colSpan:22
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
            render:columnsRender1,
        },
        {
            title:'所在河流名称',
            dataIndex:'所在河流名称',
            key:'所在河流名称',
            width:100,
            render:columnsRender2,
        },
        {
        	title:'主要措施',
        	children:[
        		{
		            title:'河道治理长度(Km)',
		            dataIndex:'河道治理长度',
		            key:'河道治理长度',
		            width:100,
		            render:columnsRender2,
		        },
		        {
		        	title:'堤防',
		        	children:[
		        		{
		        			title:'新建(Km)',
		        			key:'堤防新建',
		        			dataIndex:'堤防新建',
		        			width:100,
		        			render:columnsRender2
		        		},
		        		{
		        			title:'加固(Km)',
		        			key:'堤防加固',
		        			dataIndex:'堤防加固',
		        			width:100,
		        			render:columnsRender2
		        		}
		        	]
		        },
		        {
		        	title:'护岸',
		        	children:[
		        		{
		        			title:'新建(Km)',
		        			key:'护岸新建',
		        			dataIndex:'护岸新建',
		        			width:100,
		        			render:columnsRender2
		        		},
		        		{
		        			title:'加固(Km)',
		        			key:'护岸加固',
		        			dataIndex:'护岸加固',
		        			width:100,
		        			render:columnsRender2
		        		}
		        	]
		        },
		        {
		        	title:'清淤',
		        	children:[
		        		{
		        			title:'清淤河长(Km)',
		        			key:'清淤河长',
		        			dataIndex:'清淤河长',
		        			width:100,
		        			render:columnsRender2
		        		},
		        		{
		        			title:'清淤量(万m)',
		        			key:'清淤量',
		        			dataIndex:'清淤量',
		        			width:100,
		        			render:columnsRender2
		        		}
		        	]
		        },
		        {
		        	title:'新建或加固穿堤建筑物(座)',
		        	dataIndex:'新建或加固穿堤建筑物',
		            key:'新建或加固穿堤建筑物',
		            width:100,
		            render:columnsRender2,
		        },
		        {
		        	title:'滨岸待整治面积(Km)',
		        	dataIndex:'滨岸待整治面积',
		            key:'滨岸待整治面积',
		            width:100,
		            render:columnsRender2,
		        },
		        {
		        	title:'整治入河排污(处)',
		        	dataIndex:'整治入河排污',
		            key:'整治入河排污',
		            width:100,
		            render:columnsRender2,
		        }
        	]
        },
        {
        	title:'防洪除涝标准',
        	children:[
        		{
        			title:'现状',
        			children:[
        				{
        					title:'防洪标准',
        					dataIndex:'现状防洪标准',
				            key:'现状防洪标准',
				            width:100,
				            render:columnsRender2,
        				},
        				{
        					title:'除涝标准',
        					dataIndex:'现状除涝标准',
				            key:'现状除涝标准',
				            width:100,
				            render:columnsRender2,
        				},
        			]
        		},
        		{
        			title:'设计',
        			children:[
        				{
        					title:'防洪标准',
        					dataIndex:'设计防洪标准',
				            key:'设计防洪标准',
				            width:100,
				            render:columnsRender2,
        				},
        				{
        					title:'除涝标准',
        					dataIndex:'设计除涝标准',
				            key:'设计除涝标准',
				            width:100,
				            render:columnsRender2,
        				},
        			]
        		}
        	]
        },
        {
        	title:'治理效果',
        	children:[
        		{
        			title:'项目保护城镇',
        			dataIndex:'项目保护城镇',
		            key:'项目保护城镇',
		            width:100,
		            render:columnsRender2,
        		},
        		{
        			title:'项目保护人口(万人)',
        			dataIndex:'项目保护人口',
		            key:'项目保护人口',
		            width:100,
		            render:columnsRender2,
        		},
        		{
        			title:'项目保护耕地(万亩)',
        			dataIndex:'项目保护耕地',
		            key:'项目保护耕地',
		            width:100,
		            render:columnsRender2,
        		},
        		{
        			title:'排涝收益面积(万亩)',
        			dataIndex:'排涝收益面积',
		            key:'排涝收益面积',
		            width:100,
		            render:columnsRender2,
        		}
        	]
        },
        {
        	title:'移民占地',
        	children:[
        		{
		            title:'移民人数(万人)',
		            dataIndex:'移民人数',
		            key:'移民人数',
		            width:100,
		            render:columnsRender2,
		        },
		        {
		            title:'永久占地(亩)',
		            dataIndex:'永久占地',
		            key:'永久占地',
		            width:100,
		            render:columnsRender2,
		        },
        	]
        }
];
const data ={
	'郑州市':[],
};
for(let i = 0;i<9;i++){
	let item = {
		'key':`河南省登封市双洎河井湾水库至玉台段河道治理工程${i}`,
        '项目名称':`河南省登封市双洎河井湾水库至玉台段河道治理工程${i}`,
        '所在河流名称':`双洎河`,
        '河道治理长度':`6.10`,
        '堤防新建':`0.00`,
        '堤防加固':'6.10',
        '护岸新建':'6.10',
        '护岸加固':`0.00`,
        '清淤河长':`6.10`,
        '清淤量':`24.40`,
        '新建或加固穿堤建筑物':`0`,
        '滨岸待整治面积':`0.00`,
        '整治入河排污':`0`,
        '现状防洪标准':`10`,
        '现状除涝标准':`3`,
        '设计防洪标准':`20`,
        '设计除涝标准':`5`,
        '项目保护城镇':`/`,
        '项目保护人口':`5.00`,
        '项目保护耕地':`4.00`,
        '排涝收益面积':`0.00`,
        '移民人数':`0.00`,
        '永久占地':`0.00`,
	}
	data['郑州市'].push(item)
}
const a = [
    {
        key:`合计`,
        '项目名称':`01郑州(11)`,
        'dataSource':data['郑州市']
    },
]


const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const StasticByCuoshi=()=>{
    const tableProps={
        title:(text)=><TableTitle text={`河南省中小河流治理工程总体规划项目主要工程措施及治理效果汇总表`} />,
        bordered:true,
        scroll:{x:'1800px'},
        pagination:false,
        columns:columns,
        expandedRowRender:(record)=>{
            let res;
            res=record.dataSource? <Table {...subTableProps} dataSource={record.dataSource} className='subTable'/>:false
            return res;
        },
        dataSource:a
    }
	return (
        <div className={classnames(
                {[conStyle.table]:true,[styles.table]:true}
            )}>
            <div className={styles.export}>
                <Button type="primary">导出</Button>
            </div>
            <Table {...tableProps} />
        </div>
    )
};

export default StasticByCuoshi;