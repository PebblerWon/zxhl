// modules/Map.js
import React from 'react'
import { Spin ,Button,Icon,Modal,Collapse,Row,Col,Carousel,Form} from 'antd';
import EsriLoader from 'esri-loader-react'
import request2 from '../../utils/request2'
import request from '../../utils/request'
import fakeRequest from '../../utils/fakeRequest'
import {api} from '../../utils/config'
import { hashHistory } from 'react-router'
import { dojoRequire } from 'esri-loader'
import styles from './index.less'


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
    url:'http://jcxx.hnslkc.com/arcgis_js_api/library/3.18/3.18/init.js'
  }
export default class  extends React.Component {
	constructor (props) {
		//console.log(props)
		super(props)
		this.state = { 
			mapLoaded: false ,
			mapUrl:"http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer",
			loading:true,
			infoModal:{
				item:null,
				visible:false,
			},mapProp:{
				map:undefined,featureLayer:undefined,fenSeLayer:undefined
			},button1:{type:""},button2:{type:""},button3:{type:""},button4:{type:""},
			legend1:{visible:false},
			legend2:{visible:false},
			legend3:{visible:false},
			legend4:{visible:false},
			legend1DomId:`legend1_${Math.floor(Math.random()*1000)}`,
			legend2DomId:`legend2_${Math.floor(Math.random()*1000)}`,
			legend3DomId:`legend3_${Math.floor(Math.random()*1000)}`,
			legend4DomId:`legend4_${Math.floor(Math.random()*1000)}`,
		}
		//console.log(this.state)
	}

	render () {
		// show any map errors
		const error = this.state.error
		const ReactDom = this;
		const infoModalCancel = (e)=>{
			let myVideo = document.getElementById("video");
			if (myVideo&&myVideo.played) 
	  			myVideo.pause()
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
				          <img src={`${api.map.projectSource}${Math.floor(item.model.id/100)}/${item.picUrl[i]}`} alt="" style={{margin:"0 auto"}} width='500px' height='450px'/>
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
				          	<source src={`${api.map.projectSource}${Math.floor(item.model.id/100)}/${item.vioUrl[i]}`} />
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
		return <div className={styles.map}>
			<EsriLoader options={esriOptions}/>
		  <div id='map' style={{width:'calc(100vw)',height:'calc(100vh - 85px)',position:'relative'}}>
		  	<div id="toolbar" style={{position:'absolute',zIndex:1,right:'10px',top:'10px'}} >
		  		<ButtonGroup>
		  			<Button type={ReactDom.state.button1.type} onClick={ReactDom.state.mapProp.render1}><Icon type='file'/>按流域</Button>
		  			{/*<Button type={ReactDom.state.button2.type} onClick={ReactDom.state.mapProp.render2}><Icon type='file'/>按政区</Button>*/}
		  			<Button type={ReactDom.state.button3.type} onClick={ReactDom.state.mapProp.render3}><Icon type='file'/>按年度</Button>
		  			<Button type={ReactDom.state.button4.type} onClick={ReactDom.state.mapProp.render4}><Icon type='file'/>按批次</Button>
		  		</ButtonGroup>
		  		
		  	</div>
		  	<div id="legendDiv" style={{position:'absolute',zIndex:1,left:'10px',bottom:'10px',backgroundColor:'#eee',width:'100px'}} >
		  		<div id={ReactDom.state.legend1DomId} style={{display:ReactDom.state.legend1.visible?'block':'none'}}></div>
		  		<div id={ReactDom.state.legend2DomId} style={{display:ReactDom.state.legend2.visible?'block':'none'}}></div>
		  		<div id={ReactDom.state.legend3DomId} style={{display:ReactDom.state.legend3.visible?'block':'none'}}></div>
		  		<div id={ReactDom.state.legend4DomId} style={{display:ReactDom.state.legend4.visible?'block':'none'}}></div>
		  	</div>
		  </div>
		  <Spin size='large' style={
		  	this.state.loading?{position:'absolute',top:'50%',left:'50%',display:'block'}
		  	:{position:'absolute',top:'50%',left:'50%',display:'none'}
		  }/>
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
		              <Carousel autoplay arrows={true} className={styles.carousel}>
		                {picInfo}
		              </Carousel>
		            </Panel>
		            <Panel header="视频" key="vioInfo">
		              <Carousel arrows={true} className={styles.carousel}>
		                {vioInfo}
		              </Carousel>
		            </Panel>
		          </Collapse>
		        </Modal>
      		</div>
		</div>
	}

	componentDidMount () {
		/*console.log('loading modules')
		console.time('modules loaded')*/
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
		const mapUrl = this.state.mapUrl;
		const ReactDom = this;
		dojoRequire([
			'esri/arcgis/utils',
			'esri/geometry/Point','esri/graphic',
			'esri/SpatialReference',
			"esri/dijit/Popup", "esri/dijit/PopupTemplate","esri/dijit/Legend",
			"esri/layers/FeatureLayer","esri/renderers/UniqueValueRenderer",
        	"esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol",
        	"esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer","esri/Color",],
			(
				arcgisUtils,
				Point,Graphic,
				SpatialReference,
				Popup, PopupTemplate,Legend,
				FeatureLayer,UniqueValueRenderer,
				SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,
				SimpleRenderer, Color,
				domClass, domConstruct, on,
			) => {
				ReactDom.showSpin();
			  	
			  	let map = new esri.Map("map");
			  	map.on("layers-add-result", init);
			  	let layer = new esri.layers.ArcGISDynamicMapServiceLayer(mapUrl);
			  	//map.addLayer(layer);
			  	//console.log(layer)
			  	var template = new PopupTemplate({
		            title: "{项目名称}",
		            mediaInfos:[
			            {
			                type:"image",
			                value:{
	  							"sourceURL":'http://tse2.mm.bing.net/th?id=OIP.fkXTL7VA58-qGHL9Y76ctAD5D6&pid=15.1',
	  							"linkURL":'#', 
	  						}
			            },
			            {
			                type:"image",
			                value:{
	  							"sourceURL":"http://tse3.mm.bing.net/th?id=OIP.I7rLEI8ZFdJMap0t0cOuBQEsEh&pid=15.1",
	  							"linkURL":'#', 
	  						}
			            }
		            ]
		        });
		        var featureLayer = new FeatureLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/FeatureServer/35",{
		            mode: FeatureLayer.MODE_ONDEMAND,
		            outFields: ["*"],
		            definitionExpression:`id!=0`
		            //infoTemplate: template
		        });
		        /*let symbol = new SimpleMarkerSymbol(
		        		SimpleMarkerSymbol.STYLE_CIRCLE,//style
		        		5,//size
					    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]), 0.1),//描边
					    new Color([0,255,0,0.5])//填充颜色
					)*/
		        let symbol2 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),2.5)
		        let symbol3 = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,255,255]),3)
				let renderer = new SimpleRenderer(symbol2);
				featureLayer.setRenderer(renderer);
				featureLayer.on('mouse-down',async function(e){
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
					var highlightGraphic = new Graphic(
						e.graphic.geometry,
						symbol3,
						e.graphic.attributes,
						template
					);
					ReactDom.setState({
						...ReactDom.state,
						infoModal:{
							visible:true,
							item:data
						}
					})
					//highlightGraphic.show();
         			//map.graphics.add(highlightGraphic);
					//console.log(map)
				})
				let fenSeLayer = new FeatureLayer("http://jcxx.hnslkc.com:6080/arcgis/rest/services/中小河流/MapServer/35", {
		            mode: FeatureLayer.MODE_ONDEMAND,
		            outFields: ["*"],
		            definitionExpression:`id!=0`
		          });
				fenSeLayer.on('mouse-down',async function(e){
					console.log(e)
					ReactDom.setState({
						...ReactDom.state,
						loading:true,
					})
					let id = e.graphic.attributes.id;
					const data =await ReactDom.getDataById(id);
					console.log(data)
					ReactDom.setState({
						...ReactDom.state,
						loading:false,
					})
					var highlightGraphic = new Graphic(
						e.graphic.geometry,
						symbol3,
						e.graphic.attributes,
						template
					);
					ReactDom.setState({
						...ReactDom.state,
						infoModal:{
							visible:true,
							item:data
						}
					})
					//highlightGraphic.show();
         			//map.graphics.add(highlightGraphic);
					//console.log(map)
				})
		        map.addLayers([layer,featureLayer])
		        let legend1 = new Legend({
		            map : map,
		            layerInfos : [ {
		              layer : fenSeLayer,
		              title : "所属流域"
		            } ]
		          }, document.getElementById(ReactDom.state.legend1DomId));
		         let legend2 = new Legend({
		            map : map,
		            layerInfos : [ {
		              layer : fenSeLayer,
		              title : "政区"
		            } ]
		          }, document.getElementById(ReactDom.state.legend2DomId));
		          let legend3 = new Legend({
		            map : map,
		            layerInfos : [ {
		              layer : fenSeLayer,
		              title : "治理年度"
		            } ]
		          }, document.getElementById(ReactDom.state.legend3DomId));
		           let legend4 = new Legend({
		            map : map,
		            layerInfos : [ {
		              layer : fenSeLayer,
		              title : "批次"
		            } ]
		          }, document.getElementById(ReactDom.state.legend4DomId));
		           legend1.startup();legend2.startup();
		           legend3.startup();legend4.startup();
			  	function init(e){
			  		console.log(e)
			  		map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
			  		ReactDom.hideSpin()
			  	}

			  	function render1(){
			  		if(ReactDom.state.button1.type=='primary'){
			  			//取消分色
			  			map.removeLayer(fenSeLayer);
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button1:{
			  					type:''
			  				},
			  				legend1:{
			  					visible:false
			  				}
			  			})
			  		}else{
			  			map.removeLayer(fenSeLayer);
			  			//进行分色
			  			var defaultSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),3)

				        //create renderer
				        var renderer = new UniqueValueRenderer(null, "所属流域");

				        //add symbol for each possible value
				        renderer.addValue("淮河流域", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0,255,200]),3));
				        renderer.addValue("黄河流域", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),3));
				        renderer.addValue("长江流域", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([50,170,0]),3));
				        renderer.addValue("海河流域", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([200,0,255]),3));
			  			fenSeLayer.setRenderer(renderer);
			  			showLegend('legend1')
			  			legend1.refresh();
			  			map.addLayer(fenSeLayer);
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button1:{type:'primary'},
			  				button2:{type:''},
			  				button3:{type:''},
			  				button4:{type:''},
			  				legend1:{visible:true},
			  				legend2:{visible:false},
			  				legend3:{visible:false},
			  				legend4:{visible:false},
			  			})
			  		}
			  		//console.log(map)
			  	}
			  	function render2(){
			  		if(ReactDom.state.button2.type=='primary'){
			  			//取消分色
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button2:{
			  					type:''
			  				},
			  				legend2:{
			  					visible:false
			  				}
			  			})
			  		}else{
			  			//进行分色
			  			showLegend('legend2')
			  			legend2.refresh();
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button1:{type:''},
			  				button2:{type:'primary'},
			  				button3:{type:''},
			  				button4:{type:''},
			  				legend1:{visible:false},
			  				legend2:{visible:true},
			  				legend3:{visible:false},
			  				legend4:{visible:false},
			  			})
			  		}
			  	}
			  	function render3(){
			  		if(ReactDom.state.button3.type=='primary'){
			  			//取消分色
			  			map.removeLayer(fenSeLayer);
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button3:{
			  					type:''
			  				},
			  				legend3:{
			  					visible:false
			  				}
			  			})
			  		}else{
			  			//进行分色
			  			map.removeLayer(fenSeLayer);
			  			var defaultSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),3)

				        //create renderer
				        var renderer = new UniqueValueRenderer(null, "治理年度");
				        console.log(fenSeLayer)
				        //add symbol for each possible value
				        renderer.addValue("2017-2018", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,255,0]),3));
				        renderer.addValue("2009-2016", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),3));
			  			fenSeLayer.setRenderer(renderer);
			  			map.addLayer(fenSeLayer);
			  			showLegend('legend3')
			  			legend3.refresh();
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button1:{type:''},
			  				button2:{type:''},
			  				button3:{type:'primary'},
			  				button4:{type:''},
			  				legend1:{visible:false},
			  				legend2:{visible:false},
			  				legend3:{visible:true},
			  				legend4:{visible:false},
			  			})
			  		}
			  	}
			  	function render4(){
			  		if(ReactDom.state.button4.type=='primary'){
			  			//取消分色
			  			map.removeLayer(fenSeLayer);
			  			
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button4:{
			  					type:''
			  				},
			  				legend4:{
			  					visible:false
			  				}
			  			})
			  		}else{
			  			//进行分色
			  			map.removeLayer(fenSeLayer);
			  			var defaultSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),3)

				        //create renderer
				        var renderer = new UniqueValueRenderer(null, "批次");

				        //add symbol for each possible value
				        renderer.addValue("十二五治理项目", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([50,170,0]),3));
				        renderer.addValue("灾后水利薄弱环节", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([200,0,255]),3));
			  			fenSeLayer.setRenderer(renderer);
			  			map.addLayer(fenSeLayer);
			  			showLegend('legend4')
			  			legend4.refresh();
			  			ReactDom.setState({
			  				...ReactDom.state,
			  				button1:{type:''},
			  				button2:{type:''},
			  				button3:{type:''},
			  				button4:{type:'primary'},
			  				legend1:{visible:false},
			  				legend2:{visible:false},
			  				legend3:{visible:false},
			  				legend4:{visible:true},
			  			})
			  		}
			  	}
		        function showLegend(legendName){
		        	let newState = ReactDom.state;
		        	newState[legendName].visible=true;
		        	ReactDom.setState(newState)
		        }
			  	ReactDom.setState({
			  		mapProp:{
			  			render1:render1,render2:render2,render3:render3,render4:render4,
			  			fenseLayer:fenSeLayer
			  		}
			  	})
		})
	}
	async getDataById(projectid){
		const fakeData = {
			'项目名称':'abc',
			'picUrl': [
			    "http://a4.att.hudong.com/16/26/19300131134329132102266261316_950.jpg",
			    "http://a4.att.hudong.com/16/26/19300131134329132102266261316_950.jpg",
			    "http://a4.att.hudong.com/16/26/19300131134329132102266261316_950.jpg"
			],
			'vioUrl':[
				'http://www.w3school.com.cn/i/movie.ogg'
			]
		}
		const data = await request(`${api['map']['getInfoById']}?id=${projectid}`)
		//const data = await fakeRequest({},fakeData);
		console.log(data)
		return data;
	}


}
