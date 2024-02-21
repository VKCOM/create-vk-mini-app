import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig';

vkBridge.send('VKWebAppInit');

createRoot(document.getElementById('root')).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda.js');
}
