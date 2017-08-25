// modules/Map.js
import React from 'react'
import { Spin ,Button,Icon} from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import EsriLoader from 'esri-loader-react'
//import tileInfoObj from './WebTile.js'
import styles from './index.less'

const ButtonGroup = Button.Group;
const esriOptions = {
  url:'http://jcxx.hnslkc.com/arcgis_js_api/library/3.18/3.18/init.js'
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
export default class  extends React.Component{
	constructor (props) {
		//console.log(props)
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:"http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer",
			loading:false,
		}
		//console.log(this.state)
	}

	render () {
		// show any map errors
		const error = this.state.error;
		
		return <div className={styles.map}>
			<EsriLoader options={esriOptions}/>
		  <div id='map' style={{width:'calc(100vw)',height:'calc(100vh - 85px)',position:'relative'}}>
		  	<div id="toolbar" style={{position:'absolute',zIndex:1,right:'10px',top:'10px'}} >
		  		
		  	</div>
		  </div>
		  <Spin size='large' style={
		  	this.state.loading?{position:'absolute',top:'50%',left:'50%',display:'block'}
		  	:{position:'absolute',top:'50%',left:'50%',display:'none'}
		  }/>
		</div>
	}

	componentDidMount () {
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
		const ReactDom = this;
		var map, imgMap,imgMapMarker,featureLayer1;
    this.showSpin();
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
            map = new Map('map', {
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
              //definitionExpression: 'id=-1',
              outFields:['*']
            });
          
            let symbol2 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 5)
            let renderer = new SimpleRenderer(symbol2);
            

            map.on("layers-add-result", initEditing);
            map.addLayers([imgMap,imgMapMarker,featureLayer1]);
              
            function initEditing(e){
              console.log(e)
              //双击编辑
              map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
              featureLayer1.setRenderer(renderer);
              ReactDom.hideSpin()
            }
	  })
  }

}