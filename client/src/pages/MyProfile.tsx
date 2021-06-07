import React from 'react';
import { Layout, MainWrapper, ProfileInfo } from '@/components';

export const MyProfile: React.FC = () => {
  return (
    <Layout>
      <MainWrapper isBackBtn title="Mój profil" backBtnURL={'/'}>
        <ProfileInfo />
      </MainWrapper>
    </Layout>
  );
};
