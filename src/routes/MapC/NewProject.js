
// modules/Map.js
import React from 'react'
import { Spin ,Form,Button,Input,Row,Col,Upload, message, Icon,InputNumber,Cascader,Modal,DatePicker   } from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import {DICT_FIXED_BY_PROVINCE} from '../../utils/city'
import {api} from '../../utils/config'
import {TileInfoObj,TDTUrl,FeatureLayerUrl,GiSApiUrl,MapUrl} from './mapConfig'
import EsriLoader from 'esri-loader-react'
import styles from './index.less'

const dateFormat = 'YYYY/MM/DD';
const city = DICT_FIXED_BY_PROVINCE('河南省')
const esriOptions = {
    url:GiSApiUrl
    //url:'https://js.arcgis.com/3.21/'
}
const FormItem = Form.Item;
const colProps={

}
const formItemLayout = {
	labelCol:{span:9},
	wrapperCol:{span:15},
}
const numberInput={
	type:'number',
	min:"0",
	step:"0.01"
}
class NewProject extends React.Component {
	constructor (props) {
		console.log(props)
		const {getFieldDecorator,setFieldsValue} = props.form
		super(props)
		this.state = {
			submitSpin:false, 
			mapLoaded: false ,
			mapUrl:MapUrl,
			loading:true,
			qidian_x:'',
    		qidian_y:'',
    		zhongdian_x:'',
    		zhongdian_y:'',
			id:-1,
			newFeatureName:props.newFeatureName,
			domId:`${props.type}newMap`,
			templatePickerDivId:`newProjecttemplate_${Math.floor(Math.random()*1000)}`,
			mapProp:{
				map:undefined,editToolbar:undefined,add:undefined,selectedTemplate:undefined,
				editingEnabled:undefined,featureLayer1:undefined,drawToolbar:undefined,
				newGraphic:undefined,templatePicker:undefined,
			},//存储地图操作的一些变量
			fileList:[]//存储待上传的文件
		}
		//console.log(this.state)
		//console.log(this.state)
		this.handleReset = this.handleReset.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCancel = this.handleCancel.bind(this)

		this.showSpin = this.showSpin.bind(this)
		this.hideSpin = this.hideSpin.bind(this)
		this.newProject = this.newProject.bind(this)
		this.setCorridate = this.setCorridate.bind(this)
		this.toApplyEdits = this.toApplyEdits.bind(this)
	}
	handleReset(e){
		console.log(this)
    	this.props.form.resetFields();
  	}
  	handleSubmit(e){
	    e.preventDefault();
	    if(this.state.id==-1){
	    	let a = Modal.error({
		        title:'请在地图上绘制要素',
				
				onCancel(){
					a.destroy()
				}
			})
			return
	    }
	    this.props.form.validateFields((err, values) => {
	      if(!err){
	      	console.log(values);
		    let newGraphic = this.state.mapProp.newGraphic
	      	var projectId = newGraphic.attributes.OBJECTID_1;
	      	const { fileList } = this.state;
	    	const formData = new FormData();
	    	fileList.forEach((file) => {
	      		formData.append('Files[]', file);
	    	});
	    	console.log(formData)
		    values.id=projectId;
	      	this.props.onSubmit({
		      	formData:formData,
		      	values:values
		    })
	      }
	    });
  	}

  	handleCancel(e){
  		e.preventDefault();
  		let that = this;
  		let a = Modal.confirm({
	        title:'你的操作不会被保存，是否继续？',
			onOk(e){
				a.destroy()
				let newGraphic = that.state.mapProp.newGraphic
		  		console.log('del')
		  		console.log(newGraphic)
		  		if(newGraphic){
		  			that.state.mapProp.featureLayer1.applyEdits(null,null,[newGraphic])
		  		}
		  		that.props.hideModal();
			},
			onCancel(){
				a.destroy()
			}
		})
  	}

	render () {
		// show any map errors
		const reactDom = this;
		const error = this.state.error
		let input1,input2;
		const uploadProps={
			name: 'file',
		  	action: `${api.fileUpload}`,
		  	fileList: reactDom.state.fileList,
		  	accept:'image/*,application/pdf,video/*',
		  	beforeUpload(file){
		  		console.log(file.type)
		  		let fileType = file.type.toString()
		  		console.log(fileType)
		  		console.log(fileType.indexOf('image'))
		  		const accepted = fileType.indexOf('image') >-1||fileType.indexOf('video') >-1||fileType.indexOf('application/pdf') >-1;
				if (!accepted) {
				  	message.error('你只能上传图片/视频/pdf!',5);
				  	return false
				}
				const isLt5M = file.size / 1024 / 1024 < 5;
				if (!isLt5M) {
				  	message.error('上传文件大小需小于5MB!',5);
					return false
				}
				reactDom.setState(({ fileList }) => ({
		          	fileList: [...fileList, file],
		        }));
				return false;
		  	},
		  	onRemove: (file) => {
        		this.setState(({ fileList }) => {
		          	const index = fileList.indexOf(file);
		          	const newFileList = fileList.slice();
		          	newFileList.splice(index, 1);
		          	return {
		            	fileList: newFileList,
		          	};
	        	});
    		}
		}
		if (error) {
		  return <div className='container'>
		    <div className='alert alert-danger alert-map'>{error}</div>
		    <button className='btn btn-default' onClick={hashHistory.goBack}>Go back</button>
		  </div>
		}
		return(
			<Modal
		        title=""
		        visible={this.props.visible}
		        style={{ top: 20 }}
		        onCancel={this.handleCancel}
		        width='calc(~"100vw - 60px")'
		        height='calc(~"100vh - 90px")'
		        footer={null}
	        >
	        <Spin size='large' spinning={this.props.submitSpin}>
			 	<div style={{overflow:'hidden'}}>
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
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='流域/河流'>
							      	  		{this.props.form.getFieldDecorator('流域河流', {
								  	    	      rules: [{ required: true, message: '不能为空！' }]
								  	    	    	})(
							      	    	  	<Cascader options={this.props.riverInfo} placeholder=""/>
							      	    		)}
								  	  	</FormItem>
							      	</Col>
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='所在水系'>
							        	{this.props.form.getFieldDecorator('所在水系', {
								            rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							      	  	</FormItem>
							      	</Col>
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='所在流域面积'>
							      	  		{this.props.form.getFieldDecorator('所在流域面积', {
								  	    	      //rules: [{ required: true, message: '不能为空！' }],
								  	    	    	})(
							      	    	  	<Input {...numberInput} addonAfter="Km²"/>
							      	    		)}
							      	  	</FormItem>
							      	</Col>
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='所在河流长度'>
							      	  		{this.props.form.getFieldDecorator('所在河流长度', {
								  	    	      //rules: [{ required: true, message: '不能为空！' }],
								  	    	    	})(
							      	    	  	<Input {...numberInput} addonAfter="Km"/>
							      	    		)}
							      	  	</FormItem>
							      	</Col>
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='市/县行政区'>
							      	  		{this.props.form.getFieldDecorator('市行政区', {
								  	  	        //rules: [{ required: true, message: '不能为空！' }],
								  	  	      	})(
							      	  	    	<Cascader options={city} placeholder=""/>
							      	  	  	)}
							      	  	</FormItem>
							      	</Col>
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='前期工作'>
							      	  		{this.props.form.getFieldDecorator('前期工作', {
								  	  	        //rules: [{ required: true, message: '不能为空！' }],
								  	  	      	})(
							      	  	    	<Input />
							      	  	  	)}
							      	  	</FormItem>
							      	</Col>
							      	<Col span={8}>
							      	  	<FormItem {...formItemLayout} label='规划投资'>
							      	  		{this.props.form.getFieldDecorator('规划投资', {
								  	  	        //rules: [{ required: true, message: '不能为空！' }],
								  	  	      	})(
							      	  	    	<Input {...numberInput} addonAfter="万元"/>
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
							    </Row>
					      	</fieldset>
					      	<fieldset>
					      		<legend>主要工程措施</legend>
					      		<Row>
					      			<Col span={8}>
							        <FormItem {...formItemLayout} label='河道治理长度'>
							        	{this.props.form.getFieldDecorator('河道治理长度', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="Km"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='新建堤防'>
							        	{this.props.form.getFieldDecorator('新建堤防', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='加固堤防'>
							        	{this.props.form.getFieldDecorator('加固堤防', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='清淤河长'>
							        	{this.props.form.getFieldDecorator('清淤河长', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='其他'>
							        	{this.props.form.getFieldDecorator('其他', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='设计防洪标准'>
							        	{this.props.form.getFieldDecorator('设计防洪标准', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='设计除涝标准'>
							        	{this.props.form.getFieldDecorator('设计除涝标准', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
					      		</Row>
					      	</fieldset>
					      	<fieldset>
					      		<legend>治理效果</legend>
					      		<Row>
					      			<Col span={8}>
							        <FormItem {...formItemLayout} label='保护城镇'>
							        	{this.props.form.getFieldDecorator('保护城镇', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='保护人口'>
							        	{this.props.form.getFieldDecorator('保护人口', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万人"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='保护耕地'>
							        	{this.props.form.getFieldDecorator('保护耕地', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万亩"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='排涝收益'>
							        	{this.props.form.getFieldDecorator('排涝收益', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput}  addonAfter="万亩"/>
							          	)}
							        </FormItem>
							      </Col>
					      		</Row>
					      	</fieldset>
					      	<fieldset>
					      		<legend>资金情况</legend>
					      		<Row>
					      			<Col span={8}>
							        <FormItem {...formItemLayout} label='批复资金'>
							        	{this.props.form.getFieldDecorator('批复资金', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='总投资'>
							        	{this.props.form.getFieldDecorator('总投资', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='移民征地'>
							        	{this.props.form.getFieldDecorator('移民征地', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='拆迁补偿'>
							        	{this.props.form.getFieldDecorator('拆迁补偿', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='省级投资'>
							        	{this.props.form.getFieldDecorator('省级投资', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='市县投资'>
							        	{this.props.form.getFieldDecorator('市县投资', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='中央投资'>
							        	{this.props.form.getFieldDecorator('中央投资', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput} addonAfter="万元"/>
							          	)}
							        </FormItem>
							      </Col>
					      		</Row>
					      	</fieldset>
					      	<fieldset>
					      		<legend>工程验收</legend>
					      		<Row>
					      			<Col span={8}>
							        <FormItem {...formItemLayout} label='绩效评分'>
							        	{this.props.form.getFieldDecorator('绩效评分', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='竣工时间'>
							        	{this.props.form.getFieldDecorator('竣工时间', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<DatePicker  format={dateFormat} />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='验收单位'>
							        	{this.props.form.getFieldDecorator('验收单位', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='验收文号'>
							        	{this.props.form.getFieldDecorator('验收文号', {
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
					      		</Row>
					      	</fieldset>

					      	<fieldset>
					      		<legend>十二五</legend>
					      		<Row>
					      			<Col span={12}>
								        <FormItem {...formItemLayout} label='第一次水利普查序号'>
								        	{this.props.form.getFieldDecorator('第一次水利普查序号', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='项目分类'>
								        	{this.props.form.getFieldDecorator('项目分类', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='主要建设内容'>
								        	{this.props.form.getFieldDecorator('主要建设内容', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='规划依据'>
								        	{this.props.form.getFieldDecorator('规划依据', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='项目审批情况'>
								        	{this.props.form.getFieldDecorator('项目审批情况', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='新建护岸'>
								        	{this.props.form.getFieldDecorator('新建护岸', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='加固护岸'>
								        	{this.props.form.getFieldDecorator('加固护岸', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='清淤量'>
								        	{this.props.form.getFieldDecorator('清淤量', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='新建或加固穿堤建筑物'>
								        	{this.props.form.getFieldDecorator('新建或加固穿堤建筑物', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='滨岸带治理面积'>
								        	{this.props.form.getFieldDecorator('滨岸带治理面积', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='整治入河排污口'>
								        	{this.props.form.getFieldDecorator('整治入河排污口', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='治理前防洪标准'>
								        	{this.props.form.getFieldDecorator('治理前防洪标准', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='治理前除涝标准'>
								        	{this.props.form.getFieldDecorator('治理前除涝标准', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='永久占地'>
								        	{this.props.form.getFieldDecorator('永久占地', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='总投资不含移民投资'>
								        	{this.props.form.getFieldDecorator('总投资不含移民投资', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}  addonAfter="万元"/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='其中移民占地投资'>
								        	{this.props.form.getFieldDecorator('其中移民占地投资', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}  addonAfter="万元"/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='实际完成投资'>
								        	{this.props.form.getFieldDecorator('实际完成投资', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}  addonAfter="万元"/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='中央投资'>
								        	{this.props.form.getFieldDecorator('中央投资', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}  addonAfter="万元"/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='批复投资'>
								        	{this.props.form.getFieldDecorator('批复投资', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}  addonAfter="万元"/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='完成投资'>
								        	{this.props.form.getFieldDecorator('完成投资', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}  addonAfter="万元"/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='规划综合治理河长'>
								        	{this.props.form.getFieldDecorator('规划综合治理河长', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='实际完成综合治理河长'>
								        	{this.props.form.getFieldDecorator('实际完成综合治理河长', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input  {...numberInput}/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='是否开工'>
								        	{this.props.form.getFieldDecorator('是否开工', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='是否竣工'>
								        	{this.props.form.getFieldDecorator('是否竣工', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='是否竣工验收'>
								        	{this.props.form.getFieldDecorator('是否竣工验收', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='省级绩效评价得分'>
								        	{this.props.form.getFieldDecorator('省级绩效评价得分', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='是否进行竣工审计'>
								        	{this.props.form.getFieldDecorator('是否进行竣工审计', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<Input/>
								          	)}
								        </FormItem>
						      		</Col>
						      		<Col span={12}>
								        <FormItem {...formItemLayout} label='开工时间'>
								        	{this.props.form.getFieldDecorator('开工时间', {
									            //rules: [{ required: true, message: '不能为空！' }],
									          	})(
								            	<DatePicker  format={dateFormat} />
								          	)}
								        </FormItem>
						      		</Col>
					      		</Row>
					      	</fieldset>

					      	<fieldset>
					      		<legend>其他</legend>
					      		<Row>
					      			<Col span={12}>
						      			<FormItem labelCol={{span:6}} wrapperCol={{span:15}} label='文件上传'>
											        	<Upload {...uploadProps}>
										            		<Button>
										            			<Icon type='upload' />点击上传
										            		</Button>
										            	</Upload>
										</FormItem>
									</Col>
					      			
							      <Col span={8}>
							        <FormItem {...formItemLayout} label='批复文号'>
							        	{this.props.form.getFieldDecorator('批复文号',{
							            	 rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input />
							          	)}
							        </FormItem>
							      </Col>
							      </Row>
					      	</fieldset>
					      	<Row style={{marginTop:'10px'}}>
				      			<Col span={4} push={16}><Button htmlType="reset" onClick={this.handleCancel}>取消</Button></Col>
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
			</Spin>
			</Modal>
		)
		
	}
	componentDidMount () {
		/*console.log('loading modules')
		console.time('modules loaded')*/
		const item = this.props.item;
		//如果item ==null表示是新建一个项目
		//如果item !=null表示是编辑一个项目
		if(item == null)
			this.newProject()
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
	newProject(){
		
		const mapUrl = this.state.mapUrl;
		const domId = this.state.domId;
		var imgMap,imgMapMarker;
		//let map,editToolbar,editingEnabled=false,featureLayer1,drawToolbar;
		var {map,editToolbar,editingEnabled,featureLayer1,drawToolbar,add,selectedTemplate,templatePicker}={...this.state.mapProp}
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
	      		this.showSpin()
	      		let reactDom = this;
		        
		        map = new Map(domId, {
		        	//basemap:'satellite',
					zoom:8,
		          	slider: false
		        });
		        map.on("layers-add-result", initEditing);


		        var tileInfo = new TileInfo(TileInfoObj)
		       	imgMap = new WebTiledLayer(TDTUrl.ImgUrl, {
		            "id": "TiandituImg",
		            "subDomains": ["t0", "t1", "t2"],
		            "tileInfo": tileInfo,
		        });

		        //底图标注
		        imgMapMarker = new WebTiledLayer(
		        	TDTUrl.MarkerUrl, {
		            "id": "TiandituImgMarker",
		            "subDomains": ["t0", "t1", "t2"],
		            "tileInfo": tileInfo,
		        });

		        featureLayer1 = new FeatureLayer(FeatureLayerUrl, {
		          	mode: FeatureLayer.MODE_SNAPSHOT,
		          	definitionExpression: `NAME='${reactDom.state.newFeatureName}'`,
		          	outFields:['*']
		        });
		        
		  		
				let symbol2 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				    new Color([255,0,0]), 5)
				let renderer = new SimpleRenderer(symbol2);
				featureLayer1.setRenderer(renderer);
				//console.log(featureLayer1)
				map.addLayers([imgMap,imgMapMarker,featureLayer1]);
				
		        function _setZuoBiao(evt){
					//console.log(reactDom)
		        	//console.log(evt)
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
				}

		        function initEditing(e){
					console.log('initEditing')
					map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
					
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

		            //双击编辑
			        featureLayer1.on("dbl-click", function(evt) {
		              	event.stop(evt);
		              	if (editingEnabled === false) {
		                	editingEnabled = true;
		                	console.log(evt)
		                	reactDom.setState({
			        			...reactDom.state,
			        			qidian:evt.graphic.geometry.x,
			        			zhongdian:evt.graphic.geometry.y
			        		})
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
			            	id:-1,
			            	mapProp:{
			            		...reactDom.state.mapProp,add,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
			            	}
			        	})
		            });

		            featureLayer1.on("graphic-add", function(evt) {
			            	//console.log(evt);
			            	if(!evt.graphic.attributes.id){
			            		
			            		//evt.graphic.attributes.id = evt.graphic.attributes.OBJECTID_1;
			            		//featureLayer1.applyEdits(null,evt.graphic,null)
			            	}
			              	
			        });

			        if(templatePicker==undefined){
		            	templatePicker = new TemplatePicker({
				            featureLayers: [featureLayer1],
				            rows: "auto",
				            columns:1,
				            style: "height: auto; overflow: auto;position:absolute;z-index:1;bakcground:transparent;",
				            items:[{label:'点击添加项目',description:''}],
				            useLegend:false,

			    		}, `${reactDom.state.templatePickerDivId}`);
			        }
					templatePicker.startup();
					drawToolbar = new Draw(map);
					console.log('hide')
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

					editToolbar.on("graphic-move-stop",function(evt){
			        	_setZuoBiao(evt)
			        })

			        editToolbar.on("vertex-move-stop",function(evt){
				       	_setZuoBiao(evt)
				    })

			        drawToolbar.on("draw-end", function(evt) {
			        	//console.log(evt)
			            drawToolbar.deactivate();
			            editToolbar.deactivate();
			            let newAttributes = selectedTemplate.template.prototype.attributes;
			            newAttributes.NAME = reactDom.state.newFeatureName
			            
			            let newGraphic = new Graphic(evt.geometry, null, newAttributes);
			           	reactDom.setState({
			            	...reactDom.state,
			            	mapProp:{
			            		...reactDom.state.mapProp,add,selectedTemplate,
			            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar,newGraphic
			            	}
			            })
			            reactDom.toApplyEdits([newGraphic], null, null,(succ)=>{
			            	reactDom.state.mapProp.newGraphic.attributes.id = succ[0].objectId
			            	//featureLayer1.graphics[0].attributes.id.
		            		reactDom.toApplyEdits(null,[reactDom.state.mapProp.newGraphic], null,(succ)=>{
		            			console.log(succ)
		            			reactDom.setState({
		            				...reactDom.state,
		            				id:reactDom.state.mapProp.newGraphic.attributes.id
		            			})
		            		})
			            	
			            	},(err)=>{
			            	console.log('添加失败 :')
			            	console.log(err)
				        })

				        var a = evt.geometry.paths[0].length;
				        reactDom.setCorridate(
				        		`${newGraphic.geometry.paths[0][0][0]}`,
				        		`${newGraphic.geometry.paths[0][0][1]}`,
				        		`${newGraphic.geometry.paths[0][a-1][0]}`,
				        		`${newGraphic.geometry.paths[0][a-1][1]}`,
				        )
			        });

					reactDom.setState({
		            	...reactDom.state,
		            	mapProp:{
		            		...reactDom.state.mapProp,add,selectedTemplate,
		            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
		            	}
		        	})

		        	reactDom.hideSpin()
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
	toApplyEdits(add,update,remove,success,error){
		this.state.mapProp.featureLayer1.applyEdits(add,update,remove,success,error);
	}
	
}

export default Form.create()(NewProject)

//12637665.44279583,4108917.4768558647