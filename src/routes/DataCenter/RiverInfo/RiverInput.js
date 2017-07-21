import React from 'react';
import {
			Menu,Icon,Collapse,Button,Checkbox,QueueAnim,Tooltip,Badge,Tree,
			Form,Input,Row,Col,
			Steps,Cascader,
} from 'antd';
import city from '../../../utils/city'
import styles from './RiverInput.less'

//data用于储存用户填写的表单数据
var DATA =[];
const Step = Steps.Step;
const FormItem = Form.Item;

const areaData = city('河南省');
class ProjectInfoForm1 extends React.Component{
	constructor() {
    	super();
  	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((errors,values)=>{
			if(!errors){
				console.log("no error")
				DATA.push(this.props.form.getFieldsValue());
				var nextForm = this.props.nextForm;
				this.props.submitClick(nextForm);
			}
		})
	}
	handleReset(e) {
    	e.preventDefault();
    	this.props.form.resetFields();
  	}
	render(){
		var {getFieldProps,getFieldError,isFieldValidating} = this.props.form;
		var requiredRules={
			rules: [
     				{required: true, message: '不能为空' },
     			]
		};
		return(
			<Form horizontal form={this.props.form}>
				<FormItem
				 label="项目编号"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="项目编号"
					 placeholder="请输入项目编号"
					 {...getFieldProps('项目编号',requiredRules)}></Input>
				</FormItem>
				<FormItem
				 label="项目名称"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="项目名称"
					 {...getFieldProps('项目名称',requiredRules)}
					 placeholder="请输入项目名称"></Input>
				</FormItem>
				<FormItem
				 label="所在河流"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="所在河流"
					 {...getFieldProps('所在河流',requiredRules)}
					 placeholder="请输入所在河流"></Input>
				</FormItem>
				<FormItem
				 label="市/县行政区"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Cascader
					 options={areaData}
					 placeholder="请选择行政区"
					 {...getFieldProps('行政区')}></Cascader>
				</FormItem>
				<FormItem
				 label="前期工作"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="前期工作"
					 {...getFieldProps('前期工作')}
					 placeholder="前期工作进展"></Input>
				</FormItem>
				<FormItem
				 label="规划投资"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="规划投资"
					 {...getFieldProps('规划投资')}
					 placeholder="规划投资"></Input>
				</FormItem>
				<FormItem
				 label="初设单位"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="初设单位"
					 {...getFieldProps('初设单位')}
					 placeholder="初设单位"></Input>
				</FormItem>
				<FormItem
				 label="初设进展"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="初设进展"
					 {...getFieldProps('初设进展')}
					 placeholder="初设进展"></Input>
				</FormItem>
				<FormItem
				 label="批复情况"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="批复情况"
					 {...getFieldProps('批复情况')}
					 placeholder="批复情况"></Input>
				</FormItem>
				<FormItem 
				 wrapperCol={{ span: 12, offset: 8 }}>
						<Button type="default" className="resetBtn" onClick={this.handleReset}>重置</Button>
						<Button type="primary" className="submitBtn" onClick={this.handleSubmit}>确定</Button>
				</FormItem>
			</Form>
		)
	}
}
class ProjectInfoForm2 extends React.Component{
	constructor() {
    	super();
  	}

	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((errors,values)=>{
			if(!errors){
				console.log("no error")
				DATA.push(this.props.form.getFieldsValue());
				var nextForm = this.props.nextForm;
				this.props.submitClick(nextForm);
			}
		})
	}
	handleReset(e) {
    	e.preventDefault();
    	this.props.form.resetFields();
  	}
	render(){
		var {getFieldProps,getFieldError,isFieldValidating} = this.props.form;
		var requiredRules={
			rules: [
      				{required: true, message: '不能为空' },
      			]
		};
		return(
			<Form horizontal form={this.props.form}>
				<FormItem
				 label="治理长度"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="治理长度"
					 placeholder="请输入治理长度"
					 {...getFieldProps('治理长度',requiredRules)}></Input>
				</FormItem>
				<FormItem
				 label="新建堤防"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="新建堤防"
					 {...getFieldProps('新建堤防',requiredRules)}
					 placeholder="请输入新建堤防"></Input>
				</FormItem>
				<FormItem
				 label="加固堤防"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="加固堤防"
					 {...getFieldProps('加固堤防',requiredRules)}
					 placeholder="请输入加固堤防"></Input>
				</FormItem>
				<FormItem
				 label="清淤工程"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="清淤工程"
					 {...getFieldProps('清淤工程')}
					 placeholder="清淤工程"></Input>
				</FormItem>
				<FormItem
				 label="护坡护岸"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="护坡护岸"
					 {...getFieldProps('护坡护岸')}
					 placeholder="护坡护岸"></Input>
				</FormItem>
				<FormItem
				 label="其他工作"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="其他工作"
					 {...getFieldProps('其他工作')}
					 placeholder="其他工作"></Input>
				</FormItem>
				<FormItem
				 label="防洪标准"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="防洪标准"
					 {...getFieldProps('防洪标准')}
					 placeholder="防洪标准"></Input>
				</FormItem>
				<FormItem
				 label="除涝标准"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="除涝标准"
					 {...getFieldProps('除涝标准')}
					 placeholder="除涝标准"></Input>
				</FormItem>
				<FormItem 
				 wrapperCol={{ span: 12, offset: 8 }}>
						<Button type="default" className="resetBtn" onClick={this.handleReset}>重置</Button>
						<Button type="primary" className="submitBtn" onClick={this.handleSubmit}>确定</Button>
				</FormItem>
			</Form>
		)
	}
}
class ProjectInfoForm3 extends React.Component{
	constructor() {
    	super();
  	}

	handleSubmit(e){
		e.preventDefault();
		//console.log(this.props.form.getFieldsValue());
		this.props.form.validateFields((errors,values)=>{
			if(!errors){
				console.log("no error")
				DATA.push(this.props.form.getFieldsValue());
				$.ajax({
					url:"",
					method:"",
					data:{
						data:JSON.stringify(DATA),
						userid:""
					},
					success:function(data){},
					error:function(){},
				})
			}
		})
	}
	handleReset(e) {
    	e.preventDefault();
    	this.props.form.resetFields();
  	}
	render(){
		var {getFieldProps,getFieldError,isFieldValidating} = this.props.form;
		var requiredRules={
			rules: [
        			{required: true, message: '不能为空' },
      			]
		};
		return(
			<Form horizontal form={this.props.form}>
				<FormItem
				 label="保护城镇"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="保护城镇"
					 placeholder="请输入保护城镇"
					 {...getFieldProps('保护城镇',requiredRules)}></Input>
				</FormItem>
				<FormItem
				 label="保护人口"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="保护人口"
					 {...getFieldProps('保护人口',requiredRules)}
					 placeholder="请输入保护人口"></Input>
				</FormItem>
				<FormItem
				 label="保护耕地"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="保护耕地"
					 {...getFieldProps('保护耕地',requiredRules)}
					 placeholder="请输入保护耕地"></Input>
				</FormItem>
				<FormItem
				 label="排涝收益"
				 labelCol={{span:8}}
				 wrapperCol={{span:10}}>
					<Input
					 id="排涝收益"
					 {...getFieldProps('排涝收益')}
					 placeholder="排涝收益"></Input>
				</FormItem>
				<FormItem 
				 wrapperCol={{ span: 12, offset: 8 }}>
						<Button type="default" className="resetBtn" onClick={this.handleReset}>重置</Button>
						<Button type="primary" className="submitBtn" onClick={this.handleSubmit}>完成</Button>
				</FormItem>
			</Form>
		)
	}
}
ProjectInfoForm1 = Form.create()(ProjectInfoForm1);
ProjectInfoForm2 = Form.create()(ProjectInfoForm2);
ProjectInfoForm3 = Form.create()(ProjectInfoForm3);
export default class RiverInput extends React.Component{
	constructor() {
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
	handelSubmit(e){
	}
	changeForm(nextForm){
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
	render(){
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
	}
}