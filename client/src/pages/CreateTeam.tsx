import React from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from '@/hooks';
import { ACCESS_TOKEN, ID_TOKEN } from '@/constants';
import { Layout, MainWrapper } from '@/components';

export const CreateTeam: React.FC = () => {
  const [token, setToken] = useLocalStorage(ID_TOKEN, '');
  const [accessToken] = useLocalStorage(ACCESS_TOKEN, '');
  const history = useHistory();

  //   useEffect(() => {
  //     if (!token) {
  //       history.push(paths.LOGIN);
  //     }
  //   }, [token]);

  return (
    <Layout>
      <MainWrapper
        isBackBtn
        title="Create team"
        backBtnURL={'/mainpage'}
      ></MainWrapper>
    </Layout>
  );
};