import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,Dropdown} from 'antd'
import styles from './riverInfo.less'
import DropOption from '../../components/DropOptions'
import RiverDetail from './RiverDetail'

const FormItem = Form.Item;
const Search = Input.Search;
const columns = [
  { title: '河流名称',  dataIndex: 'he_liu_ming_cheng', key: 'he_liu_ming_cheng', width: 100,fixed: 'left' },
  { title: '所属流域',  dataIndex: 'suo_shu_liu_yu', key: 'suo_shu_liu_yu',width: 100,},
  { title: '所在水系', dataIndex: 'suo_zai_shui_xi', key: 'suo_zai_shui_xi', width: 150 },
  { title: '流域面积', dataIndex: 'liu_yu_mian_ji', key: 'liu_yu_mian_ji', width: 150 },
  { title: '河流长度', dataIndex: 'he_liu_chang_du', key: 'he_liu_chang_du', width: 150 },
  { title: '河流分类', dataIndex: 'he_liu_fen_lei', key: 'he_liu_fen_lei', width: 150 },
  { title: '防洪标准', dataIndex: 'fang_hong_biao_zhun', key: 'fang_hong_biao_zhun', width: 150 },
  { title: '除涝标准', dataIndex: 'chu_lao_biao_zhun', key: 'chu_lao_biao_zhun', width: 150 },
  { title: '已治理河长', dataIndex: 'yi_zhi_li_he_chang', key: 'yi_zhi_li_he_chang', width: 150 },
  { title: '规划治理河长', dataIndex: 'gui_hua_zhi_li_he_chang', key: 'gui_hua_zhi_li_he_chang',width:150 },
  { title: '未治理河长', dataIndex: 'wei_zhi_li_he_chang', key: 'wei_zhi_li_he_chang', width: 150 },
  { title: '河流流经地', dataIndex: 'he_liu_liu_jing_di', key: 'he_liu_liu_jing_di',width:150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (text,record) => {
    	const handleMenuClick = (record, e) => {
    		console.log(record)
    		console.log(e)
		    if (e.key === 'update') {
		      //onEditItem(record)
		    } else if (e.key === 'delete') {
		      confirm({
		        title: 'Are you sure delete this record?',
		        onOk () {
		          onDeleteItem(record.id)
		        },
		      })
		    }
	  	}
	  	return <DropOption 
    		onMenuClick={e => handleMenuClick(record,e)}
    		menuOptions={[
    			{ key: 'update', name: '编辑' }, 
    			{ key: 'delete', name: '删除' }
    		]}/>
    }
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    he_liu_ming_cheng: `东沙河 ${i}`,
    suo_shu_liu_yu: `淮河`,
    suo_zai_shui_xi: `淮河干流`,
    liu_yu_mian_ji:248.10,
    he_liu_chang_du:31.60,
    he_liu_fen_lei:`内陆`,
    fang_hong_biao_zhun:`无`,
    chu_lao_biao_zhun:`无`,
    yi_zhi_li_he_chang:`无`,
    gui_hua_zhi_li_he_chang:`无`,
    wei_zhi_li_he_chang:`无`,
    he_liu_liu_jing_di:`无`
  });
}
const RiverInfo = ({river,dispatch})=>{
	const colProps={
		xl:4,
		md:8,
		sm:12,
		xs:24
	}
	const formItemLayout={
		labelCol:{span:5},
		wrapperCol:{span:19}
	}
	const detailProps={
		item:river.currentItem,
		visible:river.modalVisible,
		maskClosable:false,
		columns:columns,
		onOk(){
			dispatch({
				type:'river/hideModal'
			})
		},
		onCancel(){
			dispatch({
				type:'river/hideModal',
			})
		}
	}
	const handleReset= (e)=>{

	}
	const handleSearch = (e)=>{

	}

	const tableProps={
		columns:columns, 
		dataSource:data,
		scroll:{ x: 1700, y: 300 },
		onRowDoubleClick(e){
			dispatch({
				type:'river/showModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	return(
		<div>
			<Form
				className={styles.searchForm}
				onSubmit={handleSearch}
			>
				<Row gutter={40}>
					<Row gutter={24}>
						<Col {...colProps}>
							<FormItem {...formItemLayout} label="河流名称">
								<Input placeholder="请输入河流名称查询"></Input>
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem {...formItemLayout} label="所在流域">
								<Input placeholder="所在流域"></Input>
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem {...formItemLayout} label="所在地市">
								<Input placeholder="请输所在地市"></Input>
							</FormItem>
						</Col>
		    		</Row>
	    		</Row>
	    		<Row>
		          	<Col span={24} style={{ textAlign: 'right' }}>
		            	<Button type="primary" htmlType="submit">查询</Button>
		            	<Button style={{ marginLeft: 8 }} onClick={handleReset}>清空</Button>
		          </Col>
		        </Row>
	    	</Form>
	    	<div className={styles.searchResult}>
		    	<Card title="查询结果" extra={<Button>导出</Button>}>
	    			<Table {...tableProps}/>
	  			</Card>
	    	</div>
	    	<RiverDetail {...detailProps}/>
    	</div>
		)
}

export default connect(
	({river})=>({river})
)(RiverInfo);