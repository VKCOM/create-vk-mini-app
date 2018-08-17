import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: {},
		};
	}

	componentWillMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: { ...e.detail.data } });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} header={false}>
				<Home id="home" fetchedUser={this.state.fetchedUser} clickHandler={() => this.setState({ activePanel: 'persik' })} />
				<Persik id="persik" clickHandler={() => this.setState({ activePanel: 'home' })} />
			</View>
		);
	}
}

export default App;
