import React from 'react'
import {Table} from 'antd'
import coStyle from '../../common.less'
import styles from './index.less'
const columnsRender1 = (text,record,index)=>{
	if(record.dataSource){
		return {
			children:text,
				props:{
					colSpan:17
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
  			title:'项目名称',
  			dataIndex:'项目名称',
  			key:'项目名称',
  			width:150,
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
    						width:60,
    						render:columnsRender2,
    					},
    					{
    						title:'所属流域机构',
    						dataIndex:'所属流域机构',
    						key:'所属流域机构',
    						width:50,
    						render:columnsRender2,
    					},
    					{
    						title:'所在水系',
    						dataIndex:'所在水系',
    						key:'所在水系',
    						width:80,
    						render:columnsRender2
    					},
    					{
    						title:'所在河流',
    						dataIndex:'所在河流',
    						key:'所在河流',
    						width:70,
    						render:columnsRender2
    					},
    					{
    						title:'所在河流流域面积Km²',
    						dataIndex:'所在河流流域面积',
    						key:'所在河流流域面积',
    						width:50,
    						render:columnsRender2
    					},
    					{
    						title:'所在河流长度Km',
    						dataIndex:'所在河流长度',
    						key:'所在河流长度',
    						width:50,
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
    						width:50,
    						render:columnsRender2
    					},{
    						title:'地级行政区',
    						dataIndex:'地级行政区',
    						key:'地级行政区',
    						width:50,
    						render:columnsRender2
    					},{
    						title:'县级行政区',
    						dataIndex:'县级行政区',
    						key:'县级行政区',
    						width:50,
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
    						width:50,
    						render:columnsRender2
    					},{
    						title:'北纬',
    						dataIndex:'北纬1',
    						key:'北纬1',
    						width:50,
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
    						width:50,
    						render:columnsRender2
    					},{
    						title:'北纬',
    						dataIndex:'北纬2',
    						key:'北纬2',
    						width:50,
    						render:columnsRender2
    					},]
    			}
    		]
    	},
    	{
    		title:'前期工作',
    		children:[{
    						title:'规划依据',
    						dataIndex:'规划依据',
    						key:'规划依据',
    						width:130,
    						render:columnsRender2
    					},{
    						title:'项目审批情况',
    						dataIndex:'项目审批情况',
    						key:'项目审批情况',
    						width:60,
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
    ]
}];
const data ={
	'郑州市':[],
	'焦作市':[],
};
for(let i = 0;i<10;i++){
	let item = {
		'key':`伊源河新南至汤营段河道治理工程${i}`,
		'项目名称':`伊源河新南至汤营段河道治理工程${i}`,
		'所在水资源一级区':`黄河区`,
		'所属流域机构':`黄委`,
		'所在水系':`伊洛河水系`,
		'所在河流':`伊源河`,
		'所在河流流域面积':782.00,
		'所在河流长度':48.00,
		'省级行政区':`河南`,
		'地级行政区':`洛阳`,
		'县级行政区':`栾川`,
		'东经1':`111.36.17`,
		'北纬1':`33.54.28`,
		'东经2':`111.48.11`,
		'北纬2':`33.59.15`,
		'规划依据':`河南省中小河流治理工程总体规划`,
		'项目审批情况':`未审批`,
		'备注':`水利普查序号为123456`,
	}
	data['郑州市'].push(item)
}
for(let i = 0;i<9;i++){
	let item = {
		'key':`武陟县共产主义渠圪当店至获嘉县界段治理工程${i}`,
		'项目名称':`武陟县共产主义渠圪当店至获嘉县界段治理工程${i}`,
		'所在水资源一级区':`海河区`,
		'所属流域机构':`海委`,
		'所在水系':`卫河水系`,
		'所在河流':`共产主义渠上端`,
		'所在河流流域面积':500.40,
		'所在河流长度':50.00,
		'省级行政区':`河南`,
		'地级行政区':`焦作`,
		'县级行政区':`武陟`,
		'东经1':`无`,
		'北纬1':`无`,
		'东经2':`无`,
		'北纬2':`无`,
		'规划依据':`河南省中小河流治理工程总体规划`,
		'项目审批情况':`未审批`,
		'备注':`无`,
	}
	data['焦作市'].push(item)
}
const a = [
	{
		'key':`郑州市`,
		'项目名称':`郑州市(10)`,
		'dataSource':data['郑州市'],
	},
	{
		'key':`焦作市`,
		'项目名称':`焦作市(9)`,
		'dataSource':data['焦作市'],
	},

]


const subTableProps={
	columns:columns,
	showHeader:false,
	pagination:false,
}
const HuaiHeProject=({dataSource})=>(
	<div className={styles.huaiHeProject}>
        <div className={coStyle.table}>
    		<Table
    		  	bordered
    		  	pagination={false}
    		    columns={columns}
    		    dataSource={a[0].dataSource}
                scroll={{x:1150}}
    		  />
        </div>
	</div>
	);

export default HuaiHeProject;
