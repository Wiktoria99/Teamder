import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Loading } from '@/components';
import { Box, makeStyles } from '@material-ui/core';
import { SuggestionItem } from './SuggestionItem';
import { getInterests } from '@/api'
import { InterestI } from '@/interfaces'

interface Props {}

const useStyles = makeStyles((theme) => ({
  interestList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

export const SuggestionList = (props: Props) => {
  const styles = useStyles();
  const [listOfInterests, setInterests] = useState<InterestI[]>([]);

  useEffect(() => {
    const getInterestsFnc = async () => {
    const { data } = await getInterests();
      setInterests(data);
    };

    try {
      getInterestsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zainteresowań!');
    }
  }, []);


  return (
    <Box className={styles.interestList}>
      {listOfInterests.length ? (
        <>
          {listOfInterests.map((interest, idx) => (
            <SuggestionItem key={idx} interest={interest} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
