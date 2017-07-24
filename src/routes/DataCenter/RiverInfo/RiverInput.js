import React from 'react';
import {
			Menu,Icon,Collapse,Button,Checkbox,QueueAnim,Tooltip,Badge,Tree,
			Form,Input,Row,Col,
			Steps,Cascader,Select
} from 'antd';
import {connect} from 'dva'
import city from '../../../utils/city'
import styles from './RiverInput.less'

//data用于储存用户填写的表单数据
var DATA =[];
const Step = Steps.Step;
const FormItem = Form.Item;

const areaData = city('河南省');

const ProjectInfoForm1 = ({form,submitClick})=>{
	console.log(form)
	var {getFieldDecorator,getFieldError,isFieldValidating} = form;
		var requiredRules={
			rules: [
     				{required: true, message: '不能为空' },
     			]
		};
	const handleReset=(e)=>{

	}
	const handleSubmit=(e)=>{

	}
	return(
		<Form layout="horizontal">
			<FormItem
			 label="河流名称"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('河流名称',requiredRules)(
			 			<Input
						id="河流名称"
						placeholder="请输入河流名称"></Input>
				 )}
				
			</FormItem>
			<FormItem
			 label="水利普查序号"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('水利普查序号',requiredRules)(
			 			<Input
						 id="水利普查序号"
						 placeholder="请输入水利普查序号" />
			 	)}
			</FormItem>
			<FormItem
			 label="所在水系"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('所在水系',requiredRules)(
			 			<Input
						 id="所在水系"
						 placeholder="请输入所在水系" />
			 	)}
			</FormItem>
			<FormItem
			 label="流经地"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('流经地',requiredRules)(
			 			<Cascader
						 options={areaData}
						 placeholder="请选择流经地" />
			 	)}
				
			</FormItem>
			<FormItem
			 label="河流长度"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('河流长度',requiredRules)(
			 			<Input
							 id="河流长度"
							 placeholder="河流长度" />
			 	)}
				
			</FormItem>
			<FormItem
			 label="流域面积"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('流域面积')(
			 			<Input
							 id="流域面积"
							 placeholder="流域面积"></Input>
			 	)}
				
			</FormItem>
			<FormItem
			 label="所属流域"
			 labelCol={{span:8}}
			 wrapperCol={{span:10}}>
			 	{
			 		getFieldDecorator('所属流域')(
			 			<Select placeholder="所在流域">
							<Option value="淮河流域">淮河流域</Option>
							<Option value="海河流域">海河流域</Option>
							<Option value="黄河流域">黄河流域</Option>
							<Option value="长江流域">长江流域</Option>
						</Select>
			 	)}
				
			</FormItem>
			
			<FormItem 
			 wrapperCol={{ span: 12, offset: 8 }}
			 style={{textAlign:'center'}}
			 >
					<Button type="default" style={{marginLeft:'-140px'}}onClick={handleReset}>重置</Button>
					<Button type="primary" style={{marginLeft:'20px'}}onClick={submitClick}>下一项</Button>
			</FormItem>
		</Form>
	)
}

const AddFeatureOnMap=()=>{
	return(
		<div>
			<iframe src="http://ditu.amap.com/" frameborder="0" style={{
				width:'100%',
				height:'500px'
			}}></iframe>
		</div>
	)
	
}

/*const RiverInput=()=>{
	const constructor()=> {
    	super();
    	this.state = {
					stepState:{
						current:0,
						items:[
							{
								description:"项目基本情况",
								title:"填写中"
							},
							{
								description:"主要工程措施",
								title:"未填写"
							},
							{
								description:"治理效果",
								title:"未填写"
							},
						],
					},
					currentForm:"ProjectInfoForm1"
				};
  	}	
	const handelSubmit=(e)=>{
	}
	const changeForm=(nextForm)=>{
		//currentForm表示当前表单已经被填写完毕 可以切换下一个表单
		if(nextForm == "ProjectInfoForm2"){
					this.setState({
						stepState:{
							current:1,
							items:[
							{
								description:"项目基本情况",
								title:"填写完成"
							},
							{
								description:"主要工程措施",
								title:"填写中"
							},
							{
								description:"治理效果",
								title:"未填写"
							},
							],
						},
						currentForm:"ProjectInfoForm2"
					})
			
		}else if(nextForm == "ProjectInfoForm3"){

					this.setState({
						stepState:{
							current:2,
							items:[
							{
								description:"项目基本情况",
								title:"填写完成"
							},
							{
								description:"主要工程措施",
								title:"填写完成"
							},
							{
								description:"治理效果",
								title:"填写中"
							},
							],
						},
						currentForm:"ProjectInfoForm3"
					})
		}
		//console.log("changeForm");
	}
	
	var _state = this.state;
	var changeForm = this.changeForm;
	var currentForm = _state.currentForm;
	var currentFormCom; 
	if(currentForm=="ProjectInfoForm1"){
		currentFormCom = <ProjectInfoForm1 submitClick={changeForm} nextForm="ProjectInfoForm2" key="ProjectInfoForm1"/>
	}else if(currentForm=="ProjectInfoForm2"){
		currentFormCom =  <ProjectInfoForm2  submitClick={changeForm}  nextForm="ProjectInfoForm3" key="ProjectInfoForm2"/>
	}else if(currentForm=="ProjectInfoForm3"){
		currentFormCom =  <ProjectInfoForm3  submitClick={changeForm} key="ProjectInfoForm3"/>
	}else{
		currentFormCom = null;
	}
	
	return(
		<div className={styles.riverInput}>
			
		
		<Row>
			<Col span={12} offset={6}>
				<Steps current={_state.stepState.current}>
					{_state.stepState.items.map(
					(item,index)=> <Step title = {item.title} description={item.description} key={index}/>)
					}
					</Steps>
			</Col>
			<Col span={12} offset={6}>
					{currentFormCom}
			</Col>
		</Row></div>)
}*/
const RiverInput=({form,river,dispatch})=>{
	var _state = river.riverInput;
	console.log(_state)
	//var changeForm = this.changeForm;
	var currentForm = _state.currentForm;
	const changeToForm2=()=>{
		dispatch({
			type:'river/changeInputForm',
			payload:{
				currentForm:1,
				stepState:{
					current:1,
					items:[
			          {
			            description:"河流基本信息",
			            title:"已填写"
			          },
			          {
			            description:"编辑河流位置",
			            title:"填写中"
			          }
			        ],
				}
			}
		})
	}
	var currentFormCom; 
	if(currentForm==0){
		currentFormCom =
		<Col span={16}>
			<ProjectInfoForm1 form={form} submitClick={changeToForm2}  key="ProjectInfoForm1"/>
		</Col> 
	}else if(currentForm==1){
		currentFormCom =
		<Col span={24}>
			<AddFeatureOnMap />
		</Col> 
	}else{
		currentFormCom = null;
	}
	return(
		<div className={styles.riverInput}>
			<Row type='flex' justify='center'>
				<Col span={16}>
					<Steps current={_state.stepState.current}>
						{_state.stepState.items.map(
						(item,index)=> <Step title = {item.title} description={item.description} key={index}/>)
						}
						</Steps>
				</Col>
					{currentFormCom}
			</Row>
		</div>
	)
}
export default connect(
	({river})=>({river})
)(Form.create()(RiverInput)) 