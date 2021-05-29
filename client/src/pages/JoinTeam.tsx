import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Layout, JoinTeamItem, MainWrapper } from '@/components';
import { TeamI } from '@/interfaces';
import { getTeamToJoin } from '@/api';
import { Loading } from '@/components';

interface Props {}

interface Params {
  id: string;
}

export const JoinTeam: React.FC<Props> = () => {
  const [team, setTeam] = useState<TeamI>();
  const params: Params = useParams();

  useEffect(() => {
  const getTeamFnc = async () => {
    const { data } = await getTeamToJoin(params.id);
    setTeam(data);
  };

  getTeamFnc();
  }, []);

  return (
    <Layout>
      <MainWrapper
        isBackBtn
        title='Zespół'
        backBtnURL={'/'}
      ></MainWrapper>
      {team ? (
        <JoinTeamItem team={team} />
      ) : (
        <Loading />
      )}
    </Layout>
  );
};