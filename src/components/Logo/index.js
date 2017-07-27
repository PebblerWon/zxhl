import React from 'react'
import {Row,Col} from 'antd'
import styles from './index.less'
const Logo = ()=>{
	return(
		<div className={styles.logo}>
			<Row>
				<Col xs={24} sm={24} md={4} lg={4} xl={6}>
					<img src="resource/中国水利.png" alt="河南省中小河流治理项目管理信息系统"/>
				</Col>
				<Col xs={0} sm={0} md={20} lg={20} xl={18}>
					<span>河南省中小河流治理项目管理信息系统</span>
				</Col>
			</Row>
		</div>
	)
}

export default Logo;