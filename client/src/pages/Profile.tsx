import React from 'react';
import { Layout, MainWrapper, ExternalProfileInfo } from '@/components';

export const Profile: React.FC = () => {
  return (
    <Layout>
      <MainWrapper isBackBtn title="Profil" backBtnURL={'/'}>
        <ExternalProfileInfo />
      </MainWrapper>
    </Layout>
  );
};
