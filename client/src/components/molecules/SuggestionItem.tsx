import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';

interface Props {
  interest: {
    name: string;
    teams_number: number;
  };
}

const useStyles = makeStyles((theme) => ({
  suggestionItemContainer: {
    display: 'flex',
    flexFlow: 'column',
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
    padding: '8px 0 8px 25px',
  },
  interestTitle: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: ' 22px',
    margin: '5px 0',
  },
  teamsNumber: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: ' 22px',
    margin: '5px 0',
  },
}));

export const SuggestionItem: React.FC<Props> = ({ interest }) => {
  const styles = useStyles();

  return (
    <Box className={styles.suggestionItemContainer}>
      <h3 className={styles.interestTitle}>#{interest.name}</h3>
      <p className={styles.teamsNumber}>{interest.teams_number} Teams</p>
    </Box>
  );
};
