import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';

createRoot(document.getElementById('root')!).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <App initialPanel="main" />
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>,
);
