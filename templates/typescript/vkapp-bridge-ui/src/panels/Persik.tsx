import { FC } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import PersicImage from '../assets/persik.png';

export interface PersikProps extends NavIdProps {
  go: (panelName: string) => void;
}

export const Persik: FC<PersikProps> = ({ id, go }) => (
  <Panel id={id}>
    <PanelHeader before={<PanelHeaderBack onClick={() => go('home')} />}>Persik</PanelHeader>
    <Placeholder>
      <img width={230} src={PersicImage} alt="Persik The Cat" />
    </Placeholder>
  </Panel>
);
