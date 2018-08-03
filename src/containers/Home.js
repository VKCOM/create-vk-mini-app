import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Entity, Button, Group, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Home = props => (
	<Panel id={props.id}>
		{Object.keys(props.fetchedUser).length > 0 &&
		<Group title="User Data Fetched with Vk Connect">
			<Div>
				<Entity
					photo={props.fetchedUser.photo_200}
					size={48}
					title={`${props.fetchedUser.first_name} ${props.fetchedUser.last_name}`}
					description={props.fetchedUser.city.title}
				/>
			</Div>

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
