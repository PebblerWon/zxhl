import React from 'react'
import {Menu,Icon,Row,Col} from 'antd'
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = ()=> {
  const state = {
    current: 'map',
  }
  const handleClick = (e) => {
    console.log('click ', e);
  }
  const smalColProps={
  	xs:2,
  	sm:4,
  	md:3,
  	lg:3,
  }
  const bigColProps={
  	 xs:20,
  	 sm:16,
  	 md:18,
  	 lg:18
  }
    return (
    	<div className={styles.content}>
    		<Row align="bottom" type='flex'>
    			<Col {...smalColProps}>
    				<h1>小河流</h1>
    			</Col>
    			<Col {...bigColProps}>
    				<Menu className={styles.menu}
				        onClick={handleClick}
				        selectedKeys={[state.current]}
				        mode="horizontal"
			      	>
				        <Menu.Item key="map" className={styles.menuItem}>
				          <Icon type="mail" />地图浏览
				        </Menu.Item>
				        <Menu.Item key="data" className={styles.menuItem}>
				          <Icon type="appstore" />数据中心
				        </Menu.Item>
				        <Menu.Item key="tj" className={styles.menuItem}>
				          <Icon type="appstore" />信息统计
				        </Menu.Item>
				     	<Menu.Item key="userManage" className={styles.menuItem}>
				          <Icon type="appstore" />用户管理
				        </Menu.Item>
			      	</Menu>
    			</Col>
    			<Col {...smalColProps}>
    				<Menu mode="horizontal" style={{float: 'right',}} >
				          <SubMenu title={<span> <Icon type="user" />
				            admin </span>}
				          >
				            <Menu.Item key="logout">
				              退出
				            </Menu.Item>
				          </SubMenu>
			        </Menu>
    			</Col>
    		</Row>
	      	
      	</div>
      )
}

export default Header;
