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
  	//console.log(app)
  	const routes = [
      {
        	path: '/',
        	component: App,
        	getIndexRoute (nextState, cb) {
          	require.ensure([], require => {
            	cb(null, { component: require('./routes/Login') })
          	}, 'App')
        	},
        	childRoutes: [
  	        {
  	          	path: '/home',

  	          	getComponent (nextState, cb) {
  		            require.ensure([], require => {
                    registerModel(app, require('./models/header'))
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
                      registerModel(app, require('./models/header'))
                      registerModel(app, require('./models/river'))
                      registerModel(app, require('./models/project'))
                      registerModel(app, require('./models/shierwuproject.js'))
                      cb(null, require('./routes/DataCenter/'))
                  }, 'dataCenter')
                },
            },
            {
                path: '/infoStastic',

                getComponent (nextState, cb) {
                  require.ensure([], require => {
                      registerModel(app, require('./models/header'))
                      registerModel(app, require('./models/baseSituation'))
                      registerModel(app, require('./models/huizongguihua'))
                      registerModel(app, require('./models/huizongpifu'))
                      registerModel(app, require('./models/huizongyanshou'))
                      registerModel(app, require('./models/huizongshierwu'))
                      cb(null, require('./routes/InfoStastic/'))
                  }, 'infoStastic')
                },
            },
            {
                path: 'login',
                getComponent (nextState, cb) {
                  require.ensure([], require => {
                      registerModel(app, require('./models/login'))
                      cb(null, require('./routes/Login/'))
                      }, 'login')
                  },
            },
            {
                path: 'map',
                getComponent (nextState, cb) {
                  require.ensure([], require => {
                      registerModel(app, require('./models/header'))
                      cb(null, require('./routes/MapC/'))
                      }, 'MapC')
                  },
            },
        	],
      },
    ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
