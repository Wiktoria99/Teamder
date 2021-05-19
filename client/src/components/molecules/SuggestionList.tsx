import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { SuggestionItem } from './SuggestionItem';

interface Props {}

const useStyles = makeStyles((theme) => ({
  interestList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

const listOfInterests = [
  {
    name: 'backend',
    teams_number: 944,
  },
  {
    name: 'countersttrike',
    teams_number: 552,
  },
  {
    name: 'football',
    teams_number: 512,
  },
  {
    name: 'music',
    teams_number: 467,
  },
  {
    name: 'singing',
    teams_number: 312,
  },
  {
    name: 'dancing',
    teams_number: 300,
  },
  {
    name: 'games',
    teams_number: 280,
  },
  {
    name: 'programming',
    teams_number: 126,
  },
];

export const SuggestionList = (props: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.interestList}>
      {listOfInterests.map((interest) => (
        <SuggestionItem interest={interest} />
      ))}
    </Box>
  );
};
