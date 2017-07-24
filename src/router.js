import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/app';
import DataCenter from './routes/DataCenter'
import InfoStastic from './routes/InfoStastic'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
      	<Route path="/dataCenter" component={DataCenter} />
      	<Route path="/infoStastic" component={InfoStastic} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
