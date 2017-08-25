
// modules/Map.js
import React from 'react'
import { Spin ,Form,Button,Input,Row,Col,Upload, message, Icon,InputNumber,Cascader,Select} from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import {DICT_FIXED_BY_PROVINCE} from '../../utils/city'
import {api} from '../../utils/config'
import EsriLoader from 'esri-loader-react'
import styles from './index.less'

const city = DICT_FIXED_BY_PROVINCE('河南省')
const esriOptions = {
    url:'https://js.arcgis.com/3.21/'
}
const FormItem = Form.Item;
const Option = Select.Option;
const colProps={

}
const formItemLayout = {
	labelCol:{span:10},
	wrapperCol:{span:14},
}
const numberInput={
	type:'number',
	min:"0",
	step:"0.1"
}
var tileInfoObj = {
  "rows": 256,
  "cols": 256,
  "compressionQuality": 0,
  "origin": {
    "x": -180,
    "y": 90
  },
  "spatialReference": {
    "wkid": 4326
  },
  "lods": [
  	{ "level": 0, "resolution": 1.40625, "scale": 590995186.11750008 },
  	{ "level": 1, "resolution": 0.703125, "scale": 295497593.05875004 },
    { "level": 2, "resolution": 0.3515625, "scale": 147748796.52937502 },
    { "level": 3, "resolution": 0.17578125, "scale": 73874398.264687508 },
    { "level": 4, "resolution": 0.087890625, "scale": 36937199.132343754 },
    { "level": 5, "resolution": 0.0439453125, "scale": 18468599.566171877 },
    { "level": 6, "resolution": 0.02197265625, "scale": 9234299.7830859385 },
    { "level": 7, "resolution": 0.010986328125, "scale": 4617149.8915429693 },
    { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9457714846 },
    { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.4728857423 },
    { "level": 10, "resolution": 0.001373291015625, "scale": 577143.73644287116 },
    { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.86822143558 },
    { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93411071779 },
    { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.967055358895 },
    { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447 },
    { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724 },
    { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619 },
    { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309 },
    { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655 }
  ]
};
class NewZaiHou extends React.Component {
	constructor (props) {
		console.log(props)
		const {getFieldDecorator,setFieldsValue} = props.form
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:"http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer",
			loading:true,
			qidian:'',
			zhongdian:'',
			id:1,
			domId:`${props.type}newMap`,
			templatePickerDivId:`newZaiHoutemplate_${Math.floor(Math.random()*1000)}`,
			mapProp:{
				map:undefined,editToolbar:undefined,add:undefined,selectedTemplate:undefined,
				editingEnabled:undefined,featureLayer1:undefined,drawToolbar:undefined,
				newGraphic:undefined,
			}//存储地图操作的一些变量
		}
		//console.log(this.state)
	}
	handleReset=(e)=>{
		console.log(this)
    	this.props.form.resetFields();
  	}
	render () {
		// show any map errors
		const reactDom = this;
		const error = this.state.error
		let input1,input2;
		const uploadProps={
			name: 'file',
		  	action: `${api.fileUpload}`,
		  	headers: {
		    	//authorization: 'authorization-text',
		  	},
		  	data:{
		  		id:'abcd',
		  	},
		  	beforeUpload(file){
		  		const isJPG = file.type === 'image/jpeg';
				if (!isJPG) {
				  	message.error('你只能上传图片!',5);
				}
				const isLt2M = file.size / 1024 / 1024 < 5;
				if (!isLt2M) {
				  	message.error('上传文件大小需小于5MB!',5);
				}
				return isJPG && isLt2M;
		  	},
		  	onChange(info) {
		  		console.log(info)
		    	if (info.file.status !== 'uploading') {
		      		console.log(info.file, info.fileList);
		    	}
		    	if (info.file.status === 'done') {
		      		message.success(`${info.file.name} file uploaded successfully`);
		    	} else if (info.file.status === 'error') {
		      		message.error(`${info.file.name} file upload failed.`);
		    	}
		  	},
		}
		if (error) {
		  return <div className='container'>
		    <div className='alert alert-danger alert-map'>{error}</div>
		    <button className='btn btn-default' onClick={hashHistory.goBack}>Go back</button>
		  </div>
		}
		return <div style={{overflow:'hidden'}}>
		  <EsriLoader options={esriOptions}/>
		   
	      <div id="templateDiv" style={{float:'left',width:'calc(50vw - 30px)',height:'calc(100vh - 90px)',overflowY:'scroll'}}>
		      <Form
		      	onSubmit={this.handleSubmit}
		      	className={styles.form}
		      >
		      	<fieldset>
		      		<legend>项目基本情况</legend>
		      		<Row>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='项目名称'>
				        	{this.props.form.getFieldDecorator('项目名称', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={16}>
				        <FormItem labelCol={{span:5}} wrapperCol={{span:19}} label='项目类型'>
				        	{this.props.form.getFieldDecorator('项目类型', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Select>
				            		<Option value='type1'>河南省200到3000平方公里项目备案</Option>
				            		<Option value='type2'>2017年申报治理项目名单</Option>
				            		<Option value='type3'>2017年后续治理项目名单</Option>
				            		<Option value='type4'>原规划内中小河流结转项目</Option>
				            	</Select>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='所在河流'>
				        	{this.props.form.getFieldDecorator('所在河流', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Select mode='tags'>
				            		{reactDom.props.riverInfo.map(
				            			(item)=><Option value={item} key={item}>{item}</Option>
				            		)}
				            	</Select>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='所属流域'>
				        	{this.props.form.getFieldDecorator('所属流域', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Select>
				            		<Option value='淮河流域'>淮河流域</Option>
				            		<Option value='黄河流域'>黄河流域</Option>
				            		<Option value='海河流域'>海河流域</Option>
				            		<Option value='长江流域'>长江流域</Option>
				            	</Select>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='流域面积'>
				        	{this.props.form.getFieldDecorator('流域面积', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="Km²"/>
				          	)}
				        </FormItem>
				      </Col>
				      
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='市/县行政区'>
				        	{this.props.form.getFieldDecorator('市行政区', {
					            rules: [{ required: true, message: '不能为空！' }]
					          	})(
				            	<Cascader options={city} placeholder=""/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='起点东经'>
				        	{this.props.form.getFieldDecorator('起点东经', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input disabled={true}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='起点北纬'>
				        	{this.props.form.getFieldDecorator('起点北纬', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input disabled={true}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='终点东经'>
				        	{this.props.form.getFieldDecorator('终点东经', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input disabled={true}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='终点北纬'>
				        	{this.props.form.getFieldDecorator('终点北纬', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input disabled={true}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='数据来源'>
				        	{this.props.form.getFieldDecorator('数据来源', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input disabled={true}/>
				          	)}
				        </FormItem>
				      </Col>
				    </Row>
		      	</fieldset>
		      	<fieldset>
		      		<legend>河南省200到3000平方公里项目备案</legend>
		      		<Row>
		      			<Col span={8}>
				        <FormItem {...formItemLayout} label='项目分类'>
				        	{this.props.form.getFieldDecorator('项目分类1', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='建设任务治理河长'>
				        	{this.props.form.getFieldDecorator('建设任务治理河长', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='投资'>
				        	{this.props.form.getFieldDecorator('投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
		      		</Row>
		      	</fieldset>
		      	<fieldset>
		      		<legend>2017年申报治理项目名单</legend>
		      		<Row>
		      			<Col span={8}>
					        <FormItem {...formItemLayout} label='备案长度'>
					        	{this.props.form.getFieldDecorator('备案长度', {
						            rules: [{ required: true, message: '不能为空！' }],
						          	})(
					            	<Input />
					          	)}
					        </FormItem>
				      	</Col>
				      	<Col span={8}>
				        	<FormItem {...formItemLayout} label='批复投资'>
				        	{this.props.form.getFieldDecorator('批复投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput}  addonAfter="万人"/>
				          	)}
				        	</FormItem>
				      	</Col>
		      		</Row>
		      	</fieldset>
		      	<fieldset>
		      		<legend>2017年后续治理项目名单</legend>
		      		<Row>
			      		<Col span={8}>
					        <FormItem {...formItemLayout} label='治理河长'>
					        	{this.props.form.getFieldDecorator('治理河长', {
						            rules: [{ required: true, message: '不能为空！' }],
						          	})(
					            	<Input {...numberInput}  addonAfter="万元"/>
					          	)}
					        </FormItem>
				      	</Col>
				        <Col span={8}>
				          	<FormItem {...formItemLayout} label='批复及初审投资'>
					          	{this.props.form.getFieldDecorator('批复及初审投资', {
						              rules: [{ required: true, message: '不能为空！' }],
						            	})(
					              	<Input {...numberInput} addonAfter="万元"/>
					            )}
				          	</FormItem>
				        </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='测算投资'>
				        	{this.props.form.getFieldDecorator('测算投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='中央资金'>
				        	{this.props.form.getFieldDecorator('中央资金', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='省级资金'>
				        	{this.props.form.getFieldDecorator('省级资金', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='备注'>
				        	{this.props.form.getFieldDecorator('备注', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='中央投资'>
				        	{this.props.form.getFieldDecorator('中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
		      		</Row>
		      	</fieldset>
		      	<fieldset>
		      		<legend>原规划内中小河流结转项目</legend>
		      		<Row>
		      			<Col span={8}>
				        <FormItem {...formItemLayout} label='项目分类2'>
				        	{this.props.form.getFieldDecorator('项目分类2', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='治理河长1'>
				        	{this.props.form.getFieldDecorator('治理河长1', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='保护人口'>
				        	{this.props.form.getFieldDecorator('保护人口', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='保护耕地'>
				        	{this.props.form.getFieldDecorator('保护耕地', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='排涝受益面积'>
				        	{this.props.form.getFieldDecorator('排涝受益面积', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='原规划中央投资'>
				        	{this.props.form.getFieldDecorator('原规划中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				       <Col span={8}>
				        <FormItem {...formItemLayout} label='原规划地方投资'>
				        	{this.props.form.getFieldDecorator('原规划地方投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='已安排中央投资'>
				        	{this.props.form.getFieldDecorator('已安排中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				       <Col span={8}>
				        <FormItem {...formItemLayout} label='已安排地方投资'>
				        	{this.props.form.getFieldDecorator('已安排地方投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='剩余中央投资'>
				        	{this.props.form.getFieldDecorator('剩余中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				       <Col span={8}>
				        <FormItem {...formItemLayout} label='剩余地方投资'>
				        	{this.props.form.getFieldDecorator('剩余地方投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='拟调整纳入的规划阶段'>
				        	{this.props.form.getFieldDecorator('拟调整纳入的规划阶段', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='是否属于享受特殊政策地区'>
				        	{this.props.form.getFieldDecorator('是否属于享受特殊政策地区', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='初步设计是否已批复'>
				        	{this.props.form.getFieldDecorator('初步设计是否已批复', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='项目建设进展'>
				        	{this.props.form.getFieldDecorator('项目建设进展', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
		      		</Row>
		      	</fieldset>
		      	<fieldset>
		      		<legend>2017年度投资落实情况及2018项目储备情况</legend>
		      		<Row>
		      			<Col span={8}>
				        <FormItem {...formItemLayout} label='项目分类3'>
				        	{this.props.form.getFieldDecorator('项目分类3', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='项目区个数'>
				        	{this.props.form.getFieldDecorator('项目区个数', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='批复或规划综合治理河长'>
				        	{this.props.form.getFieldDecorator('批复或规划综合治理河长', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='批复或估算总投资'>
				        	{this.props.form.getFieldDecorator('批复或估算总投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='其中中央投资'>
				        	{this.props.form.getFieldDecorator('其中中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='目前进度'>
				        	{this.props.form.getFieldDecorator('目前进度', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				       <Col span={8}>
				        <FormItem {...formItemLayout} label='批复文号'>
				        	{this.props.form.getFieldDecorator('批复文号', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='2017资金落实合计'>
				        	{this.props.form.getFieldDecorator('2017资金落实合计', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				       <Col span={8}>
				        <FormItem {...formItemLayout} label='2017资金落实中央投资'>
				        	{this.props.form.getFieldDecorator('2017资金落实中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='2017资金落实省级投资'>
				        	{this.props.form.getFieldDecorator('2017资金落实省级投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
				       <Col span={8}>
				        <FormItem {...formItemLayout} label='2017资金落实市县投资'>
				        	{this.props.form.getFieldDecorator('2017资金落实市县投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input  {...numberInput}/>
				          	)}
				        </FormItem>
				      </Col>
		      		</Row>
		      	</fieldset>
		      	<fieldset>
		      		<legend>其他</legend>
		      		<Row>
		      			<Col span={12}>
		            		<FormItem labelCol={{span:3}} wrapperCol={{span:18}} label='工程照片'>
					        	{this.props.form.getFieldDecorator('工程照片')(
					            	<Upload {...uploadProps}>
					            		<Button>
					            			<Icon type='upload' />点击上传
					            		</Button>
					            	</Upload>
					          	)}
				        	</FormItem>
				      	</Col>
				      	<Col span={12}>
				       		<FormItem labelCol={{span:3}} wrapperCol={{span:18}} label='工程视频'>
					        	{this.props.form.getFieldDecorator('工程视频')(
					            	<Upload {...uploadProps}>
					            		<Button>
					            			<Icon type='upload' />点击上传
					            		</Button>
					            	</Upload>
					          	)}
				        	</FormItem>
				      	</Col>
		      		</Row>
		      	</fieldset>
		      	<Row style={{marginTop:'10px'}}>
	      			<Col span={4} push={16}><Button htmlType="reset" onClick={this.handleReset}>取消</Button></Col>
	      			<Col span={4} push={16}><Button type='primary' htmlType="submit">确定</Button></Col>
		      	</Row>
		      </Form>
	      </div>
		  <div id={this.state.domId} style={{width:'calc(50vw - 30px)',height:'calc(100vh - 90px)',float:'left',position:'relative'}}>
		  	<div id={`${this.state.templatePickerDivId}`}></div>
		  	<div style={{position:'absolute',top:'10px',right:'10px',zIndex:1,fontSize:'20px',background:'white'}}>
		  		按住Ctrl键并点击要素可以进行删除操作
		  	</div>
		  </div>
		  <Spin size='large' style={
		  	this.state.loading?{position:'absolute',top:'50%',left:'50%',display:'block'}
		  	:{position:'absolute',top:'50%',left:'50%',display:'none'}
		  }/>
		</div>
	}
	componentDidMount () {
		/*console.log('loading modules')
		console.time('modules loaded')*/
		const item = this.props.item;
		//如果item ==null表示是新建一个项目
		//如果item !=null表示是编辑一个项目
		if(!item){
			this.newZaiHou();
		}else{
			this.updateProject();
		}
	}
	showSpin(){
		this.setState({
			...this.state,
			loading:true
		})
	}
	hideSpin(){
		this.setState({
			...this.state,
			loading:false
		})
	}
	newZaiHou(){
			const mapUrl = this.state.mapUrl;
			const domId = this.state.domId;
			var imgMap,imgMapMarker;
			//let map,editToolbar,editingEnabled=false,featureLayer1,drawToolbar;
			var {map,editToolbar,editingEnabled,featureLayer1,drawToolbar,add,selectedTemplate}={...this.state.mapProp}
			editingEnabled=false
		  	dojoRequire(
		      	[
			       "esri/map",
			        "esri/toolbars/edit",
			        "esri/toolbars/draw",
        			"esri/graphic",
        			"esri/SpatialReference",
        			"esri/geometry/Point",
        			"esri/dijit/editing/Add",
			        

			        "esri/layers/ArcGISDynamicMapServiceLayer",
			        "esri/layers/FeatureLayer",
			        "esri/dijit/editing/TemplatePicker",

			        "esri/symbols/SimpleFillSymbol",
			        "esri/symbols/SimpleLineSymbol",
			        "esri/symbols/SimpleMarkerSymbol",
			        "esri/Color", 
			        "esri/renderers/SimpleRenderer",
			        
			        "esri/layers/WebTiledLayer",
			        "esri/layers/TileInfo",

			        "esri/config",
			        "dojo/i18n!esri/nls/jsapi",

			        "dojo/_base/array", "dojo/parser", "dojo/keys","dojo/_base/event",
			        
			        "dojo/domReady!"
		      	], 
				(
					Map,Edit,Draw,Graphic,SpatialReference,Point,Add,
					ArcGISDynamicMapServiceLayer, FeatureLayer,TemplatePicker,
					SimpleFillSymbol,SimpleLineSymbol,SimpleMarkerSymbol, Color, SimpleRenderer,
					WebTiledLayer,TileInfo,
					esriConfig, jsapiBundle,
					arrayUtils, parser, keys,event
				)=>{
		      		this.showSpin();
		      		let reactDom = this;
		      		console.log(this)
			        
			        map = new Map(domId, {
						zoom:8,
			          	slider: false
			        });
			       	var tileInfo = new TileInfo(tileInfoObj)
			        
			       	imgMap = new WebTiledLayer("http://\${subDomain}.tianditu.com/DataServer?T=img_c&X=\${col}&Y=\${row}&L=\${level}", {
			            "id": "TiandituImg",
			            "subDomains": ["t0", "t1", "t2"],
			            "tileInfo": tileInfo,
			        });

			        //底图标注
			        imgMapMarker = new WebTiledLayer(
			        "http://\${subDomain}.tianditu.com/DataServer?T=cia_c&X=\${col}&Y=\${row}&L=\${level}", {
			            "id": "TiandituImgMarker",
			            "subDomains": ["t0", "t1", "t2"],
			            "tileInfo": tileInfo,
			        });

			        featureLayer1 = new FeatureLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/FeatureServer/35", {
			          mode: FeatureLayer.MODE_SNAPSHOT,
			          definitionExpression: 'id=-1',
			          outFields:['*']
			        });

			  		
					let symbol2 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
					    new Color([255,0,0]), 5)
					let renderer = new SimpleRenderer(symbol2);
					featureLayer1.setRenderer(renderer);
					featureLayer1.on("dbl-click", function(evt) {
			              	event.stop(evt);
			              	if (editingEnabled === false) {
			                	editingEnabled = true;
			                	console.log(evt)
			                	
			                	editToolbar.activate(Edit.MOVE|Edit.EDIT_VERTICES , evt.graphic);
			              	} else {
			                	editToolbar.deactivate();
			                	editingEnabled = false;
			              	}
			              	reactDom.setState({
				            	...reactDom.state,
				            	mapProp:{
				            		...reactDom.state.mapProp,selectedTemplate,
				            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
				            	}
				            })
		            });
		            	//ctrl+单击s删除
		            featureLayer1.on("click", function(evt) {
		              	event.stop(evt);
		              	console.log(evt)
		              	if (evt.ctrlKey === true || evt.metaKey === true) {  //delete feature if ctrl key is depressed
		                	featureLayer1.applyEdits(null,null,[evt.graphic]);
		                	featureLayer1 = this;
		                	editToolbar.deactivate();
		                	editingEnabled=false;
		              	}
		              	reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,add,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
			            	}
			        	})
		            });
		            featureLayer1.on("graphic-add", function(evt) {
		            	//id为空表示这个是新加的元素
		            	console.log(evt);
		            	if(!evt.graphic.attributes.id){
		            		
		            		//evt.graphic.attributes.id = evt.graphic.attributes.OBJECTID_1;
		            		//featureLayer1.applyEdits(null,evt.graphic,null)
		            	}
		              	
		            });
					//console.log(featureLayer1)
					var templatePicker = new TemplatePicker({
				            featureLayers: [featureLayer1],
				            rows: "auto",
				            columns:1,
				            style: "height: auto; overflow: auto;position:absolute;z-index:1;bakcground:transparent;",
				            items:[{label:'点击添加项目',description:''}],
				            useLegend:false,

				    }, `${reactDom.state.templatePickerDivId}`);
				        
			        templatePicker.on("selection-change", function() {
			            if( templatePicker.getSelected() ) {
			              selectedTemplate = templatePicker.getSelected();
			            }
			            switch (selectedTemplate.featureLayer.geometryType) {
			              case "esriGeometryPoint":
			                drawToolbar.activate(Draw.POINT);
			                break;
			              case "esriGeometryPolyline":
			                drawToolbar.activate(Draw.POLYLINE);
			                break;
			              case "esriGeometryPolygon":
			                drawToolbar.activate(Draw.POLYGON);
			                break;
			            }
			            reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,add,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
			            	}
			        	})
			        });

		            editToolbar = new Edit(map);
		            //编辑操作完成应用编辑
		            editToolbar.on("deactivate", function(evt) {
		        		console.log(evt)

		        		reactDom.toApplyEdits(null, [evt.graphic], null)
		            	reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
			            	}
		            	})
			        });
			        editToolbar.on("graphic-move-stop",function(evt){
			        	console.log(reactDom)
			        	console.log(evt)
			        	var a = evt.graphic.geometry.paths[0].length;
			        	reactDom.setCorridate(
			        		`${evt.graphic.geometry.paths[0][0][0]}`,
			        		`${evt.graphic.geometry.paths[0][0][1]}`,
			        		`${evt.graphic.geometry.paths[0][a-1][0]}`,
			        		`${evt.graphic.geometry.paths[0][a-1][1]}`,
			        	)
			        	reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
			            	}
			            })
			        })
			        editToolbar.on("vertex-move",function(evt){
			        	console.log(reactDom)
			        	console.log(evt)
			        	var a = evt.graphic.geometry.paths[0].length;
			        	reactDom.setCorridate(
			        		`${evt.graphic.geometry.paths[0][0][0]}`,
			        		`${evt.graphic.geometry.paths[0][0][1]}`,
			        		`${evt.graphic.geometry.paths[0][a-1][0]}`,
			        		`${evt.graphic.geometry.paths[0][a-1][1]}`,
			        	)
			        	
			        	reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
			            	}
			            })
			        })

			       	drawToolbar = new Draw(map);
			        //drawToolbar.activate(Draw.POINT);
			        drawToolbar.on("draw-end", function(evt) {
			        	//console.log(evt)
			            drawToolbar.deactivate();
			            editToolbar.deactivate();
			            let newAttributes = selectedTemplate.template.prototype.attributes;
			            console.log(newAttributes.OBJECTID_1)
			            newAttributes.id=-1;
			            let newGraphic = new Graphic(evt.geometry, null, newAttributes);
			            console.log(newGraphic)
			            add = new Add({
			            	featureLayer:featureLayer1,
			            	addedGraphics:[newGraphic]
			            })
			            reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,add,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar,newGraphic
			            	}
			            })
			            var a = newGraphic.geometry.paths[0].length;
			        	reactDom.setCorridate(
			        		`${newGraphic.geometry.paths[0][0][0]}`,
			        		`${newGraphic.geometry.paths[0][0][1]}`,
			        		`${newGraphic.geometry.paths[0][a-1][0]}`,
			        		`${newGraphic.geometry.paths[0][a-1][1]}`,
			        	)
			            reactDom.toApplyEdits([newGraphic], null, null)
			        });

					map.on("layers-add-result", initEditing);
			        map.addLayers([imgMap,imgMapMarker,featureLayer1]);
			        
			        function initEditing(e){
						console.log(e)
						//双击编辑
						map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
						reactDom.hideSpin();

						templatePicker.startup();
			           
						reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,selectedTemplate,templatePicker,
			            		map,editToolbar,featureLayer1,drawToolbar
			            	}
			        	})
			        }
		      		
		      	}
			)
	}
	setCorridate(x1,y1,x2,y2){
		let reactDom = this;
		reactDom.setState({
    		...reactDom.state,
    		qidian_x:`${x1}`,
    		qidian_y:`${y1}`,
    		zhongdian_x:`${x2}`,
    		zhongdian_y:`${y2}`,
    	})
        reactDom.props.form.setFieldsValue({"起点东经":reactDom.state.qidian_x})
		reactDom.props.form.setFieldsValue({"起点北纬":reactDom.state.qidian_y})
		reactDom.props.form.setFieldsValue({"终点东经":reactDom.state.zhongdian_x})
		reactDom.props.form.setFieldsValue({"终点北纬":reactDom.state.zhongdian_y})
	}
	toApplyAdd(add,update,remove,success,error){
		this.state.mapProp.add.performRedo();
		//this.state.mapProp.featureLayer1.applyEdits(add,update,remove,success,error);
		this.state.mapProp.featureLayer1.refresh();
		console.log(this.state.mapProp.featureLayer1)
	}
	toApplyEdits(add,update,remove,success,error){
		this.state.mapProp.featureLayer1.applyEdits(add,update,remove,success,error);
	}
	handleSubmit = (e)=>{
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if(!err){
	      	//为防止将数据信息提交到数据库失败
	      	//将地图要素的更新放在effect中进行
	      	console.log('Received values of form: ', values);

	      	var newGraphic = this.state.mapProp.featureLayer1.graphics[0];
		    newGraphic.id = newGraphic.OBJECTID_1;
		    //更新id
		    this.state.mapProp.featureLayer1.applyEdits(null,newGraphic,null)
		    var projectId = newGraphic.attributes.OBJECTID_1;

	      	values.id=projectId;
	      	this.props.onSubmit(values)
	      }
	    });
	    //mapProp的featureLayer1保存了编辑过的graphics信息，

	    // var newGraphic = this.state.mapProp.featureLayer1.graphics[0];
	    // newGraphic.id = newGraphic.OBJECTID_1;
	    // this.state.mapProp.featureLayer1.applyEdits(null,newGraphic,null)
	    var projectId = newGraphic.attributes.OBJECTID_1;
	    console.log(this.state.mapProp)
  	}	
}

export default Form.create()(NewZaiHou)