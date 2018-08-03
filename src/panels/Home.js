import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Home = props => (
	<Panel id={props.id}>
		{Object.keys(props.fetchedUser).length > 0 &&
		<Group title="User Data Fetched with VK Connect">

			<ListItem 
				before={<Avatar src={props.fetchedUser.photo_200}/>}
				description={props.fetchedUser.city.title}
			>
				{`${props.fetchedUser.first_name} ${props.fetchedUser.last_name}`}
			</ListItem>

		</Group>}

		<Group title="Navigation Example">

			<Div>
				<Button
					size="xl"
					level="2"
					onClick={() => props.clickHandler()}
				>
					Show me the Persik, please
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	clickHandler: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
