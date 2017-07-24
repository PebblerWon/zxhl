import React from 'react'
import {Table,Tabs, Button } from 'antd'
import StasticByArea from './StasticByArea'
const TabPane = Tabs.TabPane;



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
		'备注':`水利普查序号为12345678`,
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
const byAreaData = [
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
const ProjectAll = ()=>{
	return(
		<Tabs>
			<TabPane tab='按地市划分' key='1'>
				<StasticByArea dataSource={byAreaData}/>
			</TabPane>
			<TabPane tab='按项目河流' key='2'>

			</TabPane>
		</Tabs>
	)
}

export default ProjectAll