import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import registerServiceWorker from './sw';
import './style.css';

const root = document.getElementById('root');

// Render
const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		root,
	);
};

render(App);

// Service Worker For Cache
registerServiceWorker();

// Hot Reload
if (module.hot) {
	module.hot.accept('./App', () => { render(App); });
}
