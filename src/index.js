import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Routes from './routes';
import '../assets/sass/index.scss';

const store = configureStore();

ReactDOM.render(<Provider store={store} > <Routes /> </Provider>, document.getElementById('root'));
