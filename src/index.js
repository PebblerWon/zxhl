import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading'
import { message } from 'antd'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  //onError(e) {
  //  message.error(e.message, /* duration */3);
  //},
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login'));
//app.model(require('./models/header'));
// app.model(require('./models/river'));
// app.model(require('./models/project'));
// app.model(require('./models/baseSituation'));
// app.model(require('./models/planProject'));


// 4. Router
app.router(require('./router2'));

// 5. Start
app.start('#root');
