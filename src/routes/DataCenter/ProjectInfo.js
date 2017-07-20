import React from 'react'
import {Button} from 'antd'
import styles from './ProjectInfo.less'

const ProjectInfo =()=>{
	return(
			<div className={styles.projectInfo}>
				<h1>项目信息</h1>
				<Button>点我</Button>
				<span className="span">123456789</span>
			</div>
			
		)
}

export default ProjectInfo;