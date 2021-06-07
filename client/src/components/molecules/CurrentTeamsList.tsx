import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading, CurrentTeamItem } from '@/components';
import { getMyTeams } from '@/api';
import { TeamI } from '@/interfaces';

interface Props {}

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: 'flex',
    flexFlow: 'column',
    height: 'calc(100% - 151px)',
    overflowY: 'scroll',
  },
}));

export const CurrentTeamsList = (props: Props) => {
  const [teams, setTeams] = useState<TeamI[]>([]);
  const styles = useStyles();

  useEffect(() => {
    const getTeamsFnc = async () => {
      const { data } = await getMyTeams();

      setTeams(data.my_teams);
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
            <CurrentTeamItem key={idx} team={team} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
