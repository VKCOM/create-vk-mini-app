import {
  RoutesConfig,
  createHashRouter,
  createView,
  createPanel
} from '@vkontakte/vk-mini-apps-router';
import { VIEW, PAGES } from './model';

export const AppRoutes = RoutesConfig.create([
  createView(VIEW.DEFAULT, [
    createPanel(PAGES.HOME, "/"),
    createPanel(PAGES.PERSIK, "/persik")
  ])
]);

export const AppRouter = createHashRouter(AppRoutes.getRoutes());