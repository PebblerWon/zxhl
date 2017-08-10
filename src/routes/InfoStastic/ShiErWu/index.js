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

const ShiErWuXiangMu = ({huizongshierwu,dispatch})=>{
	
	const map={'按政区汇总':'table1','按河流汇总':'table2','按主要工程措施':'table3'}
	const tabsProps={
		activeKey:huizongshierwu.tabs,
		onChange(activeKey){
			if(huizongshierwu[map[activeKey]].ds.length==0){
				dispatch({
					type:'huizongshierwu/query',
					payload:{
						tabs:activeKey,
						filter:''
					}
				})
			}else{
				dispatch({
					type:'huizongshierwu/tabs',
					payload:activeKey
				})
			}
			
		},
	}

	const table1Props={
		loading:huizongshierwu.loading,
		dataSource:huizongshierwu.table1.ds,
		title:'河南省中小河流治理工程十二五项目主要工程措施及治理效果汇总表（按所在地市划分）',
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongshierwu/exportExcel',payload:'table1'});
	        }
		}
	}
	const table2Props={
		loading:huizongshierwu.loading,
		dataSource:huizongshierwu.table2.ds,
		title:'河南省中小河流治理情况统计表',
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongshierwu/exportExcel',payload:'table1'});
	        }
		}
	}
	const table3Props={
		loading:huizongshierwu.loading,
		dataSource:huizongshierwu.table3.ds,
		title:'河南省中小河流治理工程十二五项目主要工程措施及治理效果汇总表',
		exportProps:{
			type:"primary",
	        onClick(e,d){
	            dispatch({type:'huizongshierwu/exportExcel',payload:'table1'});
	        }
		}
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">汇总信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">十二五项目</Breadcrumb.Item>
					</Breadcrumb>

				</Header>
					<Layout className='layout2'>
						<Content>
							<Tabs {...tabsProps}>
								<TabPane tab='按政区汇总' key='按政区汇总'>
									<ZhengQuHuiZong {...table1Props}/>
								</TabPane>
								<TabPane tab='按河流汇总' key='按河流汇总'>
									<HeLiuHuiZong {...table2Props}/>
								</TabPane>
								<TabPane tab='按主要工程措施' key='按主要工程措施'>
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
	({huizongshierwu})=>({huizongshierwu})
)(ShiErWuXiangMu) ;