import React from 'react';
import { useParams } from 'react-router';
import { Layout, MainWrapper, TeamList } from '@/components';
import { paths } from '@/routing'

interface Params {
  id: string;
  name: string;
}

export const TeamsByInterest: React.FC = () => {
  const params: Params = useParams();
  const title: string = '#' + params.name

  return (
    <Layout>
      <MainWrapper 
        isBackBtn={true}
        backBtnURL={paths.SUGGESTIONS}
        title={title} 
      >
        <TeamList id={params.id}/>
      </MainWrapper>
    </Layout>
  );
};
