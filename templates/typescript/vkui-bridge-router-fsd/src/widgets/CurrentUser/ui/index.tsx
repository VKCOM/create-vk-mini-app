import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { Fragment, useEffect, useState } from 'react';
import { UserCell } from '@entities/user';

export const CurrentUser = () => {

  const [fetchedUser, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, []);

  return(
    <Fragment>
      <UserCell data={fetchedUser} />
    </Fragment>
  );
}