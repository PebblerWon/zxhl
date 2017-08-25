import React from 'react'
import { Modal, Button ,Table,Row,Col,Form,Input} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol:{span:9},
  wrapperCol:{span:15},
}
const numberInput={
  type:'number',
  min:"0"
}
class UpdateModal extends React.Component{
  constructor(props){
    console.log(props)
    const {getFieldDecorator,setFieldsValue} = props.form
    super(props)
    this.state={}
  }
  componentDidMount () {
    //console.log('componentDidMount')
    let item = this.props.item;
    //this.props.form.setFieldsInitialValue(item)
  }
  render(){
    const handleSubmit = (e)=>{
        console.log(this)
        const ReactDom = this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          //console.log(err)
            console.log('Received values of form: ', values);
            if(err){
              let a =Modal.error({
                title:'请认真填写完整！',
                onOk(e){
                  a.destroy()
                },
                onCancel(e){
                  a.destroy()
                }
              })
            }else{
              this.props.onSubmit(values)
            }
        });
    }
    return(
      <div>
        <Form onSubmit={handleSubmit}
          style={{paddingTop:'20px'}}>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} label='编码'>
                {this.props.form.getFieldDecorator('编码', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['编码'],
                    })(
                    <Input disabled={true}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='河流名称'>
                {this.props.form.getFieldDecorator('河流名称', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['河流名称'],
                    })(
                    <Input disabled={true}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='所属流域'>
                {this.props.form.getFieldDecorator('所属流域', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['所属流域'],
                    })(
                    <Input disabled={true}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='所在水系'>
                {this.props.form.getFieldDecorator('所在水系', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['所在水系'],
                    })(
                    <Input disabled={true}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='河流长度'>
                {this.props.form.getFieldDecorator('河流长度', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['河流长度'],
                    })(
                    <Input {...numberInput}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='治理项目'>
                {this.props.form.getFieldDecorator('治理项目', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['治理项目'],
                    })(
                    <Input {...numberInput}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label='规划项目'>
                {this.props.form.getFieldDecorator('规划项目', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['规划项目'],
                    })(
                    <Input {...numberInput}/>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                labelCol={{span:3}}
                wrapperCol={{span:21}} 
                label='流经地'>
                {this.props.form.getFieldDecorator('流经地', {
                    rules: [{ required: true, message: '不能为空！' }],
                    initialValue:this.props.item['流经地'],
                    })(
                    <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{marginTop:'10px'}}>
              <Col span={4} push={20}><Button type='primary' htmlType="submit">确定</Button></Col>
          </Row>
        </Form>
      </div>
    )
  }
}
          
export default Form.create()(UpdateModal);
