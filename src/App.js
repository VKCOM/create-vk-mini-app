import React from 'react';
import * as VKConnect from '@vkontakte/vkui-connect';
import { ConfigProvider, View } from '@vkontakte/vkui';
import { isWebView } from '@vkontakte/vkui/src/lib/webview';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './containers/Home';
import Persik from './containers/Persik';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: {},
		};
	}

	componentWillMount() {
		// VK Connect
		VKConnect.subscribe((e) => {
			if (!e.detail) {
			} else if (e.detail.type === 'VKWebAppGetUserInfoResult') {
				this.setState({
					fetchedUser: {
						...e.detail.data 
					},
				});
			}
		});
		VKConnect.send('VKWebAppGetUserInfo', {});
	}

	render() {
		return (
			<ConfigProvider isWebView={isWebView}>
				<View activePanel={this.state.activePanel} header={false}>
					<Home id="home" fetchedUser={this.state.fetchedUser} clickHandler={() => this.setState({ activePanel: 'persik' })} />
					<Persik id="persik" clickHandler={() => this.setState({ activePanel: 'home' })} />
				</View>
			</ConfigProvider>
		);
	}
}

export default App;
