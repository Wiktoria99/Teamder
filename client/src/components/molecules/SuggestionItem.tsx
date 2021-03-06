import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { InterestI } from '@/interfaces'
import { useHistory } from 'react-router';
import { colors } from '@/styles';

interface Props {
  interest: InterestI;
  count: number;
}

const useStyles = makeStyles((theme) => ({
  suggestionItemContainer: {
    display: 'flex',
    flexFlow: 'column',
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
    padding: '8px 0 8px 25px',
  },
  interestTitle: {
    color: colors.PRIMARY_FONT,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: ' 22px',
    margin: '5px 0',
    cursor: 'pointer',
  },
  teamsNumber: {
    color: colors.PRIMARY_FONT,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: ' 22px',
    margin: '5px 0',
  },
}));

export const SuggestionItem: React.FC<Props> = ({ interest, count=0}) => {
  const styles = useStyles();
  const history = useHistory();
  var Zesp: string = '';
  if(count==1)
    Zesp = ' zespół';
  else if(count >= 3 && count <= 4)
    Zesp = ' zespoły'
  else 
    Zesp = ' zespołów';
  const selectedHandler = (id: number, name: string) => {
    history.push('/teambyinterest/' + id + '/' + name);
  };

  return (
    <Box className={styles.suggestionItemContainer}>
      <a className={styles.interestTitle} onClick={() => selectedHandler(interest.id, interest.name)}>#{interest.name}</a>
      {/* tu zmienić id na numer  */}
      <p className={styles.teamsNumber}>{count} {Zesp}</p>
    </Box>
  );
};
