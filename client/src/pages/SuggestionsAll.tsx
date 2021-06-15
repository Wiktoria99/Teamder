import React from 'react';
import { Layout, MainWrapper } from '@/components';
import { SuggestionList } from '@/components';

export const SuggestionsAll: React.FC = () => {

  return (
    <Layout>
      <MainWrapper isBackBtn title="Zainteresowania" backBtnURL={'/'}>
        <SuggestionList />
      </MainWrapper>
    </Layout>
  );
};
