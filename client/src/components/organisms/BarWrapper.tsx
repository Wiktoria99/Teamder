import React from 'react';
import { colors } from '@/styles';
import { Box, makeStyles } from '@material-ui/core';

interface BarI extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

const useStyles = makeStyles((theme) => ({
  barContainer: {
    height: 'calc(100% - 50px)',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'column',

    ['@media (min-width:1000px)']: {
      width: '210px',
      marginRight: 50,
      marginLeft: 50,
    },
  },
  barBox: {
    backgroundColor: colors.BLACK,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    justifyContent: 'space-between',
  },
}));

export const BarWrapper: React.FC<BarI> = ({ children }: BarI) => {
  const styles = useStyles();
  return (
    <Box className={styles.barContainer}>
      <Box className={styles.barBox}>{children}</Box>
    </Box>
  );
};
