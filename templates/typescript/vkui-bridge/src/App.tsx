import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';

import { Persik, Home } from './panels';

export const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = (panelName: string) => {
    setActivePanel(panelName);
  };

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} go={go} />
          <Persik id="persik" go={go} />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
