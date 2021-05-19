import React from 'react';
import { colors } from '@/styles';
import { Box, makeStyles } from '@material-ui/core';

interface BarI extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

const useStyles = makeStyles((theme) => ({
  barContainer: {
    width: 200,
    height: 'calc(100% - 50px)',
    marginRight: 50,
    marginTop: 25,
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'column',
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
