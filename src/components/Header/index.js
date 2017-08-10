import React from 'react'
import {Menu,Icon,Row,Col,Popover} from 'antd'
import Logo from '../Logo'
import HeaderMenu from './HeaderMenu'
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderC = ({current,menuClick,isNavbar,menuPopoverVisible,switchMenuPopover,user,logout})=> {
  const xsColProps={
    xs:2,
    sm:4,
    md:4,
    lg:4,
  }
  const smalColProps={
  	xs:2,
  	sm:4,
  	md:9,
  	lg:9,
  }
  const bigColProps={
  	 xs:20,
  	 sm:16,
  	 md:11,
  	 lg:11
  }
  const menuProps={
    current,
    menuClick,
    isHorizontal:!isNavbar
  }
  const popoverProps={
    visible:menuPopoverVisible,
    onVisibleChange:switchMenuPopover
  }
    return (
    	<div className={styles.headerContent}>
        {isNavbar?
          <div>
            <Row  align="bottom" type='flex'>
            <Col span={12}>
             <Popover 
              placement='bottomLeft'
              {...popoverProps}
              overlayClassName={styles.popovermenu}
              trigger='click'
              content={<HeaderMenu {...menuProps}></HeaderMenu>}
            >
              <div className={styles.button}>
                <Icon type='bars'></Icon>
              </div>
            </Popover>
            </Col>
            <Col span={12}>
              <Menu mode="horizontal" className={styles.menu} style={{float: 'right'}}>
                    <SubMenu title={<span> <Icon type="user" />{user['姓名']}</span>}>
                      <Menu.Item key="userManage">
                        用户管理
                      </Menu.Item>
                      <Menu.Item key="logout">
                        <a onClick={(e)=>{console.log(e)}}>退出</a>
                      </Menu.Item>
                    </SubMenu>
                </Menu>
            </Col>
            </Row>
          </div>
         
      		:<div className='header'>
          <Row align="bottom" type='flex' style={{height:'100%'}}>
      			<Col {...smalColProps}>
      				<Logo></Logo>
      			</Col>
      			<Col {...bigColProps} style={{height:'100%'}}>
      				<HeaderMenu {...menuProps}></HeaderMenu>
      			</Col>
      			<Col {...xsColProps}>
      				<Menu mode="horizontal" className={styles.menu}>
  				          <SubMenu title={<span> <Icon type="user" />
  				            {user['姓名']}</span>}
  				          >
                      <Menu.Item key="userManage">
                        用户管理
                      </Menu.Item>
  				            <Menu.Item key="logout">
  				              <a onClick={(e)=>{console.log(e)}}>退出</a>
  				            </Menu.Item>
  				          </SubMenu>
  			        </Menu>
      			</Col>
      		</Row></div>
        }
      </div>
      )
  }

export default HeaderC;
