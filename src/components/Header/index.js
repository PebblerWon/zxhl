import React from 'react'
import {Menu,Icon,Row,Col,Popover} from 'antd'
import HeaderMenu from './HeaderMenu'
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderC = ({current,menuClick,isNavbar,menuPopoverVisible,switchMenuPopover})=> {
  const smalColProps={
  	xs:2,
  	sm:4,
  	md:5,
  	lg:5,
  }
  const bigColProps={
  	 xs:20,
  	 sm:16,
  	 md:14,
  	 lg:14
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
  console.log(isNavbar)
    return (
    	<div className={styles.content}>
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
              <Menu mode="horizontal" style={{float: 'right'}} className={styles.menuItem}>
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
         
      		:<div>
          <Row align="bottom" type='flex'>
      			<Col {...smalColProps}>
      				<h1>中小河流</h1>
      				<h1>信息管理</h1>
      			</Col>
      			<Col {...bigColProps}>
      				<HeaderMenu {...menuProps}></HeaderMenu>
      			</Col>
      			<Col {...smalColProps}>
      				<Menu mode="horizontal" style={{float: 'right'}} className={styles.menuItem}>
  				          <SubMenu title={<span> <Icon type="user" />
  				            admin </span>}
  				          >
  				            <Menu.Item key="logout">
  				              退出
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
