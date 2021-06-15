import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading, CurrentTeamItem } from '@/components';
import { getMyCurrentTeams } from '@/api';
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
  const [fetching, setFetching] = useState<boolean>(true);
  const styles = useStyles();

  useEffect(() => {
    const getTeamsFnc = async () => {
      const { data } = await getMyCurrentTeams();

      setTeams(data.my_teams);
      setFetching(false);
    };

    try {
      getTeamsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
  }, []);

  return (
    <Box className={styles.teamList}>
      {!fetching ? (
        <>
          {teams.length ? (
            teams.map((team, idx) => <CurrentTeamItem key={idx} team={team} />)
          ) : (
            <div
              style={{
                width: '100%',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Nie znaleziono zespołów!
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
