import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading'

// 1. Initialize
const app = dva({
	...createLoading({
    effects: true,
  }),
  onError (error) {
    console.error(error)
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/header'));
app.model(require('./models/river'));
app.model(require('./models/project'));
app.model(require('./models/baseSituation'));
app.model(require('./models/planProject'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
