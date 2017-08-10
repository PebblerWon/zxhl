// modules/Map.js
import React from 'react'
import { Spin } from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'

export default class  extends React.Component {
	constructor (props) {
		//console.log(props)
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:"http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer",
			loading:true,
		}
		//console.log(this.state)
	}

	render () {
		// show any map errors
		const error = this.state.error
		if (error) {
		  return <div className='container'>
		    <div className='alert alert-danger alert-map'>{error}</div>
		    <button className='btn btn-default' onClick={hashHistory.goBack}>Go back</button>
		  </div>
		}
		return <div>
		  <div id='map' style={{width:'calc(100vw)',height:'calc(100vh - 85px)'}}></div>
		  <Spin size='large' style={
		  	this.state.loading?{position:'absolute',top:'50%',left:'50%',display:'block'}
		  	:{position:'absolute',top:'50%',left:'50%',display:'none'}
		  }/>
		</div>
	}

	componentDidMount () {
		/*console.log('loading modules')
		console.time('modules loaded')*/
		this.mapInit();
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
	mapInit(){
		const mapUrl = this.state.mapUrl;
		dojoRequire(['esri/arcgis/utils'], (arcgisUtils) => {
			this.showSpin();
		  	/*console.timeEnd('modules loaded')
		  	console.log('loading map')
		  	console.time('map loaded')*/
		  	//create a map at a DOM node in this component
		  	let map = new esri.Map("map");
		  	let layer = new esri.layers.ArcGISDynamicMapServiceLayer(mapUrl);
		  	map.addLayer(layer);
		  	this.hideSpin()
		})
	}
}
