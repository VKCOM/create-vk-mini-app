import { Group, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PersikImage from '@shared/assets/persik.png';

export const Persik = (props: NavIdProps) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel {...props}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Persik
      </PanelHeader>
      
      <Group>
        <Placeholder>
          <img width={230} src={PersikImage} alt="Persik The Cat" />
        </Placeholder>
      </Group>
    </Panel>
  );
};
