import {
  Panel,
  PanelHeader,
  Header,
  Group,
  NavIdProps,
} from '@vkontakte/vkui';
import {
  Navigation,
  CurrentUser
} from '@widgets/index';

export const Home = (props: NavIdProps) => {
  return (
    <Panel {...props}>
      <PanelHeader>Главная</PanelHeader>
      
      <Group header={<Header size="s">User Data Fetched with VK Bridge</Header>}>
        <CurrentUser/>
      </Group>

      <Group header={<Header size="s">Navigation Example</Header>}>
        <Navigation/>
      </Group>
    </Panel>
  );
};
