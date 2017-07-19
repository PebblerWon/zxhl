import React from 'react'
import Header from '../routes/Header'
import styles from './app.less'
const App = ({children})=>{
	return (
		<div className={styles.root}>
			<div className={styles.header}><Header/></div>
			<div className={styles.container}>
				<div className={styles.innerContent}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default App;