import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation, usePopout } from '@vkontakte/vk-mini-apps-router';

import { Persik, Home } from '@pages/index';
import { PAGES } from '@app/router/model';

export const App = () => {

  const popout = usePopout();

  const { panel: activePanel = PAGES.HOME } = useActiveVkuiLocation();

  return (
    <SplitLayout>
      {popout}
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={PAGES.HOME} />
          <Persik id={PAGES.PERSIK} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
