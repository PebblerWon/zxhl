import React from 'react'
import {Menu,Icon,Row,Col,Popover} from 'antd'
import {Link} from'dva/router'
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderMenu=({isHorizontal,menuClick,current})=>{
    const mode = isHorizontal?'horizontal':'vertical'
    return(
      <Menu className={isHorizontal?styles.menu:''}
        onClick={menuClick}
        selectedKeys={[current]}
        mode={mode}
      >
        <Menu.Item key="home" className={styles.menuItem}>
          <Link to="/home"><Icon type="home" />首页</Link>
        </Menu.Item>
        <Menu.Item key="dataCenter" className={styles.menuItem}>
          <Link to="/dataCenter"><Icon type="search" />查询信息</Link>
        </Menu.Item>
        <Menu.Item key="infoStastic" className={styles.menuItem}>
          <Link to="/infoStastic"><Icon type="bar-chart" />汇总信息</Link>
        </Menu.Item>{/*
        <Menu.Item key="userManage" className={styles.menuItem}>
          <Icon type="appstore" />用户管理
        </Menu.Item>*/}
        <Menu.Item key="map" className={styles.menuItem}>
          <Link to="/map"><Icon type="laptop" />专题展示</Link>
        </Menu.Item>
      </Menu>
  )}

export default HeaderMenu;
