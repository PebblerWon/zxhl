import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,Dropdown,Select,Cascader,Modal,Carousel} from 'antd'
//import city from '../../../utils/city'
import styles from './index.less'
import DropOption from '../../../components/DropOptions'
import LeftIcon from '../../../components/Common/LeftIcon'
import RiverDetail from './RiverDetail'
//import RiverInput from './RiverInput'

const FormItem = Form.Item;
const Search = Input.Search;

const RiverInfo = ({river,dispatch,form})=>{
	let carousel;//保存对走马灯的引用
	const {getFieldDecorator,validateFields,resetFields,getFieldsValue} = form
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
				      Modal.confirm({
				        title: '你真的想删除该条记录吗?',
				        onOk () {

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
	const colProps={
		xl:8,
		lg:8,
		md:8,
		sm:12,
		xs:24
	}
	const formItemLayout={
		labelCol:{span:5},
		wrapperCol:{span:19}
	}
	const detailModalProps={
		item:river.detailModal.currentItem,
		visible:river.detailModal.visible,
		maskClosable:false,
		columns:columns,
		onOk(){
			dispatch({
				type:'river/hideDetailModal'
			})
		},
		onCancel(){
			dispatch({
				type:'river/hideDetailModal',
			})
		}
	}

	const handleReset = (e)=>{
		resetFields()
	}
	const handleSearch = (e)=>{
		e.preventDefault();
		let values = getFieldsValue();
		dispatch({
			type:'river/query',
			payload:values
		})
	}
    
    const exitCreate = (e)=>{
    	carousel.refs.slick.innerSlider.slickGoTo(0)
    }

	const tableProps={
		columns:columns, 
		dataSource:data,
		scroll:{ x: 1700, y: 300 },
		onRowDoubleClick(e){
			dispatch({
				type:'river/showDetailModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	
	return(
		<Carousel initialSlide={river.currentSlide} ref={c=>carousel = c} dots={false}>
			<div className={styles.riverInfo}>
				<Form
					className={"searchForm"}
					onSubmit={handleSearch}
				>
					<Row gutter={40}>
						<Row gutter={24}>
							<Col {...colProps}>
								<FormItem {...formItemLayout} label="所在地市">
									{getFieldDecorator('所在地市')(
						            	<Input placeholder="请输所在地市" />
						          	)}
									
								</FormItem>
							</Col>
							<Col {...colProps}>
								<FormItem {...formItemLayout} label="所在流域">
									{getFieldDecorator('所在流域')(
										<Select placeholder="所在流域">
											<Select.Option value="淮河流域">淮河流域</Select.Option>
											<Select.Option value="海河流域">海河流域</Select.Option>
											<Select.Option value="黄河流域">黄河流域</Select.Option>
											<Select.Option value="长江流域">长江流域</Select.Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col {...colProps}>
								<FormItem {...formItemLayout} label="河流名称">
									{getFieldDecorator('河流名称')(
										<Input placeholder="请输入河流名称查询"></Input>
									)}
								</FormItem>
							</Col>
			    		</Row>
		    		</Row>
		    		<Row>
			          	<Col span={24} style={{ textAlign: 'right' }}>
			            	<Button type="primary" onClick={handleSearch} htmlType="submit">查询</Button>
			            	<Button style={{ marginLeft: 8 }} onClick={handleReset}>清空</Button>
			          </Col>
			        </Row>
		    	</Form>
		    	<div className={"searchResult"}>
			    	<Card title="查询结果" 
			    		extra={
				    		<div>
				    			<Button type="primary" style={{marginRight:'20px'}}>导出</Button>
				    			<Button type="primary" onClick={e=>{carousel.refs.slick.innerSlider.slickNext()}}>新建</Button>
				    		</div>
			    	}>
		    			<Table {...tableProps}/>
		  			</Card>
		    	</div>
		    	<RiverDetail {...detailModalProps}/>
    		</div>
    		<div>
    			{/*<Button onClick={exitCreate}>退出新建</Button>
    			<RiverInput/>*/}
    		</div>
		</Carousel>
	)
}

export default connect(
	({river})=>({river})
)(Form.create()(RiverInfo));