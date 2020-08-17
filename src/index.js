import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import theme from './theme';
import Store from '~/store';

ReactDOM.render(
  <Provider store={Store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
