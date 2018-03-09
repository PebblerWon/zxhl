
// modules/Map.js
import React from 'react'
import { Spin ,Form,Button,Input,Row,Col,Upload, message, Icon,InputNumber,Cascader  } from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import {DICT_FIXED_BY_PROVINCE} from '../../utils/city'
import {api} from '../../utils/config'
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
	step:"0.01"
}
class NewProject extends React.Component {
	constructor (props) {
		console.log(props)
		const {getFieldDecorator,setFieldsValue} = props.form
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:MapUrl,
			loading:true,
			qidian:'',
			zhongdian:'',
			id:1,
			domId:`${props.type}newMap`,
			templatePickerDivId:`newProjecttemplate_${Math.floor(Math.random()*1000)}`,
			mapProp:{
				map:undefined,editToolbar:undefined,add:undefined,selectedTemplate:undefined,
				editingEnabled:undefined,featureLayer1:undefined,drawToolbar:undefined
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
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='终点坐标'>
				        	{this.props.form.getFieldDecorator('终点坐标', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
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
				            	<Input {...numberInput} addonAfter="Km"/>
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
				            	<Input {...numberInput} addonAfter="万人"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='保护耕地'>
				        	{this.props.form.getFieldDecorator('保护耕地', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万亩"/>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={8}>
				        <FormItem {...formItemLayout} label='排涝收益'>
				        	{this.props.form.getFieldDecorator('排涝收益', {
					            rules: [{ required: true, message: '不能为空！' }],
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
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input {...numberInput} addonAfter="万元"/>
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
				        <FormItem labelCol={{span:6}} wrapperCol={{span:15}} label='工程照片'>
				        	{this.props.form.getFieldDecorator('工程照片')(
				            	<Upload {...uploadProps}>
				            		<Button>
				            			<Icon type='upload' />点击上传
				            		</Button>
				            	</Upload>
				          	)}
				        </FormItem></Col>
				        <Col span={12}>
				        <FormItem labelCol={{span:6}} wrapperCol={{span:15}} label='批复文件'>
				        	{this.props.form.getFieldDecorator('批复文件')(
				            	<Upload {...uploadProps}>
				            		<Button>
				            			<Icon type='upload' />点击上传
				            		</Button>
				            	</Upload>
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={12}>
				        <FormItem labelCol={{span:6}} wrapperCol={{span:15}} label='工程视频'>
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
				      </Row>
				      <Row>
				      <Col span={12}>
				        <FormItem {...formItemLayout} label='上报人' labelCol={{span:6}} wrapperCol={{span:7}} >
				        	{this.props.form.getFieldDecorator('中央投资', {
					            rules: [{ required: true, message: '不能为空！' }],
					          	})(
				            	<Input />
				          	)}
				        </FormItem>
				      </Col>
				      <Col span={12}>
				        <FormItem {...formItemLayout} label='审核人' labelCol={{span:6}} wrapperCol={{span:7}} >
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
		this.showSpin()
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
	      		
	      		let reactDom = this;
	      		console.log(this)
		        
		        map = new Map(domId, {
		        	//basemap:'satellite',
					zoom:8,
		          	slider: false
		        });
		        
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
		          	definitionExpression: 'id=-1',
		          	outFields:['*']
		        });
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
		            	mapProp:{
		            		...reactDom.state.mapProp,add,selectedTemplate,
		            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
		            	}
		        	})
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

				var templatePicker = new TemplatePicker({
		            featureLayers: [featureLayer1],
		            rows: "auto",
		            columns:1,
		            style: "height: auto; overflow: auto;position:absolute;z-index:1;bakcground:transparent;",
		            items:[{label:'点击添加项目',symbol:symbol,description:''}],
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
		        	reactDom.setState({
		        		...reactDom.state,
		        		qidian:`${evt.graphic.geometry.paths[0][0][0]},${evt.graphic.geometry.paths[0][0][1]}`,
		        		zhongdian:`${evt.graphic.geometry.paths[0][a-1][0]},${evt.graphic.geometry.paths[0][a-1][1]}`,
		        	})
		        	reactDom.setState({
		            	...reactDom.state,
		            	mapProp:{
		            		...reactDom.state.mapProp,selectedTemplate,
		            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
		            	}
		            })
		            reactDom.props.form.setFieldsValue({"起点坐标":reactDom.state.qidian})
	        		reactDom.props.form.setFieldsValue({"终点坐标":reactDom.state.zhongdian})
		        })
		       	drawToolbar = new Draw(map);
		        //drawToolbar.activate(Draw.POINT);
		        drawToolbar.on("draw-end", function(evt) {
		        	//console.log(evt)
		            drawToolbar.deactivate();
		            editToolbar.deactivate();
		            let newAttributes = selectedTemplate.template.prototype.attributes;
		            newAttributes.id=-1
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
		            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
		            	}
		            })
		            reactDom.toApplyEdits([newGraphic], null, null)
		        });

				//console.log(featureLayer1)
				map.on("layers-add-result", initEditing);
				//map.addLayer(layer)
				//map.addLayer(imgMap)
		        map.addLayers([imgMap,imgMapMarker,featureLayer1]);
		        
		        function initEditing(e){
					//双击编辑
					reactDom.hideSpin()
					map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
					
					templatePicker.startup();

					reactDom.setState({
		            	...reactDom.state,
		            	mapProp:{
		            		...reactDom.state.mapProp,add,selectedTemplate,
		            		map,editToolbar,editingEnabled,featureLayer1,drawToolbar
		            	}
		        	})
		        }
	      		
	      	}
		)
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
	      console.log('Received values of form: ', values);
	    });
	    console.log(this.state.mapProp)
  	}	
}

export default Form.create()(NewProject)

//12637665.44279583,4108917.4768558647