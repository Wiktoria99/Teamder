import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { TeamItem } from './TeamItem';
import { Loading } from '@/components';
import { getTeams } from '@/api';
import { TeamI } from '@/interfaces';

interface Props {}

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

export const TeamList = (props: Props) => {
  const [teams, setTeams] = useState<TeamI[]>([]);
  const styles = useStyles();

  useEffect(() => {
    const getTeamsFnc = async () => {
      const { data } = await getTeams();
      setTeams(data);
    };

    getTeamsFnc();
  }, []);

  return (
    <Box className={styles.teamList}>
      {teams.length ? (
        <>
          {teams.map((team, idx) => (
            <TeamItem key={idx} team={team} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
