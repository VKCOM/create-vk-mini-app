import {
  type AdaptivityProps,
  getViewWidthByViewportWidth,
  getViewHeightByViewportHeight,
  ViewWidth,
  SizeType,
} from '@vkontakte/vkui';
import type { UseAdaptivity } from '@vkontakte/vk-bridge-react';

export const transformVKBridgeAdaptivity = (bridgeAdaptivity: UseAdaptivity): AdaptivityProps => {
  let viewWidth;
  let viewHeight;
  let sizeX;
  let sizeY;

  if (bridgeAdaptivity.type === 'adaptive') {
    const { viewportWidth, viewportHeight } = bridgeAdaptivity;
    viewWidth = getViewWidthByViewportWidth(viewportWidth);
    viewHeight = getViewHeightByViewportHeight(viewportHeight);
  } else if (
    bridgeAdaptivity.type === 'force_mobile' ||
    bridgeAdaptivity.type === 'force_mobile_compact'
  ) {
    viewWidth = ViewWidth.MOBILE;
    sizeX = SizeType.COMPACT;

    if (bridgeAdaptivity.type === 'force_mobile_compact') {
      sizeY = SizeType.COMPACT;
    } else {
      sizeY = SizeType.REGULAR;
    }
  }

  return { viewWidth, viewHeight, sizeX, sizeY };
};
