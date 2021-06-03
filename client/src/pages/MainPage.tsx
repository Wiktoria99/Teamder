import React from 'react';
import { Layout, MainWrapper, TeamList } from '@/components';

export const MainPage: React.FC = () => {
  return (
    <Layout>
      <MainWrapper title="Zespoły">
        <TeamList />
      </MainWrapper>
    </Layout>
  );
};
