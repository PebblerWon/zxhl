import React from 'react'

import styles from './index.less'
const Logo = ()=>{
	return(
		<div className={styles.logo}>
			<img src="http://47.92.30.98:8000/logo.png" alt=""/>
			<span>中小河流上图标绘系统</span>
		</div>
	)
}

export default Logo;