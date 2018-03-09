
// modules/Map.js
import React from 'react'
import { Spin ,Form,Button,Input,Row,Col,Upload, message, Icon,InputNumber,Cascader ,Modal ,Carousel} from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import config from '../../utils/config'
import {DICT_FIXED_BY_PROVINCE} from '../../utils/city'
import {TileInfoObj,TDTUrl,FeatureLayerUrl,GiSApiUrl,MapUrl} from './mapConfig'
import EsriLoader from 'esri-loader-react'
import styles from './index.less'


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
	step:'0.01'
}

class UpdateZaiHou extends React.Component {
	constructor (props) {
		super(props)
		console.log(props)
		const {getFieldDecorator,setFieldsValue} = props.form
		this.state = { 
			mapLoaded: false ,
			mapUrl:MapUrl,
			loading:true,
			qidian:'',
			zhongdian:'',
			id:props.item.id,
			domId:`${props.type}updateMap`,
			templatePickerDivId:`updateZaihoutemplate_${Math.floor(Math.random()*1000)}`,
			imageModal:{
				visible:false
			},
			videoModal:{
				visible:false
			},mapProp:{
				map:undefined,editToolbar:undefined,add:undefined,selectedTemplate:undefined,
				editingEnabled:undefined,featureLayer1:undefined,drawToolbar:undefined,
				newGraphic:undefined,templatePicker:undefined,
			}//存储地图操作的一些变量
		}
		this.showImageModal = this.showImageModal.bind(this)
		this.hideImageModal = this.hideImageModal.bind(this)
		this.showVideoModal = this.showVideoModal.bind(this)
		this.hideVideoModal = this.hideVideoModal.bind(this)

		this.handleReset = this.handleReset.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	showImageModal(){
		this.setState({
			imageModal:{visible:true},
		})
	}
	hideImageModal(){
		this.setState({
			imageModal:{visible:false},
		})
	}
	showVideoModal(){
		this.setState({
			videoModal:{visible:true},
		})
	}
	hideVideoModal(){
		let myVideo = document.getElementById("video");
		if (myVideo&&myVideo.played) 
	  		myVideo.pause()
		this.setState({
			videoModal:{visible:false},
		})
	}
	handleReset(e){
			//console.log(this)
	    	//ReactDom.props.form.resetFields();
	    	this.props.onCancel();
	  	}
	handleSubmit(e){
		//console.log(this)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    	if(err){
      		let a =Modal.error({
      			title:'请认真填写完整！',
      			onOk(e){
      				a.destroy()
      			},
      			onCancel(e){
      				a.destroy()
      			}
      		})
      	}else{
      		values.id = this.props.item.id
      		this.props.onSubmit(values)
      	}
    });
	}
	render () {
		// show any map errors
		let picInfo=[],imageModal,picUrl=this.props.item.picUrl;
		const ReactDom = this;
		const error = this.state.error
		let input1,input2;

		const imageModalProps={
  			visible:this.state.imageModal.visible,
  			onOk:this.showImageModal,
  			onCancel:this.hideImageModal
	  	}
	  	const videoModalProps={
	  		visible:this.state.videoModal.visible,
	  		onOk:this.showVideoModal,
  			onCancel:this.hideVideoModal
	  	}
	  	
		if (error) {
		  return <div className='container'>
		    <div className='alert alert-danger alert-map'>{error}</div>
		    <button className='btn btn-default' onClick={hashHistory.goBack}>Go back</button>
		  </div>
		}
		return (
			<Modal
		        title=""
		        visible={this.props.visible}
		        style={{ top: 20 }}
		        onCancel={this.props.onCancel}
		        width='calc(~"100vw - 60px")'
		        height='calc(~"100vh - 90px")'
		        footer={null}
	        >
			<div style={{overflow:'hidden'}}>
		 		<EsriLoader options={esriOptions}/>
		   		<Modal {...imageModalProps} footer={null}>
				{
		   			picUrl.length>0
					?<Carousel autoplay className={styles.carousel}>
			            picUrl.map((src,i)=>(
			            	<div  key={i}>
		          				<img src={src} alt="" style={{margin:"0 auto"}} width="100%" height="100%"/>
		        			</div>
			            ))
			        </Carousel>
			        :<img src={config.noimage} alt="图片不存在" style={{margin:"0 auto"}} width="100%" height="100%"/>
		    	}
				</Modal>
				<Modal {...videoModalProps} footer={null}>
					<video controls id="video">
						<source src="http://172.36.16.2:6500/项目照片和视频/0/23-视频-01.mp4" type="video/mp4" />
					</video>
					{/*<video width='400px' src="./resource/01.mp4" controls="controls"></video>*/}
				</Modal>
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
						        <FormItem {...formItemLayout} label='项目类型'>
						        	{this.props.form.getFieldDecorator('项目类型', {
							            rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='所在河流'>
						        	{this.props.form.getFieldDecorator('所在河流', {
							            rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='流域面积'>
						        	{this.props.form.getFieldDecorator('流域面积', {
							            rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='所属流域'>
						        	{this.props.form.getFieldDecorator('所属流域', {
							            rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='市/县行政区'>
						        	{this.props.form.getFieldDecorator('市行政区', {
							            rules: [{ required: true, message: '不能为空！' }],
							          	initialValue:[this.props.item['所在市'],this.props.item['所在县']]
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
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input/>
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
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='建设任务治理河长'>
						        	{this.props.form.getFieldDecorator('建设任务治理河长', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='投资'>
						        	{this.props.form.getFieldDecorator('投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
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
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput}  addonAfter="Km"/>
							          	)}
							        </FormItem>
						      	</Col>
						      	<Col span={8}>
						        	<FormItem {...formItemLayout} label='批复投资'>
						        	{this.props.form.getFieldDecorator('批复投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput}  addonAfter="万元"/>
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
								            //rules: [{ required: true, message: '不能为空！' }],
								          	})(
							            	<Input {...numberInput}  addonAfter="Km"/>
							          	)}
							        </FormItem>
						      	</Col>
						        <Col span={8}>
						          	<FormItem {...formItemLayout} label='批复及初审投资'>
							          	{this.props.form.getFieldDecorator('批复及初审投资', {
								              //rules: [{ required: true, message: '不能为空！' }],
								            	})(
							              	<Input {...numberInput} addonAfter="万元"/>
							            )}
						          	</FormItem>
						        </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='测算投资'>
						        	{this.props.form.getFieldDecorator('测算投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='中央资金'>
						        	{this.props.form.getFieldDecorator('中央资金', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='省级资金'>
						        	{this.props.form.getFieldDecorator('省级资金', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='备注'>
						        	{this.props.form.getFieldDecorator('备注', {
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
				      		<legend>原规划内中小河流结转项目</legend>
				      		<Row>
				      			<Col span={8}>
						        <FormItem {...formItemLayout} label='项目分类2'>
						        	{this.props.form.getFieldDecorator('项目分类2', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='治理河长1'>
						        	{this.props.form.getFieldDecorator('治理河长1', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput} addonAfter="Km"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='保护人口'>
						        	{this.props.form.getFieldDecorator('保护人口', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput} addonAfter="人"/>
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
						        <FormItem {...formItemLayout} label='排涝受益面积'>
						        	{this.props.form.getFieldDecorator('排涝受益面积', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万亩"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='原规划中央投资'>
						        	{this.props.form.getFieldDecorator('原规划中央投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						       <Col span={8}>
						        <FormItem {...formItemLayout} label='原规划地方投资'>
						        	{this.props.form.getFieldDecorator('原规划地方投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='已安排中央投资'>
						        	{this.props.form.getFieldDecorator('已安排中央投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						       <Col span={8}>
						        <FormItem {...formItemLayout} label='已安排地方投资'>
						        	{this.props.form.getFieldDecorator('已安排地方投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='剩余中央投资'>
						        	{this.props.form.getFieldDecorator('剩余中央投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						       <Col span={8}>
						        <FormItem {...formItemLayout} label='剩余地方投资'>
						        	{this.props.form.getFieldDecorator('剩余地方投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='拟调整纳入的规划阶段'>
						        	{this.props.form.getFieldDecorator('拟调整纳入的规划阶段', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='是否属于享受特殊政策地区'>
						        	{this.props.form.getFieldDecorator('是否属于享受特殊政策地区', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput}/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='初步设计是否已批复'>
						        	{this.props.form.getFieldDecorator('初步设计是否已批复', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='项目建设进展'>
						        	{this.props.form.getFieldDecorator('项目建设进展', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input/>
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
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input />
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='项目区个数'>
						        	{this.props.form.getFieldDecorator('项目区个数', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput}  addonAfter="个"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='批复或规划综合治理河长'>
						        	{this.props.form.getFieldDecorator('批复或规划综合治理河长', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput}  addonAfter="Km"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='批复或估算总投资'>
						        	{this.props.form.getFieldDecorator('批复或估算总投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input {...numberInput}  addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='其中中央投资'>
						        	{this.props.form.getFieldDecorator('其中中央投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='目前进度'>
						        	{this.props.form.getFieldDecorator('目前进度', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input/>
						          	)}
						        </FormItem>
						      </Col>
						       <Col span={8}>
						        <FormItem {...formItemLayout} label='批复文号'>
						        	{this.props.form.getFieldDecorator('批复文号', {
							            rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='2017资金落实合计'>
						        	{this.props.form.getFieldDecorator('2017资金落实合计', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input   {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						       <Col span={8}>
						        <FormItem {...formItemLayout} label='2017资金落实中央投资'>
						        	{this.props.form.getFieldDecorator('2017资金落实中央投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						      <Col span={8}>
						        <FormItem {...formItemLayout} label='2017资金落实省级投资'>
						        	{this.props.form.getFieldDecorator('2017资金落实省级投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
						       <Col span={8}>
						        <FormItem {...formItemLayout} label='2017资金落实市县投资'>
						        	{this.props.form.getFieldDecorator('2017资金落实市县投资', {
							            //rules: [{ required: true, message: '不能为空！' }],
							          	})(
						            	<Input  {...numberInput} addonAfter="万元"/>
						          	)}
						        </FormItem>
						      </Col>
				      		</Row>
				      	</fieldset>
				      	<fieldset>
				      		<legend>其他</legend>
				      		<Row>
				      			<Col span={12}>
						        <FormItem labelCol={{span:6}} wrapperCol={{span:18}} label='工程照片'>
				            		<Button onClick={
				            			(e)=>{
				            				console.log(this)
				            				this.setState({
				            					...this.state,
				            					imageModal:{visible:true,}
				            				})
				            			}}>
				            			<Icon type='upload' />点击查看图片
				            		</Button>
						        </FormItem>
						      </Col>
						      <Col span={12}>
						        <FormItem labelCol={{span:6}} wrapperCol={{span:18}} label='工程照片'>
				            		<Button>
				            			<Icon type='upload' /><a target='_blank' href="http://172.36.16.2:6500/File/%E8%B1%AB%E5%8F%91%E6%94%B9%E6%8A%95%E8%B5%84[2017]626%E5%8F%B7.pdf">查看批复文件</a>
				            		</Button>
						        </FormItem>
						      </Col>
						      <Col span={12}>
						        <FormItem labelCol={{span:6}} wrapperCol={{span:18}} label='工程视频'>
						        	<Button onClick={
				            			(e)=>{
				            				console.log(this)
				            				this.setState({
				            					...this.state,
				            					videoModal:{visible:true,}
				            				})
				            			}}>
				            			<Icon type='upload' />点击查看视频
				            		</Button>
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
		</Modal>)
	}

	componentDidMount () {
		/*console.log('loading modules')
		console.time('modules loaded')*/
		const item = this.props.item;
		
		
		//表示没有项目位置，需要新建个项目位置
		console.log(item)
		
		this.initMap(item.id);

		this.props.form.setFieldsInitialValue(item)
	}
	componentWillUnmount(){
		//console.log(this)
		if(this.state.mapProp.templatePicker){
			//this.state.mapProp.templatePicker.destroy();
		}
		//console.log(this)
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
	initMap(projectId){
		console.log('new')
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

		        "dojo/_base/array","dojo/_base/event","dojo/_base/lang","dojo/parser","dijit/registry",
		        
		        "dojo/domReady!"
	      	], 
			(
				Map,Edit,Draw,Graphic,SpatialReference,Point,Add,
				ArcGISDynamicMapServiceLayer, FeatureLayer,TemplatePicker,
				SimpleFillSymbol,SimpleLineSymbol,SimpleMarkerSymbol, Color, SimpleRenderer,
				WebTiledLayer,TileInfo,
				esriConfig, jsapiBundle,
				arrayUtils, event, lang, parser, registry
			)=>{
	      		this.showSpin();
	      		let reactDom = this;

		        map = new Map(domId, {
		        	//basemap:'satellite',
		          	/*center: [
						113.52,
						34.58
					],*/
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
		          definitionExpression: `id=${projectId}`,
		          outFields:['*']
		        });

		  		//let symbol = new SimpleFillSymbol("solid", null, new Color([255, 0, 255, 0.75]));
				let symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 30,
				    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				    new Color([255,0,0]), 3),
				    new Color([0,255,0,0.5]))
				let symbol2 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
				    new Color([255,0,0]), 5)
				let renderer = new SimpleRenderer(symbol2);
				featureLayer1.setRenderer(renderer);
				console.log(featureLayer1)
				
		        //map.addLayers([imgMap,imgMapMarker,featureLayer1]);
		        map.addLayers([imgMap,imgMapMarker,featureLayer1]);
		        //map.panUp();
		        
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
		                	//console.log(evt)
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
		              	//console.log(evt)
		              	if (evt.ctrlKey === true || evt.metaKey === true) {  //delete feature if ctrl key is depressed
		                	featureLayer1.applyEdits(null,null,[evt.graphic]);
		                	featureLayer1 = this;
		                	editToolbar.deactivate();
		                	editingEnabled=false;
		                	reactDom.setCorridate(0,0,0,0)
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
		            
		            if(templatePicker==undefined){
		        		templatePicker = new TemplatePicker(
		        			{
					            featureLayers: [featureLayer1],
					            rows: "auto",
					            columns:1,
					            style: "height: auto; overflow: auto;position:absolute;z-index:1;bakcground:transparent;",
					            items:[{label:'点击添加项目',symbol:symbol,description:''}],
					            useLegend:false,
				        	}, 
				        	`${reactDom.state.templatePickerDivId}`
				        );
			        }
		            templatePicker.startup();
		            drawToolbar = new Draw(map);

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
			            		...reactDom.state.mapProp,
			            		add,selectedTemplate,map,editToolbar,editingEnabled,featureLayer1,drawToolbar
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
			       	
			        //drawToolbar.activate(Draw.POINT);
			        drawToolbar.on("draw-end", function(evt) {
			        	//console.log(evt)
			            drawToolbar.deactivate();
			            editToolbar.deactivate();
			            let newAttributes = selectedTemplate.template.prototype.attributes;
			            //console.log(newAttributes.OBJECTID_1)
			            newAttributes.id=projectId;
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
			            reactDom.toApplyEdits([newGraphic], null, null,(succ)=>{
			            	console.log('编辑成功')
			            },(err)=>{
			            	console.log('编辑失败 :')
			            	console.log(err)
			            })
			        });

					reactDom.setState({
		            	...reactDom.state,
		            	mapProp:{
		            		...reactDom.state.mapProp,templatePicker,add,selectedTemplate,
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

export default Form.create()(UpdateZaiHou)