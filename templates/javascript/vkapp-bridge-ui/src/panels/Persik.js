import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import PersicImage from '../assets/persik.png';

export const Persik = ({ id, go }) => (
  <Panel id={id}>
    <PanelHeader before={<PanelHeaderBack onClick={() => go('home')} />}>Persik</PanelHeader>
    <Placeholder>
      <img width={230} src={PersicImage} alt="Persik The Cat" />
    </Placeholder>
  </Panel>
);

Persik.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};
