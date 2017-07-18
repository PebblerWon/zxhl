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
    return (
    	<div className={styles.content}>
    		
    		<div className={styles.logo}>
    			<img src="" alt=""/>
    		</div>
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
      	</div>
      )
}

export default Header;
