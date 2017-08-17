
// modules/Map.js
import React from 'react'
import { Spin ,Form,Button,Input,Row,Col,Upload, message, Icon,InputNumber,Cascader  } from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import {DICT_FIXED_BY_PROVINCE} from '../../utils/city'
import EsriLoader from 'esri-loader-react'
import styles from './index.less'

const city = DICT_FIXED_BY_PROVINCE('河南省')
const esriOptions = {
    url:'https://js.arcgis.com/3.21/'
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
	min:"0"
}
class UpdateProject extends React.Component {
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
			domId:`${props.type}updateMap`
		}
		//console.log(this.state)
	}
	handleReset=(e)=>{
		console.log(this)
    	this.props.form.resetFields();
  	}
  	handleSubmit = (e)=>{
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {

	      	console.log('Received values of form: ', values);
	      	this.props.onSubmit(values)
	    });
  	}
	render () {
		// show any map errors
		const error = this.state.error
		let input1,input2;
		const uploadProps={
			name: 'file',
		  	action: '//jsonplaceholder.typicode.com/posts/',
		  	headers: {
		    	authorization: 'authorization-text',
		  	},
		  	onChange(info) {
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
				        <FormItem {...formItemLayout} label='项目编号'>
				        	{this.props.form.getFieldDecorator('项目编号', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
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
				        <FormItem {...formItemLayout} label='所在河流'>
				        	{this.props.form.getFieldDecorator('所在河流', {
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
					          	})(
				            	<Cascader options={city} placeholder=""/>
				          	)}
				        </FormItem>
				      </Col>
				      {/*<Col span={8}>
				        <FormItem {...formItemLayout} label='县行政区'>
				        	{this.props.form.getFieldDecorator('县行政区', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>*/}
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='前期工作'>
				        	{this.props.form.getFieldDecorator('前期工作', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='规划投资'>
				        	{this.props.form.getFieldDecorator('规划投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='初设单位'>
				        	{this.props.form.getFieldDecorator('初设单位', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='初设进展'>
				        	{this.props.form.getFieldDecorator('初设进展', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='批复情况'>
				        	{this.props.form.getFieldDecorator('批复情况', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='起点坐标'>
				        	{this.props.form.getFieldDecorator('起点坐标', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input disabled={true}/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='终点坐标'>
				        	{this.props.form.getFieldDecorator('终点坐标', {
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
				        <FormItem {...formItemLayout} label='治理长度'>
				        	{this.props.form.getFieldDecorator('治理长度', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput}  addonAfter="Km"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='新建堤防'>
				        	{this.props.form.getFieldDecorator('新建堤防', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='加固堤防'>
				        	{this.props.form.getFieldDecorator('加固堤防', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='清淤'>
				        	{this.props.form.getFieldDecorator('清淤', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='护坡护岸'>
				        	{this.props.form.getFieldDecorator('护坡护岸', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='其他'>
				        	{this.props.form.getFieldDecorator('其他', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='防洪标准'>
				        	{this.props.form.getFieldDecorator('防洪标准', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='除涝标准'>
				        	{this.props.form.getFieldDecorator('除涝标准', {
					            rules: [{ required: true, message: '不能为空！' }],
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
				            	<Input {...numberInput}  addonAfter="万人"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='保护耕地'>
				        	{this.props.form.getFieldDecorator('保护耕地', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput}  addonAfter="万亩"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='排涝收益'>
				        	{this.props.form.getFieldDecorator('排涝收益', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput}   addonAfter="万亩"/>
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
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput}  addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='总投资'>
				        	{this.props.form.getFieldDecorator('总投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='移民征地'>
				        	{this.props.form.getFieldDecorator('移民征地', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='拆迁补偿'>
				        	{this.props.form.getFieldDecorator('拆迁补偿', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='省级投资'>
				        	{this.props.form.getFieldDecorator('省级投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='市县投资'>
				        	{this.props.form.getFieldDecorator('市县投资', {
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
		      		<legend>工程验收</legend>
		      		<Row>
		      			<Col span={8}>
				        <FormItem {...formItemLayout} label='绩效评分'>
				        	{this.props.form.getFieldDecorator('绩效评分', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='竣工审计'>
				        	{this.props.form.getFieldDecorator('竣工审计', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='竣工时间'>
				        	{this.props.form.getFieldDecorator('竣工时间', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='验收单位'>
				        	{this.props.form.getFieldDecorator('验收单位', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='验收文号'>
				        	{this.props.form.getFieldDecorator('中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
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
				        <FormItem labelCol={{span:6}} wrapperCol={{span:18}} label='工程视频'>
				        	{this.props.form.getFieldDecorator('工程视频')(
				            	<Upload {...uploadProps}>
				            		<Button>
				            			<Icon type='upload' />点击上传
				            		</Button>
				            	</Upload>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='批复文号'>
				        	{this.props.form.getFieldDecorator('中央投资',{
				            	 rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='上报人'>
				        	{this.props.form.getFieldDecorator('中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='审核人'>
				        	{this.props.form.getFieldDecorator('中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
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
		  <div id={this.state.domId} style={{width:'calc(50vw - 30px)',height:'calc(100vh - 90px)',float:'left'}}></div>
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
		
		if(item == null){
			this.newProject();
		}else{
			this.updateProject();
		}
		this.props.form.setFieldsInitialValue(item)
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
	updateProject(){
		const mapUrl = this.state.mapUrl;
		const domId = this.state.domId;
		let map,editToolbar,currentLayer,editingEnabled=false,featureLayer1;
		  	dojoRequire(
		      	[
			        "esri/map",
			        "esri/toolbars/edit",
			        

			        "esri/layers/ArcGISDynamicMapServiceLayer",
			        "esri/layers/FeatureLayer",

			        "esri/symbols/SimpleFillSymbol",
			        "esri/symbols/SimpleLineSymbol",
			        "esri/symbols/SimpleMarkerSymbol",
			        "esri/Color", 
			        "esri/renderers/SimpleRenderer",
			        

			        "esri/config",
			        "dojo/i18n!esri/nls/jsapi",

			        "dojo/_base/array", "dojo/parser", "dojo/keys","dojo/_base/event",
			        
			        "dojo/domReady!"
		      	], 
				(
					Map,Edit,
					ArcGISDynamicMapServiceLayer, FeatureLayer,
					SimpleFillSymbol,SimpleLineSymbol,SimpleMarkerSymbol, Color, SimpleRenderer,
					esriConfig, jsapiBundle,
					arrayUtils, parser, keys,event
				)=>{
		      		this.showSpin();
		      		let reactDom = this;
		      		console.log(this)
			        
			        map = new Map(domId, {
			        	basemap:'satellite',
			          	center: [
							113.52642355128177,
							34.587323492085886
						],
						zoom:15,
			          	slider: false
			        });

			        //map.on("layers-add-result", initEditing);
			        editToolbar = new Edit(map)
			        editToolbar.on("deactivate", function(evt) {
			        		console.log(evt)
			            	currentLayer.applyEdits(null, [evt.graphic], null,(suc)=>{
			            		console.log('suc')
			            	},(err)=>{
			            		console.log('err')
			            	});
			        });
			        editToolbar.on("graphic-move-stop",function(evt){
			        	console.log(reactDom)
			        	console.log(evt)
			        	reactDom.setState({
			        		...reactDom.state,
			        		qidian:evt.graphic.geometry.x,
			        		zhongdian:evt.graphic.geometry.y
			        	})
			        	reactDom.props.form.setFieldsValue({"起点坐标":reactDom.state.qidian})
			        	reactDom.props.form.setFieldsValue({"终点坐标":reactDom.state.zhongdian})
			        })
			        //add boundaries and place names
			        // let labels = new ArcGISDynamicMapServiceLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer");
			        // console.log(labels)
			        // //labels.setVisibleLayers([-1]);
			        //map.addLayer(labels);
			        featureLayer1 = new FeatureLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/FeatureServer/30", {
			          mode: FeatureLayer.MODE_SNAPSHOT,
			          definitionExpression:`id=${this.state.id}`
			        });

			  		//let symbol = new SimpleFillSymbol("solid", null, new Color([255, 0, 255, 0.75]));
					let symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 30,
					    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
					    new Color([255,0,0]), 3),
					    new Color([0,255,0,0.5]))
					let renderer = new SimpleRenderer(symbol);
					featureLayer1.setRenderer(renderer);
					//console.log(featureLayer1)
			        map.addLayer(featureLayer1);
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
			        	reactDom.props.form.setFieldsValue({"起点坐标":reactDom.state.qidian})
			        	reactDom.props.form.setFieldsValue({"终点坐标":reactDom.state.zhongdian})
		                editToolbar.activate(Edit.MOVE , evt.graphic);
		              } else {
		                currentLayer = this;
		                editToolbar.deactivate();
		                editingEnabled = false;
		              }
		            });

			        function initEditing(e){
						//console.log(featureLayer1)
			        	//console.log(e.layers[0].layer.graphics.length)
			        	
			        }
		      		this.hideSpin()
		      	}
			)
	}
}

export default Form.create()(UpdateProject)