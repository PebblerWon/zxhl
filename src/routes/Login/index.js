import React from 'react'
import {Input,Icon,Row,Col,Form,Button,Alert,Modal} from 'antd'
import {connect} from 'dva'

import styles from './index.less'
const FormItem = Form.Item;

const Login = ({login,dispatch,form})=> {
    //console.log(login)
    const submit=(e)=>{
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({type:'login/query',payload:{
            userName:values.userName,
            password:values.password
          }})
        }
      });
    }
    const {getFieldDecorator} = form
    return ( 
    	<div className={styles.loginBody} style={{
    		width:'100%',
    		height:'100%',
    		backgroundColor:'#6CA0DA',
    		background:'url(./resource/login/登录-背景.png) no-repeat',
    		backgroundSize:'100% 100%',
    		position:'relative'
    	}}>
    		<div className={styles.loginContent}>
    			<div className={styles.head}>
    				<div className={styles.logo}>
    					<a href="#"><img src="./resource/水利logo-蓝色.png" alt=""/></a>
    				</div>
    				<div className={styles.title}>
                        <p>河南省流域面积200~3000平方</p>
                        <p>公里中小河流治理项目标绘系统</p>
            </div>
    			</div>
          <div style={{position:'relative',top:'25px',left:'90px',display:'inline-block'}}>
            <span>用户名：super</span> <span>密码：super</span>
          </div>
    			<div className={styles.form}>
            <Form onSubmit={submit}   className="login-form">
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                  })(
                    <Input addonBefore={<Icon type="user" style={{ fontSize: 16 }} />}   placeholder="请输入用户名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码！' }],
                  })(
                    <Input addonBefore={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="请输入密码"/>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button"  loading={login.loginLoading}>
                    登录
                  </Button>
                </FormItem>
                <FormItem>
                  <Alert style={login.alert?{display:'block'}:{display:'none'}} message="错误的用户名或密码" type="error" showIcon />
                </FormItem>
            </Form>
    			</div>
    		</div>
      	</div>
      )
}

export default connect(
  ({login})=>({login})
)(Form.create()(Login));