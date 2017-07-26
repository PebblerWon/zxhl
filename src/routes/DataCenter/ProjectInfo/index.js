import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Form, Button, Row, Col,Input,Table,Card,Dropdown,Select,Cascader} from 'antd'
import city from '../../../utils/city'
import styles from './index.less'
import DropOption from '../../../components/DropOptions'
import RiverDetail from '../RiverInfo/RiverDetail'

const FormItem = Form.Item;
const Search = Input.Search;
const columns = [
 { title: '项目名称',  dataIndex: 'he_liu_ming_cheng', key: 'he_liu_ming_cheng', width: 100,fixed: 'left' },
	  { title: '所属流域',  dataIndex: 'suo_shu_liu_yu', key: 'suo_shu_liu_yu',width: 100,},
	  { title: '所在河流', dataIndex: 'suo_zai_shui_xi', key: 'suo_zai_shui_xi', width: 150 },
	  { title: '所在地市', dataIndex: 'liu_yu_mian_ji', key: 'liu_yu_mian_ji', width: 150 },
	  { title: '所在县区', dataIndex: 'he_liu_chang_du', key: 'he_liu_chang_du', width: 150 },
	  { title: '批复文号', dataIndex: 'he_liu_fen_lei', key: 'he_liu_fen_lei', width: 150 },
	  { title: '批复工程总投资(万)', dataIndex: 'fang_hong_biao_zhun', key: 'fang_hong_biao_zhun', width: 150 },
	  { title: '保护人口(万)', dataIndex: 'chu_lao_biao_zhun', key: 'chu_lao_biao_zhun', width: 150 },
	  { title: '保护耕地(Km²)', dataIndex: 'yi_zhi_li_he_chang', key: 'yi_zhi_li_he_chang', width: 150 },
	  { title: '保护城镇', dataIndex: 'gui_hua_zhi_li_he_chang', key: 'gui_hua_zhi_li_he_chang',width:150 },
	  { title: '设计防洪标准', dataIndex: 'wei_zhi_li_he_chang', key: 'wei_zhi_li_he_chang', width: 150 },
	  { title: '设计除涝标准', dataIndex: 'he_liu_liu_jing_di', key: 'he_liu_liu_jing_di',width:150 },
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
	    he_liu_ming_cheng: `郑州市中牟县丈八沟许家闸~贾鲁河口段治理工程 ${i}`,
	    suo_shu_liu_yu: `淮河`,
	    suo_zai_shui_xi: `丈八沟`,
	    liu_yu_mian_ji:`郑州市`,
	    he_liu_chang_du:`中牟县`,
	    he_liu_fen_lei:`豫水行许字[2009]99号`,
	    fang_hong_biao_zhun:`2605`,
	    chu_lao_biao_zhun:`5.2`,
	    yi_zhi_li_he_chang:`8.86`,
	    gui_hua_zhi_li_he_chang:`中牟县,韩寺,姚家`,
	    wei_zhi_li_he_chang:`20年一遇`,
	    he_liu_liu_jing_di:`5年一遇`
   
  });
}
const ProjectInfo = ({project,dispatch,form})=>{
	const {getFieldDecorator,validateFields,resetFields,getFieldsValue} = form

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
		item:project.currentItem,
		visible:project.modalVisible,
		maskClosable:false,
		columns:columns,
		onOk(){
			dispatch({
				type:'project/hideModal'
			})
		},
		onCancel(){
			dispatch({
				type:'project/hideModal',
			})
		}
	}
	const handleReset= (e)=>{
		resetFields()
	}
	const handleSearch = (e)=>{
		e.preventDefault();
		let values = getFieldsValue();
		dispatch({
			type:'project/query',
			payload:values
		})
	}

	const tableProps={
		columns:columns, 
		dataSource:data,
		scroll:{ x: 1700, y: 300 },
		onRowDoubleClick(e){
			dispatch({
				type:'project/showModal',
				payload:{
					currentItem:e
				}
			})
		}
	}
	return(
		<div className={styles.projectInfo}>
			<Form
				className={"searchForm"}
				onSubmit={handleSearch}
			>
				<Row gutter={40}>
					<Row gutter={24}>
						<Col {...colProps}>
							<FormItem {...formItemLayout} label="所在地市">
								<Cascader 
									placeholder="请输所在地市"
									options={city('河南省')}>
								</Cascader>
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem {...formItemLayout} label="所在流域">
								<Select placeholder="所在流域">
									<Option value="淮河流域">淮河流域</Option>
									<Option value="海河流域">海河流域</Option>
									<Option value="黄河流域">黄河流域</Option>
									<Option value="长江流域">长江流域</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem {...formItemLayout} label="项目名称">
								<Input placeholder="请输入项目名称查询"></Input>
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
		    	<Card title="查询结果" extra={<Button type="primary">导出</Button>}>
	    			<Table {...tableProps}/>
	  			</Card>
	    	</div>
	    	<RiverDetail {...detailProps}/>
    	</div>
		)
}

export default connect(
	({project})=>({project})
)(Form.create()(ProjectInfo));