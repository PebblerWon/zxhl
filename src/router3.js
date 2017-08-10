import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'
import Login from './routes/Login'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  	console.log(app)
  	const routes = [
      	{
        	path: '/',
        	component: App,
        	getIndexRoute (nextState, cb) {
	          	require.ensure([], require => {
	            	registerModel(app, require('./models/login'))
	            	cb(null, { component: require('./routes/Login') })
	          	}, 'Login')
        	},
        	childRoutes: [
	  	        {
	  	          	path: 'login',
	  	          	getComponent (nextState, cb) {
	  		            require.ensure([], require => {
	  		              	registerModel(app, require('./models/login'))
	  		              	cb(null, require('./routes/Login/'))
	  		            }, 'Login')
	  		         },
	  	        },
	  	        {
	  	          	path: 'app',
	  	          	getComponent (nextState, cb) {
	  		            require.ensure([], require => {
	  		              	//registerModel(app, require('./models/login'))
	  		              	cb(null, require('./routes/app'))
	  		            }, 'app')
	  		        },
	  	          	/*component: App,
	  	          	getIndexRoute (nextState, cb) {
		          		require.ensure([], require => {
			            	registerModel(app, require('./models/baseSituation'))
			            	registerModel(app, require('./models/planProject'))
			            	cb(null, { component: require('./routes/Home/') })
		          		}, 'App')
        			},*/
        		},
			 	{
	  	          	path: 'app/home',
	  	          	getComponent (nextState, cb) {
	  		            require.ensure([], require => {
	  		              registerModel(app, require('./models/baseSituation'))
	            				registerModel(app, require('./models/planProject'))
	  		              	cb(null, require('./routes/Home/'))
	  		            }, 'Home')
	  		          },
	  	        },
	            {
	                path: 'app/dataCenter',

	                getComponent (nextState, cb) {
	                  require.ensure([], require => {
	                      registerModel(app, require('./models/river'))
	                      registerModel(app, require('./models/project'))
	                      registerModel(app, require('./models/shierwuproject.js'))
	                      cb(null, require('./routes/DataCenter/'))
	                  }, 'dataCenter')
	                },
	            },
	            {
	                path: 'app/infoStastic',

	                getComponent (nextState, cb) {
	                  require.ensure([], require => {
	                      registerModel(app, require('./models/baseSituation'))
	                      registerModel(app, require('./models/huizongguihua'))
	                      registerModel(app, require('./models/huizongpifu'))
	                      registerModel(app, require('./models/huizongyanshou'))
	                      registerModel(app, require('./models/huizongshierwu'))
	                      cb(null, require('./routes/InfoStastic/'))
	                  }, 'infoStastic')
	                },
	            }
        	],
      	}
    ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
