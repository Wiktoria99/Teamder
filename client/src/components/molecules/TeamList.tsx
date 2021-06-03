import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading } from '@/components';
import { getTeams } from '@/api';
import { TeamI } from '@/interfaces';
import { TeamItem } from './TeamItem';

interface Props {}

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: 'flex',
    flexFlow: 'column',
    height: 'calc(100% - 100px)',
    overflowY: 'scroll',
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

    try {
      getTeamsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
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
