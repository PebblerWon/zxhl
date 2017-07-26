import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/header'));
app.model(require('./models/river'));
app.model(require('./models/project'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
