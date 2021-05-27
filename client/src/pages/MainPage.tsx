import React from 'react';
import { Layout, MainWrapper, TeamList } from '@/components';

export const MainPage: React.FC = () => {
  //   useEffect(() => {
  //     if (!token) {
  //       history.push(paths.LOGIN);
  //     }
  //   }, [token]);

  return (
    <Layout>
      <MainWrapper title="Zespoły" backBtnURL={'/login'}>
        <TeamList />
      </MainWrapper>
    </Layout>
  );
};
