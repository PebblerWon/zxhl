import React from 'react'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,
	Breadcrumb,Tree,Layout,Tabs
} from 'antd'
import Table1 from './Table1' 
import Table2 from './Table2'
import {HNCity} from '../../../utils/city'
import conStyle from '../../common.less'

const FormItem = Form.Item;
const {Header,Content,Footer,Sider} = Layout
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane

const ZhongXiaoHeLiu = ({baseSituation,dispatch})=>{
	
	const table1Props={
		//loading:baseSituation.loading,
		//ds:baseSituation.table1.ds,
	}
	const table2Props={
		//loading:baseSituation.loading,
		//ds:baseSituation.table2.ds,
	}
	return(
		<div className={conStyle.layout}>
			<Layout className='layout1'>
				<Header>
					<Breadcrumb separator=">">
						<Breadcrumb.Item className="Item">汇总信息</Breadcrumb.Item>
						<Breadcrumb.Item className="Item">中小河流</Breadcrumb.Item>
					</Breadcrumb>

				</Header>
					<Layout className='layout2'>
						<Content>
							<Tabs>
								<TabPane tab='基本信息' key='基本信息'>
									<Table1 {...table1Props}/>
								</TabPane>
								<TabPane tab='治理情况' key='治理情况'>
									<Table2 {...table2Props}/>
								</TabPane>
							</Tabs>
						</Content>
					</Layout>
			</Layout>
		</div>
	)
}

/*export default connect(
	({baseSituation})=>({baseSituation})
)(BaseSituation) ;*/
export default ZhongXiaoHeLiu