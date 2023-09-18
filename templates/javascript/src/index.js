import React from 'react';
import ReactDOM from 'react-dom';

import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react';
import { transformVKBridgeAdaptivity } from './transformers/transformVKBridgeAdaptivity';
import App from './App';

// Init VK  Mini App
vkBridge.send('VKWebAppInit');

const InjectBridge = () => {
  const vkBridgeAppearance = useAppearance() || undefined; // You can replace undefined with your default value
  const vkBridgeInsets = useInsets() || undefined; // You can replace undefined with your default value
  const vkBridgeAdaptivityProps = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search); // [optional] platform can be provided by URL (see https://dev.vk.com/mini-apps/development/launch-params#vk_platform)

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={true} // Reserve right side of PanelHeader for VK Mini Apps control buttons
    >
      <AdaptivityProvider {...vkBridgeAdaptivityProps}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

ReactDOM.render(<InjectBridge />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); //runtime download
}
