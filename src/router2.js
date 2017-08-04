import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  	console.log(app)
  	const routes = [{
      	path: '/',
      	component: App,
      	getIndexRoute (nextState, cb) {
        	require.ensure([], require => {
          	registerModel(app, require('./models/baseSituation'))
          	registerModel(app, require('./models/planProject'))
          	cb(null, { component: require('./routes/Home') })
        	}, 'App')
      	},
      	childRoutes: [
	        {
	          	path: '/home',

	          	getComponent (nextState, cb) {
		            require.ensure([], require => {
		              registerModel(app, require('./models/baseSituation'))
          				registerModel(app, require('./models/planProject'))
		              	cb(null, require('./routes/Home/'))
		            }, 'Home')
		        },
	        },
          {
              path: '/dataCenter',

              getComponent (nextState, cb) {
                require.ensure([], require => {
                    registerModel(app, require('./models/river'))
                    registerModel(app, require('./models/project'))
                    registerModel(app, require('./models/shiErWuproject.js'))
                    cb(null, require('./routes/DataCenter/'))
                }, 'dataCenter')
            },
          },
          {
              path: '/infoStastic',

              getComponent (nextState, cb) {
                require.ensure([], require => {
                    registerModel(app, require('./models/baseSituation'))
                    cb(null, require('./routes/InfoStastic/'))
                }, 'infoStastic')
            },
          },
      	],
    }]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
