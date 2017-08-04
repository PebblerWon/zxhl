import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';

import App from './routes/app';
import DataCenter from './routes/DataCenter'
import InfoStastic from './routes/InfoStastic'
import MapC from './routes/MapC'
import Home from './routes/Home'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
      	<IndexRoute component={Home}></IndexRoute>
        <Route path="/home" component={Home} />
      	<Route path="/dataCenter" component={DataCenter} />
      	<Route path="/infoStastic" component={InfoStastic} />
      	<Route path="/map" component={MapC} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
