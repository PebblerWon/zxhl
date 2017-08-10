import React from 'react'
import {Row,Col} from 'antd'
import styles from './index.less'
const Logo = ()=>{
	return(
		<div className={styles.logo}>
			<Row>
				<Col xs={24} sm={24} md={5} lg={5} xl={6}>
					<img src="resource/水利logo-白色.png" alt="河南省中小河流治理项目管理信息系统"/>
				</Col>
				<Col xs={0} sm={0} md={19} lg={19} xl={18}>
					<span>河南省流域面积200~3000平方<br></br>公里中小河流治理项目标绘系统</span>
				</Col>
			</Row>
		</div>
	)
}

export default Logo;