import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import * as eruda from 'eruda';
import * as erudaCode from 'eruda-code';
import * as erudaDom from 'eruda-dom';

// Init VK  Mini App
bridge.send('VKWebAppInit');

ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
	eruda.init();
	eruda.add(erudaCode);
	eruda.add(erudaDom);
}
