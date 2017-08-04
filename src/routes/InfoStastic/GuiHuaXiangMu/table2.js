//按河流汇总表
import React from 'react'
import {Table,Button} from 'antd'

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
  	title:'河南省中小河流治理工程总体规划项目基本情况统计表',
  	children:[
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
            title:'河流长度',
            dataIndex:'河流长度',
            key:'河流长度',
            width:100,
            render:columnsRender2,
        },{
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
                },
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
    ]
}];
const data ={
	'淮河流域':[],
	'海河流域':[],
    '黄河流域':[],
    '长江流域':[],
};
for(let i = 0;i<10;i++){
	let item = {
		'key':`白沟河${i}`,
		'河流名称':`白沟河`,
		'所在流域':`淮河`,
		'流域面积':`960.20`,
		'河流长度':`83.00`,
		'地级行政区':`/`,
		'县级行政区':`鹿邑`,
		'治理段':`1`,
		'治理长度':`8.00`,
		'投资':`1260.00`,
		'第一次水利普查序号':`784`,
		'河流流经地':`鹿邑县`,
	}
	data['淮河流域'].push(item)
}
for(let i = 0;i<9;i++){
	let item = {
		'key':`白沟河${i}`,
        '河流名称':`白沟河`,
        '所在流域':`淮河`,
        '流域面积':`960.20`,
        '河流长度':`83.00`,
        '地级行政区':`/`,
        '县级行政区':`鹿邑`,
        '治理段':`1`,
        '治理长度':`8.00`,
        '投资':`1260.00`,
        '第一次水利普查序号':`784`,
        '河流流经地':`鹿邑县`,
	}
	data['海河流域'].push(item)
}
const a = [
    {
        key:`合计`,
        '河流名称':`合计：治理段(397) 治理长度(3959.54) 投资(1070141.93)`,
        'dataSource':[]
    },
	{
		'key':`淮河流域`,
		'河流名称':`淮河流域：治理段(225) 治理长度(2572.76) 投资(611107.59)`,
		'dataSource':data['淮河流域'],
	},
	{
		'key':`海河流域`,
		'河流名称':`海河流域：治理段(36) 治理长度(355.80) 投资(97673.00)`,
		'dataSource':data['海河流域'],
	},

]


const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const StasticByArea=({dataSource})=>(
	<div className={styles.table}>
		<div className={styles.export}>
            <Button type="primary">导出</Button>
        </div>
		
		<Table
		  	bordered
		  	scroll={{x:'1000px',y:'500px'}}
		  	pagination={false}
		    columns={columns}
		    expandedRowRender={
		    	record =>{
                    if(record.dataSource&&record.dataSource.length>0)
                        return <Table {...subTableProps} dataSource={record.dataSource} className='subTable'/>
                    else
                        return "";
                }
		    }
		    dataSource={a}
		  />
	</div>
	);

export default StasticByArea;