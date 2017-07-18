import React from 'react'
import Header from '../components/Header'
import styles from './app.less'
const App = ({children})=>{
	return (
		<div>
			<Header></Header>
			<div className={styles.container}>
					{children}
			</div>
		</div>
	)
}

export default App;