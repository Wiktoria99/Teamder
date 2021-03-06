import React from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from '@/hooks';
import { ID_TOKEN } from '@/constants';
import { Layout, MainWrapper, NotificationList } from '@/components';

export const Notifications: React.FC = () => {
  const [token, setToken] = useLocalStorage(ID_TOKEN, '');
  const history = useHistory();

  //   useEffect(() => {
  //     if (!token) {
  //       history.push(paths.LOGIN);
  //     }
  //   }, [token]);

  return (
    <Layout>
      <MainWrapper isBackBtn title="Powiadomienia" backBtnURL={'/'}>
        <NotificationList />
      </MainWrapper>
    </Layout>
  );
};
