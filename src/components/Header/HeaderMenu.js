import React from 'react'
import {Menu,Icon,Row,Col,Popover} from 'antd'
import {Link} from'dva/router'
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderMenu=({isHorizontal,menuClick,current})=>{
    const mode = isHorizontal?'horizontal':'vertical'
    return(
      <Menu className={styles.menu}
        onClick={menuClick}
        selectedKeys={[current]}
        mode={mode}
      >
        <SubMenu title={<span><Icon type='mail'/>地图浏览</span>}  className={styles.menuItem}>
         <Menu.Item>地图浏览1</Menu.Item>
         <Menu.Item>地图浏览2</Menu.Item>
         <Menu.Item>地图浏览3</Menu.Item>
        </SubMenu>
        <Menu.Item key="data" className={styles.menuItem}>
          <Link to="/dataCenter"><Icon type="appstore" />数据中心</Link>
        </Menu.Item>
        <Menu.Item key="tj" className={styles.menuItem}>
          <Link to="/infoStastic"><Icon type="appstore" />项目统计</Link>
        </Menu.Item>
        <Menu.Item key="userManage" className={styles.menuItem}>
          <Icon type="appstore" />用户管理
        </Menu.Item>
      </Menu>
  )}

export default HeaderMenu;
