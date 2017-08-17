
// modules/Map.js
import React from 'react'
import { Spin ,Button,} from 'antd';
import { dojoRequire } from 'esri-loader'
import EsriLoader from 'esri-loader-react'

const esriOptions = {
    url:'https://js.arcgis.com/3.21/'
}
class DeleteProject extends React.Component {
	constructor (props) {
		console.log(props)
		//const {getFieldDecorator,setFieldsValue} = props.form
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:"http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer",
			loading:false,
			deleteId:3,
			domId:`${props.type}deleteMap`
		}
		//console.log(this.state)
	}
	render () {
		// show any map errors
		
		return (
		<div style={{overflow:'hidden'}}>
		  <EsriLoader options={esriOptions}/>
		  <Spin size='large' style={
		  	this.state.loading?{position:'absolute',top:'50%',left:'50%',display:'block'}
		  	:{position:'absolute',top:'50%',left:'50%',display:'none'}
		  }/>
		</div>)
	}

	componentDidMount () {
		if(this.props.deleteItem !==null){
			this.deleteProject();
		}else{
			console.log('abc')
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
	deleteProject(){
		const mapUrl = this.state.mapUrl;
		const domId = this.state.domId;
		let map,editToolbar,currentLayer,editingEnabled=false,featureLayer1;
		  	dojoRequire(
		      	[
			        "esri/map",
			        "esri/toolbars/edit",

			        "esri/layers/ArcGISDynamicMapServiceLayer",
			        "esri/layers/FeatureLayer",
			        "esri/tasks/query",
			        "esri/config",
			        "dojo/i18n!esri/nls/jsapi",

			        "dojo/_base/array", "dojo/parser", "dojo/keys","dojo/_base/event",
			        
			        "dojo/domReady!"
		      	], 
				(
					Map,Edit,
					ArcGISDynamicMapServiceLayer, FeatureLayer,
					Query,
					esriConfig, jsapiBundle,
					arrayUtils, parser, keys,event
				)=>{
		      		this.showSpin();
		      		let reactDom = this;
			        // editToolbar.on("deactivate", function(evt) {
			        // 		console.log(evt)
			        //     	currentLayer.applyEdits(null, [evt.graphic], null,(suc)=>{
			        //     		console.log('suc')
			        //     	},(err)=>{
			        //     		console.log('err')
			        //     	});
			        // });
			   
			        featureLayer1 = new FeatureLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/FeatureServer/30", {
			          	mode: FeatureLayer.MODE_SNAPSHOT,
			          	//definitionExpression:`id=${this.state.deleteId}`
			        });
			        var query = new Query();
				  	query.outFields = [ "*" ];
				  	query.where = `id=${this.state.deleteId}`;
				  	//Query for the features with the given object ID
				  	featureLayer1.queryFeatures(query, function(featureSet) {
				  		console.log(featureSet)
			  		    featureLayer1.applyEdits(null, null, featureSet.features,(suc)=>{
		            		console.log('要素删除成功！')
		            		reactDom.props.deleteSuccess();
		            	},(err)=>{
		            		console.log('要素删除失败')
		            	});
					});
			        featureLayer1.on('load',(e)=>{
			        	console.log('e')
			        	console.log(e)
			        })
		      		this.hideSpin()
		      	}
			)
	}
}

export default DeleteProject