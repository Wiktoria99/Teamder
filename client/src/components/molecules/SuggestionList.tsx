import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loading } from '@/components';
import { Box, makeStyles } from '@material-ui/core';
import { SuggestionItem } from './SuggestionItem';
import { getInterests, getTeams } from '@/api'
import { InterestI } from '@/interfaces'
import { TeamI } from '@/interfaces';

interface Props {}

const useStyles = makeStyles((theme) => ({
  interestList: {
    display: 'flex',
    flexFlow: 'column',
    height: 'calc(100% - 100px)',
    overflowY: 'scroll',
  },
}));

export const SuggestionList = (props: Props) => {
  const styles = useStyles();
  const [listOfInterests, setInterests] = useState<InterestI[]>([]);
  const [teams, setTeams] = useState<TeamI[]>([]);

  const countNumberOfTeams = (idOfInterest: number):number => {
    var count = 0;
    teams.map( (team) => (team.list_of_interests_id?.map((id) => (id==idOfInterest ? (count += Number(1)):( count += Number(0))))));
    return count;
  }

  useEffect(() => {
    const getTeamsFnc = async () => {
      const { data } = await getTeams();
      setTeams(data);
    };
    const getInterestsFnc = async () => {
      const { data } = await getInterests();
      setInterests(data);
    };

    try {
      getTeamsFnc();
      getInterestsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zainteresowań!');
    }

  }, []);


  return (
    <Box className={styles.interestList}>
      {listOfInterests.length ? ( 
        <>
          { listOfInterests.map((interest, idx) => (
            <SuggestionItem key={idx} interest={interest} count={countNumberOfTeams(interest.id)} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
