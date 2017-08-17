import React from 'react';
import {
			Menu,Icon,Collapse,Button,Checkbox,QueueAnim,Tooltip,Badge,Tree,
			Form,Input,Row,Col,
			Steps,Cascader,Select
} from 'antd';
import {connect} from 'dva'
import {HNCity} from '../../../utils/city'
import styles from './RiverInput.less'

//data用于储存用户填写的表单数据
var DATA =[];
const Step = Steps.Step;
const FormItem = Form.Item;

const areaData = HNCity;

const ProjectInfoForm1 = ({form,submitClick})=>{
	//console.log(form)
	var {getFieldDecorator,getFieldError,isFieldValidating,resetFields} = form;
	var requiredRules={
		rules: [
 				{required: true, message: '不能为空' },
 			]
	};
	const handleReset=(e)=>{
		form.resetFields()
	}
	const handleSubmit=(e)=>{
		e.preventDefault()
	}
	const formItemProps={
		labelCol:{span:8},
		wrapperCol:{span:10}
	}
	return(
		<Form layout="horizontal">
			<FormItem
			 label="河流名称"
			 {...formItemProps}>
			 	{
			 		getFieldDecorator('河流名称',requiredRules)(
			 			<Input
						id="河流名称"
						placeholder="请输入河流名称"></Input>
				 )}
				
			</FormItem>
			<FormItem
			 label="水利普查序号"
			 {...formItemProps}>
			 	{
			 		getFieldDecorator('水利普查序号',requiredRules)(
			 			<Input
						 id="水利普查序号"
						 placeholder="请输入水利普查序号" />
			 	)}
			</FormItem>
			<FormItem
			 label="所在水系"
			 {...formItemProps}>
			 	{
			 		getFieldDecorator('所在水系',requiredRules)(
			 			<Input
						 id="所在水系"
						 placeholder="请输入所在水系" />
			 	)}
			</FormItem>
			<FormItem
			 label="流经地"
			 {...formItemProps}>
			 	{
			 		getFieldDecorator('流经地',requiredRules)(
			 			<Input
						 options={areaData}/>
			 	)}
				
			</FormItem>
			<FormItem
			 label="河流长度"
			 {...formItemProps}>
			 	{
			 		getFieldDecorator('河流长度',requiredRules)(
			 			<Input
							 id="河流长度"
							 placeholder="河流长度" />
			 	)}
				
			</FormItem>
			<FormItem
			 label="流域面积"
			 {...formItemProps}>
			 	{
			 		getFieldDecorator('流域面积')(
			 			<Input
							 id="流域面积"
							 placeholder="流域面积"></Input>
			 	)}
				
			</FormItem>
			<FormItem
			 label="所属流域"
			 {...formItemProps}>
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

const AddFeatureOnMap=({submitClick})=>{
	return(
		<div>
			<iframe src="http://ditu.amap.com/" frameborder="0" style={{
				width:'100%',
				height:'450px'
			}}></iframe>
			<Button type="primary" style={{marginLeft:'20px'}}onClick={submitClick}>下一项</Button>
		</div>
	)
}

const RiverInput=({form,river,dispatch})=>{
	var _state = river.riverInput;
	//console.log(_state)
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
			          },
			          {
			            description:"预览并提交",
			            title:"未填写"
			          }
			        ],
				}
			}
		})
	}
	const changeToForm3=()=>{
		dispatch({
			type:'river/changeInputForm',
			payload:{
				currentForm:2,
				stepState:{
					current:2,
					items:[
			          {
			            description:"河流基本信息",
			            title:"已填写"
			          },
			          {
			            description:"编辑河流位置",
			            title:"已填写"
			          },
			          {
			            description:"预览并提交",
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
			<AddFeatureOnMap submitClick={changeToForm3}/>
		</Col> 
	}else if(currentForm ==2){
		currentFormCom=
		<Col span={24}>
			{'预览并提交'}
			<Button type='primary'>确认提交</Button>
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