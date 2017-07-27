import React from 'react'
import HeaderC from '../../components/Header'
import {Menu,Icon,Row,Col} from 'antd'
import {connect} from 'dva'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = ({dispatch,header})=> {
  //console.log(header)
  const menuProps={
    isNavbar:header.isNavbar,
    current: header.current,
    menuClick(e){
      dispatch({type:'header/test',action:e})
    }
  }
  const popoverProps={
    menuPopoverVisible:header.menuPopoverVisible,
    switchMenuPopover(){
      dispatch({type:'header/switchMenuPopover'})
    }
  }
    return (
    	 <div>
	      	<HeaderC {...menuProps}{...popoverProps}></HeaderC>
      	</div>
      )
  }

export default connect(
  ({header})=>({header})
  )(Header);
