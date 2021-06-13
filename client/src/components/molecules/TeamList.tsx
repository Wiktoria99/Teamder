import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading } from '@/components';
import { getMyProfile, getTeams } from '@/api';
import { TeamI } from '@/interfaces';
import { TeamItem } from './TeamItem';

interface Props {
  id?: string;
}

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
  const [profileId, setProfileId] = useState<number>();
  const styles = useStyles();

  useEffect(() => {
    const getProfileId = async () => {
      const { data } = await getMyProfile();
      setProfileId(data.id);
    };

    const getTeamsFnc = async () => {
      const { data } = await getTeams();
      setTeams(data);
    };

    try {
      getProfileId();
      getTeamsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
  }, []);

  return (
    <Box className={styles.teamList}>
      {teams.length && profileId ? (
        props.id ? (
          <>
            {teams
              .filter(
                (team) =>
                  team.list_of_interests_id &&
                  team.list_of_interests_id.find(
                    (elem) => String(elem) === props.id,
                  ),
              )
              .filter((team) => !team.accepted_people_id?.includes(profileId))
              .map((team, idx) => (
                <TeamItem key={idx} team={team} />
              ))}
          </>
        ) : (
          <>
            {teams
              .filter((team) => !team.accepted_people_id?.includes(profileId))
              .map((team, idx) => (
                <TeamItem key={idx} team={team} />
              ))}
          </>
        )
      ) : (
        <Loading />
      )}
    </Box>
  );
};
