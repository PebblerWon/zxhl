//之前的规划项目不再使用
//修改为灾后重建项目

import React from 'react'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs,Tooltip
} from 'antd'

// import ZhengQuHuiZong from '../../../components/HuiZongXinXi/ZhengQuHuiZong.js'
// import HeLiuHuiZong from '../../../components/HuiZongXinXi/HeLiuHuiZong.js'
// import GongChengCuoShi from '../../../components/HuiZongXinXi/GongChengCuoShi.js'
import Table1 from './table1'
import Table2 from './table2'
import Table3 from './table3'
import Table4 from './table4'
import Table5 from './table5'
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
	return ds;
}
const GuiHuaXiangMu = ({huizongguihua,dispatch})=>{
	console.log(huizongguihua)
	const tabsProps={
		activeKey:huizongguihua.tabs,
		onChange(activeKey){
			if(huizongguihua[activeKey].ds.length==0){
				dispatch({
					type:'huizongguihua/query',
					payload:{
						tabs:activeKey,
						filter:''
					}
				})
			}else{
				dispatch({
					type:'huizongguihua/tabs',
					payload:activeKey
				})
			}
			
		},
	}

	const table1Props={
		loading:huizongguihua.loading,
		dataSource:huizongguihua.table1.ds,
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongguihua/exportExcel',payload:'table1'});
	        }
		}
	}
	const table2Props={
		loading:huizongguihua.loading,
		dataSource:huizongguihua.table2.ds,
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongguihua/exportExcel',payload:'table2'});
	        }
		}
	}
	const table3Props={
		loading:huizongguihua.loading,
		dataSource:huizongguihua.table3.ds,
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongguihua/exportExcel',payload:'table3'});
	        }
		}
	}
	const table4Props={
		loading:huizongguihua.loading,
		dataSource:huizongguihua.table4.ds,
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongguihua/exportExcel',payload:'table4'});
	        }
		}
	}
	const table5Props={
		loading:huizongguihua.loading,
		dataSource:huizongguihua.table5.ds,
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongguihua/exportExcel',payload:'table5'});
	        }
		}
	}
	
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">汇总信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">灾后薄弱环节</Breadcrumb.Item>
					</Breadcrumb>
				</Header>
					<Layout className='layout2'>
						<Content>
							<Tabs {...tabsProps}>
								<TabPane tab={
									<Tooltip placement="topLeft" title="河南省2017年后续中小河流治理项目名单" arrowPointAtCenter={true}>
   										后续治理项目名单
   									</Tooltip>} 
									key='table1'
								>
									<Table1 {...table1Props}/>
								</TabPane>
								<TabPane tab={
									<Tooltip placement="topLeft" title="河南省2017年申报投资中小河流治理项目名录" arrowPointAtCenter={true}>
   										申报治理项目名录
   									</Tooltip>} 
									key='table2'>
									<Table2 {...table2Props}/>
								</TabPane>
								<TabPane tab={
									<Tooltip placement="topLeft" title="河南省流域面积200～3000平方公里中小河流治理项目备案表" arrowPointAtCenter={true}>
   										200~3000平方公里项目备案表
   									</Tooltip>} 
									key='table3'>
									<Table3 {...table3Props}/>
								</TabPane>
								<TabPane tab={
									<Tooltip placement="topLeft" title="中小河流治理现有项目规划结转项目表" arrowPointAtCenter={true}>
   										规划结转项目
   									</Tooltip>} 
									key='table4'>
									<Table4 {...table4Props}/>
								</TabPane>
								<TabPane tab={
									<Tooltip placement="topLeft" title="中小河流治理项目2017年度投资落实情况及2018年储备项目前期工作进展情况表" arrowPointAtCenter={true}>
   										项目进展
   									</Tooltip>} 
									key='table5'>
									<Table5 {...table5Props}/>
								</TabPane>
								
							</Tabs>
						</Content>
					</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({huizongguihua})=>({huizongguihua})
)(GuiHuaXiangMu)