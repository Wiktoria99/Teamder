import React from 'react';
import { useHistory } from 'react-router';
import { logout } from '@/api';
import { useLocalStorage } from '@/hooks';
import { ACCESS_TOKEN, ID_TOKEN } from '@/constants';
import { Layout, MainWrapper, TeamList } from '@/components';

export const MainPage: React.FC = () => {
  const [token, setToken] = useLocalStorage(ID_TOKEN, '');
  const [accessToken] = useLocalStorage(ACCESS_TOKEN, '');
  const history = useHistory();

  //   useEffect(() => {
  //     if (!token) {
  //       history.push(paths.LOGIN);
  //     }
  //   }, [token]);

  const logoutHandler = async () => {
    try {
      setToken('');
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(ID_TOKEN);
      await logout({ access_token: accessToken }, token);
    } catch (error) {
      console.log('There was an error when logging out!', error);
    }
  };

  return (
    <Layout>
      <MainWrapper title="Zespoły" backBtnURL={'/login'}>
        <TeamList />
      </MainWrapper>
    </Layout>
  );
};
