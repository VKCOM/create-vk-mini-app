import { AppRoutes } from '@app/router';
import { Button, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Navigation = () => {

  const routeNavigator = useRouteNavigator();

  return(
    <Div>
      <Button
        size="l"
        stretched={true}
        mode="secondary"
        onClick={() => routeNavigator.push(AppRoutes.default.persik)}
      >
        Покажите Персика, пожалуйста!
      </Button>
    </Div>
  );
}