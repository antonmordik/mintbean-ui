import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import { store, persistor } from './store';
import routes from './routes';

ReactDOM.render(
  <Suspense fallback={'loader'}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          {routes}
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
