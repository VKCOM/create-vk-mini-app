import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import * as VKConnect from '@vkontakte/vkui-connect';
import App from './App';
import registerServiceWorker from './sw';

// Init VK App
VKConnect.send('VKWebAppInit', {});

// Service Worker For Cache
registerServiceWorker();

// Hot Reload
ReactDOM.render(<App />, document.getElementById('root'));
