import React, { useEffect } from 'react';
import { Layout, MainWrapper, TeamList } from '@/components';
import { paths } from '@/routing';
import { useLocalStorage } from '@/hooks';
import { TOKEN } from '@/constants';
import { useHistory } from 'react-router';

export const MainPage: React.FC = () => {
  return (
    <Layout>
      <MainWrapper title="Zespoły">
        <TeamList />
      </MainWrapper>
    </Layout>
  );
};
