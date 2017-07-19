import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/app';
import DataCenter from './routes/DataCenter'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
      	<Route path="/dataCenter" component={DataCenter} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
