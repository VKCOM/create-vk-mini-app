import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);

  useEffect(() => {
    connect.subscribe(e => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          setUser(e.detail.data);
          break;
        default:
          console.log(e.detail.type);
      }
    });
    connect.send('VKWebAppGetUserInfo', {});
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <View activePanel={activePanel}>
      <Home id="home" fetchedUser={fetchedUser} go={go} />
      <Persik id="persik" go={go} />
    </View>
  );
};

export default App;
