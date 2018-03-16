// modules/Map.js
import React from 'react'
import { Spin ,Button,Icon,Modal,Collapse,Row,Col,Carousel,Form} from 'antd';
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import EsriLoader from 'esri-loader-react'

import request2 from '../../utils/request2'
import request from '../../utils/request'
import fakeRequest from '../../utils/fakeRequest'
import {api} from '../../utils/config'
import {TileInfoObj,TDTUrl,FeatureLayerUrl,GiSApiUrl,MapUrl} from '../../routes/MapC/mapConfig'
import styles from './MyMap.less'


const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Panel = Collapse.Panel
const formItemLayout={
    labelCol:{span:8},
    wrapperCol:{span:16},
    style:{
      "fontSize":"16px",
      "marginBottom":"5px"
    },
  }
  const esriOptions = {
    //url:'https://js.arcgis.com/3.21/'
    url:GiSApiUrl
  }
export default class  extends React.Component {
	constructor (props) {
		//console.log(props)
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:MapUrl,
			loading:true,
			infoModal:{
				item:null,
				visible:false,
			},mapProp:{
				map:undefined,layer:undefined,featureLayer:undefined,
				imgMap:undefined,imgMapMarker:undefined
			},
			currentLayer:'mapServerLayer'
		}
		//console.log(this.state)
		this.showSpin = this.showSpin.bind(this)
		this.hideSpin = this.hideSpin.bind(this)
		this.mapInit = this.mapInit.bind(this)
		this.getDataById = this.getDataById.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
	}
	handleToggle(){
		if(this.state.mapProp.imgMap.visible&&this.state.mapProp.imgMapMarker.visible){
			this.state.mapProp.imgMap.hide()
			this.state.mapProp.imgMapMarker.hide()
			this.state.mapProp.layer.show()
			this.setState({
				...this.state,
				currentLayer:'mapServerLayer'
			})
		}else{
			this.state.mapProp.imgMap.show()
			this.state.mapProp.imgMapMarker.show()
			this.state.mapProp.layer.hide()
			this.setState({
				...this.state,
				currentLayer:'tdtLayer'
			})
		}
	}
	render () {
		// show any map errors
		const error = this.state.error
		const ReactDom = this;
		const infoModalCancel = (e)=>{
			let myVideo = document.getElementsByTagName("video");
			console.log(myVideo)
			for(let i = 0;i<myVideo.length;i++){
				let item = myVideo[i]
				if(item.className=="video"){
					if(item&&item.played)
						item.pause()
				}
			}
			ReactDom.setState({
				...ReactDom.state,
				infoModal:{
					...ReactDom.state.infoModal,
					visible:false,
				}
			})
		}
		const columns=['项目名称','所在河流','所属流域','所在市','所在县','项目类型','所在河流名称','地级行政区','县级行政区','批复文号']
		const textInfo = [];
		const picInfo = [];
		const vioInfo = [];
		let item = ReactDom.state.infoModal.item;
		console.log(ReactDom)
		console.log(item)
		if(item&&item.model){
			for(let i = 0;i<columns.length;i++){
			    let title = columns[i]
			    let dataIndex = columns[i]
			    if(item['model'][dataIndex]){
			      textInfo.push(
			          <Col span={12} key={Math.random(0,1)}>
			            <FormItem {...formItemLayout} label={`${title}:`}>{item['model'][dataIndex]}</FormItem>
			          </Col>
			        )
			    }
			}
			if(item.picUrl.length>0){
				for(let i = 0;i<item.picUrl.length;i++){
				    picInfo.push(
				        <div  key={item.picUrl[i]}>
				          <img src={`${api.map.projectSource}${item.picUrl[i]}`} alt="" style={{margin:"0 auto"}} width='500px' height='450px'/>
				        </div>
				      )
				}	
			}else{
				picInfo.push(
				        <div  key='noPic'>
				          暂无照片
				        </div>
				      )
			}
			
			if(item.vioUrl.length>0){
				for(let i = 0;i<item.vioUrl.length;i++){
				    vioInfo.push(
				        <div  key={item.vioUrl[i]}>
				          <video width='470px' controls="controls" id="video">
				          	<source src={`${api.map.projectSource}${item.vioUrl[i]}`} />
				          </video>
				        </div>
				      )
				}
			}else{
				vioInfo.push(
				        <div  key='novideo'>
				          暂无视频
				        </div>
				      )
			}
			
		}else{
			textInfo.push(<p key='1'>暂无信息</p>)
			picInfo.push(<p key='2'>暂无照片</p>)
			vioInfo.push(<p key='3'>暂无视频</p>)
		}
		
		if (error) {
		  return <div className='container'>
		    <div className='alert alert-danger alert-map'>{error}</div>
		    <button className='btn btn-default' onClick={hashHistory.goBack}>Go back</button>
		  </div>
		}
		return(
			<Spin size='large' spinning={this.state.loading}>
			 	<div>
					<EsriLoader options={esriOptions}/>
				  	<div id='map' style={{width:'calc(100vw)',height:'calc(100vh - 75px)',position:'relative'}}>
					  	<div id="mapType-wrapper" style={{position:'absolute',bottom: 0,right: 0}}>
					  		<div id="mapType" className={styles.mapType} onClick={this.handleToggle}>
					  			<div className={
					  					ReactDom.state.currentLayer=='mapServerLayer'?
					  					styles.tdtLayer:styles.mapServerLayer
					  				} style={{
					  				backgroundImage: "url('resource/maptype_bg.png')"
					  			}}></div>
					  		</div>
					  	</div>
				  	</div>
				  	<div>
				        <Modal
				        	visible={ReactDom.state.infoModal.visible}
				          	footer={null}
				          	width={'700px'}
				          	style={{width:'700px'}}
				          	onCancel={infoModalCancel}
				          	maskClosable={false}
				        >
				          
				          <Collapse defaultActiveKey={['textInfo']} accordion>
				            <Panel header="属性信息" key="textInfo">
				              <Row>
				                {textInfo}
				              </Row>
				            </Panel>
				            <Panel header="照片" key="picInfo">
				              <Carousel autoplay arrows={true}>
				                {picInfo}
				              </Carousel>
				            </Panel>
				            <Panel header="视频" key="vioInfo">
				              <Carousel arrows={true}>
				                {vioInfo}
				              </Carousel>
				            </Panel>
				          </Collapse>
				        </Modal>
		      		</div>
				</div>
			</Spin>
		)
	}

	componentDidMount () {
		/*console.log('loading modules')
		console.time('modules loaded')*/
		this.showSpin();
		this.mapInit();
	}
	showSpin(){
		this.setState({
			loading:true
		})
	}
	hideSpin(){
		this.setState({
			loading:false
		})
	}
	async mapInit(){
		var {map,layer,featureLayer,imgMap,imgMapMarker} = {...this.state.mapProp}
		const mapUrl = this.state.mapUrl;
		const ReactDom = this;
		dojoRequire([
			"esri/map",
			"esri/layers/ArcGISDynamicMapServiceLayer",
			'esri/geometry/Point','esri/graphic',
			'esri/SpatialReference',
			"esri/layers/FeatureLayer","esri/symbols/SimpleLineSymbol",
			"esri/renderers/SimpleRenderer","esri/Color",
			"esri/layers/WebTiledLayer",
		    "esri/layers/TileInfo",],
			(
				Map,
				ArcGISDynamicMapServiceLayer,
				Point,Graphic,
				SpatialReference,
				FeatureLayer,SimpleLineSymbol,
				SimpleRenderer, Color,
				WebTiledLayer,TileInfo,
				domClass, domConstruct, on,
			) => {
			  	map = new Map("map", {
					zoom:8,
		          	slider: false,
		          	logo:false
		        });
			  	map.on("layers-add-result", init);

			  	var tileInfo = new TileInfo(TileInfoObj)
		       	imgMap = new WebTiledLayer(TDTUrl.ImgUrl, {
		            "id": "TiandituImg",
		            "subDomains": ["t0", "t1", "t2"],
		            "tileInfo": tileInfo,
		            visible:false,
		        });

		        //底图标注
		        imgMapMarker = new WebTiledLayer(
		        	TDTUrl.MarkerUrl, {
		            "id": "TiandituImgMarker",
		            "subDomains": ["t0", "t1", "t2"],
		            "tileInfo": tileInfo,
		            visible:false,
		        });

			  	layer = new ArcGISDynamicMapServiceLayer(mapUrl);
		        featureLayer = new FeatureLayer(FeatureLayerUrl,{
		            mode: FeatureLayer.MODE_ONDEMAND,
		            outFields: ["*"],
		            definitionExpression:`id!=0`
		            //infoTemplate: template
		        });

		        let symbol2 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),2.5)
				let renderer = new SimpleRenderer(symbol2);
				featureLayer.setRenderer(renderer);
				
		        map.addLayers([imgMap,imgMapMarker,layer,featureLayer])
		        
			  	function init(e){
			  		console.log(e)
			  		map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
			  		featureLayer.on('mouse-up',async function(e){
						console.log(e)
						ReactDom.setState({
							...ReactDom.state,
							loading:true,
						})
						let id = e.graphic.attributes.id;
						const data =await ReactDom.getDataById(id);
						ReactDom.setState({
							...ReactDom.state,
							loading:false,
						})
						/*var highlightGraphic = new Graphic(
							e.graphic.geometry,
							symbol3,
							e.graphic.attributes,
							template
						);*/
						ReactDom.setState({
							...ReactDom.state,
							infoModal:{
								...ReactDom.infoModal,
								visible:true,
								item:data
							}
						})
					})
			  		ReactDom.hideSpin()
			  	}

			  	ReactDom.setState({
			  		...ReactDom.state,
			  		mapProp:{
			  			...ReactDom.mapProp,
			  			map:map,layer:layer,featureLayer:featureLayer,
						imgMap:imgMap,imgMapMarker:imgMapMarker
			  		}
			  	})
		})
	}
	async getDataById(projectid){
		const data = await request(`${api['map']['getInfoById']}?id=${projectid}`)
		//const data = await fakeRequest({},fakeData);
		console.log(data)
		return data;
	}


}
