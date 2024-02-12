import {
  getViewWidthByViewportWidth,
  getViewHeightByViewportHeight,
  ViewWidth,
  SizeType,
} from '@vkontakte/vkui';

export const transformVKBridgeAdaptivity = ({ type, viewportWidth, viewportHeight }) => {
  switch (type) {
    case 'adaptive':
      return {
        viewWidth: getViewWidthByViewportWidth(viewportWidth),
        viewHeight: getViewHeightByViewportHeight(viewportHeight),
      };
    case 'force_mobile':
    case 'force_mobile_compact':
      return {
        viewWidth: ViewWidth.MOBILE,
        sizeX: SizeType.COMPACT,
        sizeY: type === 'force_mobile_compact' ? SizeType.COMPACT : SizeType.REGULAR,
      };
    default:
      return {};
  }
};
