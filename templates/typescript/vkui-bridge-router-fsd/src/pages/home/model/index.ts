import { UserInfo } from '@vkontakte/vk-bridge';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}