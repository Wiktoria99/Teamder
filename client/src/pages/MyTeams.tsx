import React from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from '@/hooks';
import { ACCESS_TOKEN, ID_TOKEN } from '@/constants';
import { Layout, MainWrapper } from '@/components';

export const MyTeams: React.FC = () => {
  const [token, setToken] = useLocalStorage(ID_TOKEN, '');
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
        title="Moje zespoły"
        backBtnURL={'/mainpage'}
      ></MainWrapper>
    </Layout>
  );
};
