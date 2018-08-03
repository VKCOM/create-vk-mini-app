import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Group, Div } from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import '@vkontakte/vkui/dist/vkui.css';

import persik from '../img/persik.png';

const Persik = props => (
	<Panel id={props.id}>
		<Group>
			<Div>
				<Button
					size="l"
					before={<Icon24BrowserBack />}
					onClick={() => props.clickHandler()}
				>
					Get back
				</Button>
			</Div>
			<Div>
				<img
					src={persik}
					className="persik"
					alt="Persik The Cat"
				/>
			</Div>
		</Group>
	</Panel>
);

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	clickHandler: PropTypes.func.isRequired,
};

export default Persik;
