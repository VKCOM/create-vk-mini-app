import { Avatar, Cell } from '@vkontakte/vkui';
import { UserCellProps } from '../model';
import { Icon28Camera } from '@vkontakte/icons';

export const UserCell = ({ data }: UserCellProps) => {
  return(
    <Cell
      before={
        <Avatar
          size={48}
          src={data?.photo_200}
          fallbackIcon={<Icon28Camera/>} 
        />
      }
      subtitle={data?.city.title || 'Ожидаем ответ от VK Bridge...'}
    >
      {data ? `${data.first_name} ${data.last_name}` : 'DELETED'}
    </Cell>
  );
}