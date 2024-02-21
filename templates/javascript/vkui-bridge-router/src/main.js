import ReactDOM from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig.js';

vkBridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda.js');
}
