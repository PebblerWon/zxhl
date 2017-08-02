import React from 'react'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import {Table1,Table2,Table3} from './Table' 
import {HNCity} from '../../../utils/city'
import PieChart from './PieChart.js'
import styles from './index.less'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const BaseSituation = ({baseSituation,dispatch})=>{
	const treeProps={
		showLine:true,
		defaultExpandAll:true,
		selectedKeys:baseSituation?baseSituation.table3.tree.selectedKeys:['河南省'],
		onSelect(selectedKeys){
			/*dispatch({
				type:'baseSituation/fetchTable3',
				payload:selectedKeys
			})*/
		},
	}
	const table1Props={
		loading:baseSituation.loading,
		ds:baseSituation.table1.ds,
	}
	const table2Props={
		loading:baseSituation.loading,
		ds:baseSituation.table2.ds,
	}
	const table3Props={
		loading:baseSituation.loading,
		ds:baseSituation.table3.ds,
		treeProps:treeProps
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">首页</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">基本情况</Breadcrumb.Item>
					</Breadcrumb>

				</Header>
					<Layout className='layout2'>
						<Content>
							<Tabs>
								<TabPane tab='中小河流统计' key='1'>
									<Table1 {...table1Props}/>
									<PieChart/>
								</TabPane>
								<TabPane tab='十二五治理情况统计' key='2'>
									<Table2 {...table2Props}/>
								</TabPane>
								<TabPane tab='十二五已治理项目' key='3'>
									<Table3 {...table3Props}/>
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
			</Layout>
		</div>
	)
}

export default connect(
	({baseSituation})=>({baseSituation})
)(BaseSituation) ;