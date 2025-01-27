import { createRoot } from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import { AppConfig } from '@app/AppConfig.tsx';

bridge.send('VKWebAppInit');

createRoot(document.getElementById('root')!).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
