import React, { MouseEventHandler } from 'react';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import './Persik.css';

interface Props {
	id: string;
	go: MouseEventHandler<HTMLElement>;
}

const Persik: React.FC<Props> = ({id, go}) => (
	<Panel id={id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={go} data-to="home"/>}
		>
			Persik
		</PanelHeader>
		<img className="Persik" src="/img/persik.png" alt="Persik The Cat"/>
	</Panel>
);

export default Persik;
