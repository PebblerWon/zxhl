//表格和规划项目的一样
import React from 'react'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import ZhengQuHuiZong from '../../../components/HuiZongXinXi/ZhengQuHuiZong.js'
import HeLiuHuiZong from '../../../components/HuiZongXinXi/HeLiuHuiZong.js'
import GongChengCuoShi from '../../../components/HuiZongXinXi/GongChengCuoShi.js'

import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane
const proDs = (ds)=>{
	for(let i = 0;i<ds.length;i++){
		ds[i].key = ds[i].key+i;
		for(let j = 0;j<ds[i].dataSource.length;j++){
			ds[i].dataSource[j].key +=`${i}-${j}`;
		}
	}
	//
	for(let i = 0;i<ds.length;i++){
		ds[i].children = ds[i].dataSource;
		//delete ds[i].dataSource;
	}
	return ds;
}
const PiFuXiangMu = ({huizongpifu,dispatch})=>{
	console.log(huizongpifu)
	//const map={'按政区汇总':'table1','按河流汇总':'table2','按主要工程措施':'table3'}
	const tabsProps={
		activeKey:huizongpifu.tabs,
		onChange(activeKey){
			if(huizongpifu[activeKey].ds.length==0){
				dispatch({
					type:'huizongpifu/query',
					payload:{
						tabs:activeKey,
						filter:''
					}
				})
			}else{
				dispatch({
					type:'huizongpifu/tabs',
					payload:activeKey
				})
			}
			
		},
	}

	const table1Props={
		loading:huizongpifu.loading,
		dataSource:proDs(huizongpifu.table1.ds),
		title:'河南省中小河流治理工程批复项目主要工程措施及治理效果汇总表（按所在地市划分）',
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongpifu/exportExcel',payload:'table1'});
	        }
		}
	}
	const table2Props={
		loading:huizongpifu.loading,
		dataSource:proDs(huizongpifu.table2.ds),
		title:'河南省中小河流治理情况统计表',
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongpifu/exportExcel',payload:'table2'});
	        }
		}
	}
	const table3Props={
		loading:huizongpifu.loading,
		dataSource:proDs(huizongpifu.table3.ds),
		title:'河南省中小河流治理工程验收项目主要工程措施及治理效果汇总表',
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongpifu/exportExcel',payload:'table3'});
	        }
		}
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">汇总信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">批复项目</Breadcrumb.Item>
					</Breadcrumb>

				</Header>
					<Layout className='layout2'>
						<Content>
							<Tabs {...tabsProps}>
								<TabPane tab='按政区汇总' key='table1'>
									<ZhengQuHuiZong {...table1Props}/>
								</TabPane>
								<TabPane tab='按河流汇总' key='table2'>
									<HeLiuHuiZong {...table2Props}/>
								</TabPane>
								<TabPane tab='按主要工程措施' key='table3'>
									<GongChengCuoShi {...table3Props}/>
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({huizongpifu})=>({huizongpifu})
)(PiFuXiangMu) ;