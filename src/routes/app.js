import React from 'react'
import Header from '../routes/Header'
import Login from '../routes/Login'
import styles from './app.less'
import config from '../utils/config'


const App = ({children,location})=>{
	
	if(location.pathname=='/'){
		return <div style={{width:'100%',height:'100%'}}><Login /></div>
	}
	if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    	return <div style={{width:'100%',height:'100%'}}><Login /></div>
  	}
	return (
		<div className={styles.root}>
			<div className={styles.header}><Header /></div>
			<div className={styles.container}>
				<div className={styles.innerContent}>
					{children}
				</div>
			</div>
			
		</div>
	)
}

export default App;